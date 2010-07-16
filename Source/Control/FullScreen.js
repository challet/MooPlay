/*
---
description: display the player with the dimension of the page

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay


provides: 
- MooPlay.Control.FullScreen

...
*/

MooPlay.Control.FullScreen = new Class({

    Implements: [MooPlay.Control.BaseButton],
    
    options: {
        active_state_class: 'active'
    },
    
    full_screened: false,
    
    specificInitialize: function() {

        this.element.addEvents({
            'click': function(event) {
                event.preventDefault();
                this.toggleState();
            }.bind(this)
        });
        
        this.initialState = {
            coordinates: this.video.getCoordinates(document.body),
            style: this.video.getStyles('position', 'top', 'left'),
        };
        this.fx = new Fx.Morph(this.video, {
            link: 'cancel',
            onComplete: function() {
                if(this.full_screened) {
                    this.video.setStyles(this.initialState.style);
                } else {
                    this.video.setStyles({
                        width: '100%',
                        height: '100%'
                    });
                }
                if(this.full_screened) {
                    this.element.removeClass(this.options.active_state_class);
                } else {
                    this.element.addClass(this.options.active_state_class);
                }
                this.full_screened = !this.full_screened;
                
            }.bind(this)
        });
        
    },
    
    toggleState: function() {
        if(this.full_screened) {
            var video_dimension = this.video.getCoordinates();
            this.video.setStyles({
                width: String(video_dimension.width) + 'px',
                height: String(video_dimension.height) + 'px'
            });
            this.fx.start({
                height: this.initialState.coordinates.height,
                width: this.initialState.coordinates.width,
                top: this.initialState.coordinates.top,
                left: this.initialState.coordinates.left
            });
        } else {
            this.video.setStyles({
                position: 'fixed',
                top: String(this.initialState.coordinates.top) + 'px',
                left: String(this.initialState.coordinates.left) + 'px' 
            });
            var body_dimension = document.body.getCoordinates();
            this.fx.start({
                height: body_dimension.height,
                width: body_dimension.width,
                top: 0,
                left: 0
            });
        }
    }

});

