

MooPlay.Control.ButtonBase = new Class({

    Implements: [Options],
    
    options: {
        paused_state_class: 'paused',
        over_state_class: 'over',
        click_state_class: 'clicked'
    },
    
    
    initialize: function(element, video, options) {
        
        this.setOptions(options);
        
        this.element = $(element);
        this.video = $(video);

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
            }.bind(this)
            
        });
        
        this.specificInitialize();
        
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
    }

});
