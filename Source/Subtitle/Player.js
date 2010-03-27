Video.Subtitle.Player = new Class({

    Implements: [Options],

    options: {
        container: 'subtitle',
        subs_hash: null,
        tick_delay: 100, // not in use for now
        time_shift: 0,
        onDispose: function(element, container) {
            element.dispose();
        },
        onDisplay: function(element,container) {
            element.inject(container, 'bottom');
        }
    },

    initialize: function( video, options) {

        this.setOptions(options);
        
        this.video = $(video);
        this.container = $(this.options.container);
        
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
                sub.element.removeClass('overlapping' + String(--this.overlapping_level));
                this.options.onDispose(sub.element, this.container);
            } else {
                displayed.push(sub);
            }
            this.displayed = displayed;
        }.bind(this));
        
        // display subs which should to
        next_displayed.each(function(sub) {
            if(!this.displayed.contains(sub)) {
                sub.element.addClass('overlapping' + String(this.overlapping_level++));
                this.displayed.push(sub);
                this.options.onDisplay(sub.element, this.container);
            }
        }.bind(this));

    },
    
    setTimeShift: function(shift) {
        this.options.time_shift = parseInt(shift);
    }
    

});
