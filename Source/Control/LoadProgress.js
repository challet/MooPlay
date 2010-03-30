/*
---
description: proxy between any DOM element and a video element, controls and displays the current position inside the video

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- more/1.2.4: [Slider]

provides: 
- MooPlay.Control.PlayProgress

...
*/

MooPlay.Control.LoadProgress = new Class({

    Implements: [Options],
        
    initialize: function(bar, video, options) {
        
        this.setOptions(options);
        
        this.bar = bar;
        this.video = $(video);
        
        this.video.addEvent('progress', function(event) {
            this.tick(event.target.currentTime * 1000, event.target.duration * 1000);
        }.bind(this));
        
        
    },
    
    tick: function(currentTime, duration) {
        this.slider.set(this.slider.steps * currentTime / duration);
    },


});
