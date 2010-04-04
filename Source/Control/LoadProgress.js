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

    Implements: [Options],
        
    initialize: function(progressbar, video, options) {
        
        this.setOptions(options);
        
        this.progressbar = progressbar;
        this.video = $(video);
        
        this.video.addEvent('progress', function(e, video, data) {
            if(e.event.lengthComputable) {
                this.tick(e.event.loaded, e.event.total);
            }
        }.bind(this));
        
        
    },
    
    tick: function(loaded, total) {
        this.progressbar.set(loaded / total * 100);
    },


});
