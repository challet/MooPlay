/*
---
description: proxy between any DOM element and a video element,  displays the loading progress of the video

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- progressbar: *
- more/1.2.4: [Slider]

provides: 
- MooPlay.Control.LoadProgress

...
*/

MooPlay.Control.LoadProgress = new Class({
    
    options: {
        preload_class: 'preloading'
    },
    
    Implements: [Options],
        
    initialize: function(video, progressbar, options) {
        
        this.setOptions(options);
        
        this.progressbar = progressbar;
        this.video = $(video);
        
        this.video.addEvents({
            'progress': function(e, video, data) {
                if(e.event.lengthComputable) {
                    this.tick(e.event.loaded, e.event.total);
                } else {
                    this.preload(true);
                }
            }.bind(this),
            'loadstart': this.preload.pass(true, this),
            'seeking': this.preload.pass(true, this),
            'loadedmetadata': this.preload.pass(false, this),
            'seeked': this.preload.pass(false, this)
        });
        
        
    },
    
    preload: function(state) {
        if(state) {
            this.progressbar.options.container.addClass(this.options.preload_class);
        } else {
            this.progressbar.options.container.removeClass(this.options.preload_class);
        }
    },
    
    tick: function(loaded, total) {
        this.progressbar.set(loaded / total * 100);
    },


});
