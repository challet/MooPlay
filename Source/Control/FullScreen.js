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

    Implements: [MooPlay.Control.BaseButton, Events],
    
    options: {
        active_state_class: 'active'
    },
    
    full_screened: false,
    
    specificInitialize: function() {
        
        this.initialStyle = this.video.getStyles('position', 'top', 'left');
        
        this.element.addEvents({
            'click': function(event) {
                event.preventDefault();
                this.fireEvent(this.full_screened ? 'foldStart' : 'expandStart');
            }.bind(this)
        });
        
        this.fx = new Fx.Morph(this.video, {
            link: 'cancel',
            onComplete: function() {
                this.fireEvent(this.full_screened ? 'foldComplete' : 'expandComplete');
                this.full_screened = !this.full_screened;
            }.bind(this)
        });
        
        this.addEvents({
            'expandStart':      this.onExpandStart.bind(this),
            'expandComplete':   this.onExpandComplete.bind(this),
            'foldStart':        this.onFoldStart.bind(this),
            'foldComplete':     this.onFoldComplete.bind(this)
        });
        
    },
    
    onExpandStart: function() {
        document.body.setStyle('overflow', 'hidden');
        
        var abs_coordinates = this.video.getCoordinates(document.body);
        var body_scroll = document.body.getScroll();
        
        this.initialCoordinates = {
            top: abs_coordinates.top - body_scroll.y,
            left: abs_coordinates.left - body_scroll.x,
            height: abs_coordinates.height,
            width: abs_coordinates.width,
        };

        this.video.setStyles({
            position: 'fixed',
            top: String(this.initialCoordinates.top) + 'px',
            left: String(this.initialCoordinates.left) + 'px' 
        });
        var body_dimension = document.body.getCoordinates();
        this.fx.start({
            height: body_dimension.height,
            width: body_dimension.width,
            top: 0,
            left: 0
        });
    },
    
    onExpandComplete: function() {
        this.video.setStyles({
            width: '100%',
            height: '100%'
        });
        this.element.addClass(this.options.active_state_class);
    },

    onFoldStart: function() {
        var video_dimension = this.video.getCoordinates();
        this.video.setStyles({
            width: String(video_dimension.width) + 'px',
            height: String(video_dimension.height) + 'px'
        });
        this.fx.start({
            height: this.initialCoordinates.height,
            width: this.initialCoordinates.width,
            top: this.initialCoordinates.top,
            left: this.initialCoordinates.left
        });
    },
    
    onFoldComplete: function() {
        document.body.setStyle('overflow', 'visible');
        this.video.setStyles(this.initialStyle);
        this.element.removeClass(this.options.active_state_class);
        document.body.setStyle('overflow', 'visible');
    }


});

