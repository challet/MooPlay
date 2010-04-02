

MooPlay.Control.BaseButton = new Class({

    Implements: Options,
    
    options: {
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
                this.element.addClass(this.options.over_state_class);
            }.bind(this),
            
            'mouseleave': function(event) {
                event.preventDefault();
                this.element.removeClass(this.options.over_state_class);
            }.bind(this),
        
            'mousedown': function(event) {
                event.preventDefault();
                this.element.addClass(this.options.click_state_class);
            }.bind(this),
        
            'mouseup': function(event) {
                event.preventDefault();
                this.element.removeClass(this.options.click_state_class);
            }.bind(this)
            
        });
        
        this.specificInitialize();
        
    }
    

});
