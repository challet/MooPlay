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

*/

MooPlay.Control.PlayPause = new Class({

    Implements: [Options],
    
    options: {
        paused_state_class: 'paused',
        over_state_class: 'over',
        click_state_class: 'clicked'
    },
    
    
    initialize: function(element, video, options) {
        
        this.setOptions(options);
        
        this.element = element;
        this.video = $(video);
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
            
            'mouseenter': function(event) {
                event.preventDefault();
                this.changeMouseOverStatus(true);
            }.bind(this),
            
            'mouseleave': function(event) {
                event.preventDefault();
                this.changeMouseOverStatus(false);
            }.bind(this),
        
            'mousedown': function(event) {
                event.preventDefault();
                this.changeClickStatus(true);
            }.bind(this),
        
            'mouseup': function(event) {
                event.preventDefault();
                this.changeClickStatus(false);
            }.bind(this),
        
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
    
    changeMouseOverStatus: function(over) {
        if(this.over) {
            this.element.addClass(this.options.over_state_class);
        } else {
            this.element.removeClass(this.options.over_state_class);
        }
    },
    
    changeClickStatus: function(down) {
        if(down) {
            this.element.addClass(this.options.click_state_class);
        } else {
            this.element.removeClass(this.options.click_state_classc);
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
