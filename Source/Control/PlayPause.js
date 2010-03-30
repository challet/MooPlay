/*
---
description: proxy between any DOM element and a video element, controls and displays the play and pause video states

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay

provides: 
- MooPlay.Control.PlayPause

...
*/

MooPlay.Control.PlayPause = new Class({

    Implements: [MooPlay.Control.ButtonBase],
    
    options: {
        paused_state_class: 'paused'
    },
    
    specificInitialize: function() {
        
        this.changePausedStatus(this.video.paused);
        
        this.video.addEvents({
            
            'play': function() {
                this.changePausedStatus(false);
            }.bind(this),
        
            'pause': function() {
                this.changePausedStatus(true);
            }.bind(this)
            
        });

        this.element.addEvents({
        
            'click': function(event) {
                event.preventDefault();
                this.toggleState();
            }.bind(this)
            
        });
        
    },
    
    changePausedStatus: function(paused) {
        this.paused = paused;
        if(this.paused) {
            this.element.addClass(this.options.paused_state_class);
        } else {
            this.element.removeClass(this.options.paused_state_class);
        }
    },
    
    toggleState: function() {
        if(this.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

});
