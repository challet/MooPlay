(function() {
    
    var fake_event = {preventDefault: $empty};
    
    var element = null;
    var video = null;
    var specificinitialize_called = false;

    describe('Control.BaseButton.initialize function', {
        
        before_each: function() {
            
            
            
            element = new Element('a', {
                id: 'playpause',
                styles: {
                    width: 50,
                    height: 50
                }
            }).inject(document.body);
            
            video = new Element('video', {
                id: 'video',
                styles: {
                    width: 50,
                    height: 50
                }
            }).inject(document.body);
            
            MooPlay.Control.BaseButton.prototype.specificInitialize = function() {
                
                specificinitialize_called = true;
            };           
            
        },
        
        after_each: function() {
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            change_paused_status_called = false;
            change_paused_arg_value = null;
            change_over_status_called = false;
            change_over_arg_value = null;
            change_click_status_called = false;
            change_click_arg_value = null;
            toggle_state_called = false;
            toggle_state_arg_value = null;
            
        },
        
        "should call the specificInitialize method": function() {
            new MooPlay.Control.BaseButton(element, video);
            value_of(specificinitialize_called).should_be_true();
        },
        
        "should add the specified class when mouseenter on the element": function() {
            var button = new MooPlay.Control.BaseButton(element, video);
            element.fireEvent('mouseenter', fake_event);
            value_of(element.hasClass(button.options.over_state_class)).should_be_true();
        },
        
        "should remove the specified class when mouseleave on the element": function() {
            var button = new MooPlay.Control.BaseButton(element, video);
            element.addClass(button.options.over_state_class);
            element.fireEvent('mouseleave', fake_event);
            value_of(element.hasClass(button.options.over_state_class)).should_be_false();
        },
        
        "should add the specified class when mousedown on the element": function() {
            var button = new MooPlay.Control.BaseButton(element, video);
            element.fireEvent('mousedown', fake_event);
            value_of(element.hasClass(button.options.click_state_class)).should_be_true();
        },
        
        "should add the specified class when mouseup on the element": function() {
            var button = new MooPlay.Control.BaseButton(element, video);
            element.addClass(button.options.click_state_class);
            element.fireEvent('mouseup', fake_event);
            value_of(element.hasClass(button.options.click_state_class)).should_be_false();
        }
           
    });
    
})();