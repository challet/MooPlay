/*
---
description: proxy between any DOM element and a video element, controls and displays the play and pause video states

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay.Control.BaseButton

provides: 
- MooPlay.Control.PlayPause

...
*/

MooPlay.Control.PlayPause = new Class({

    Implements: [MooPlay.Control.BaseButton],
    
    options: {
        paused_state_class: 'paused'
    },
    
    specificInitialize: function() {
        
        if(this.video.paused) {
            this.element.addClass(this.options.paused_state_class);
        }

        this.video.addEvents({
            
            'play': function() {
                this.element.removeClass(this.options.paused_state_class);
            }.bind(this),
        
            'pause': function() {
                this.element.addClass(this.options.paused_state_class);
            }.bind(this)
            
        });

        this.element.addEvents({
        
            'click': function(event) {
                event.preventDefault();
                this.toggleState();
            }.bind(this)
            
        });
        
    },

    
    toggleState: function() {
        if(this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

});
