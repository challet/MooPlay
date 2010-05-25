/*
---
description: control mute with a button

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- MooPlay.Utils


provides: 
- MooPlay.Control.Mute

...
*/

MooPlay.Control.Mute = new Class({

    Implements: [MooPlay.Control.BaseButton],
    
    options: {
        muted_state_class: 'muted'
    },
    
    specificInitialize: function() {
        
        this.video.addEvents({
            'volumechange': this.update.bind(this)
        });

        this.element.addEvents({
            'click': function(event) {
                event.preventDefault();
                this.toggleState();
            }.bind(this)
        });
        
    },

    update: function(event) {
        if(event.target.muted) {
            this.element.addClass(this.options.muted_state_class);
        } else {
            this.element.removeClass(this.options.muted_state_class);
        }
    },
    
    toggleState: function() {
        this.video.muted = !this.video.muted;
    }

});
