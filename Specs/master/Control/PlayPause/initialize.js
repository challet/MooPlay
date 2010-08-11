(function() {
    
    var initial_prototype_toggleState = null;
    
    var element = null;
    var video = null;
    var change_paused_status_called = false;
    var change_paused_arg_value = null;
    var toggle_state_called = false;
    var toggle_state_arg_value = null;

    describe('Control.PlayPause.initialize function', {
        
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
            
            initial_prototype_toggleState = MooPlay.Control.PlayPause.prototype.toggleState;
            MooPlay.Control.PlayPause.prototype.toggleState = function() {
                toggle_state_called = true;
            };
            
        },
        
        after_each: function() {
            
            MooPlay.Control.PlayPause.prototype.toggleState = initial_prototype_toggleState;
            
            initial_prototype_toggleState = null;
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            change_paused_status_called = false;
            change_paused_arg_value = null;
            toggle_state_called = false;
            toggle_state_arg_value = null;
            
        },
                
        "should handle the play video event": function() {
            var button = new MooPlay.Control.PlayPause(video, element);
            element.addClass(button.options.paused_state_class);
            video.fireEvent('play', {preventDefault: $empty});
            value_of(element.hasClass(button.options.paused_state_class)).should_be_false();
        },
        
        "should handle the pause video event": function() {
            var button = new MooPlay.Control.PlayPause(video, element);
            video.fireEvent('pause', {preventDefault: $empty});
            value_of(element.hasClass(button.options.paused_state_class)).should_be_true();
        },
        
        "should handle the click element event": function() {
            new MooPlay.Control.PlayPause(video, element);
            element.fireEvent('click',{ preventDefault: $empty});
            value_of(toggle_state_called).should_be_true();
        }
        
    });
    
})();