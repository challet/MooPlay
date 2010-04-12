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

MooPlay.Control.PlayProgress = new Class({

    Implements: [Options],
        
    initialize: function(slider, video, options) {
        
        this.setOptions(options);
        
        this.slider = slider;
        this.video = $(video);
        
        this.suspended = false;
        
        this.video.addEvents({
            'timeupdate': this.tick.bind(this),
            'seeked': this.resume.bind(this)
        });
        
        this.slider.knob.addEvents({
            'mousedown': this.suspend.bind(this),
            'mouseup': this.resume.bind(this)
        });
        
        this.slider.addEvent('change', this.change.bind(this));

    },
    
    suspend: function() {
        this.suspended = true;
    },
    
    resume: function() {
        this.suspended = false;
    },
    
    tick: function(event) {

        if(!this.suspended) {
            position = this.slider.toPosition( event.target.currentTime / event.target.duration * this.slider.range );
            this.slider.knob.setStyle(this.slider.property, position);
        }

    },

    change: function(pos) {
        this.suspended = true;
        this.video.currentTime = this.video.duration * pos / this.slider.steps;
    }

});
