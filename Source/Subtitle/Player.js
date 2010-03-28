/*
---
description: diplay subtitles synchronised with a video element

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- MooPlay.Subtitle.Item
- MooPlay.Subtitle.Tree

provides: 
- MooPlay.Subtitle.Player

...
*/


MooPlay.Subtitle.Player = new Class({

    Implements: [Options],

    options: {
        subs_hash: null,
        tick_delay: 100, // not in use for now
        time_shift: 0,
        onDispose: function(element, container, overlapping) {
            element.dispose();
            sub.element.removeClass('overlapping' + String(overlapping));
        },
        onDisplay: function(element, container, overlapping) {
            element.addClass('overlapping' + String(overlapping));
            element.inject(container, 'bottom');
        }
    },

    initialize: function( video, container, options) {

        this.setOptions(options);
        
        this.video = $(video);
        this.container = $(container);
        
        if(this.options.subs_hash != null) {
            this.loadSubtitles(this.options.subs_hash);
        }

        this.overlapping_level = 0;
        this.displayed = [];

        this.video.addEvent('timeupdate', function(event) {
            if(this.subs_hash != null || this.displayed.length != 0) {
                this.tick(event.target.currentTime * 1000);
            }
        }.bind(this));
    
    },
    
    loadSubtitles: function(subs_hash) {
        this.unLoad();
        this.subs_hash = subs_hash;
    },
    
    unLoad: function() {
        this.subs_hash = null;
    },
  
    tick: function(abs_movie_time) {

        var next_displayed = this.subs_hash != null ? this.subs_hash.getSubs(abs_movie_time - this.options.time_shift) : [];
        
        // remove subs which are not here anymore
        this.displayed.each(function(sub) {
            var displayed = [];
            if(!next_displayed.contains(sub) || this.subs_hash == null) {
                this.options.onDispose(sub.element, this.container, --this.overlapping_level);
            } else {
                displayed.push(sub);
            }
            this.displayed = displayed;
        }.bind(this));
        
        // display subs which should to
        next_displayed.each(function(sub) {
            if(!this.displayed.contains(sub)) {
                
                this.displayed.push(sub);
                this.options.onDisplay(sub.element, this.container, this.overlapping_level++);
            }
        }.bind(this));

    },
    
    setTimeShift: function(shift) {
        this.options.time_shift = parseInt(shift);
    }
    

});
