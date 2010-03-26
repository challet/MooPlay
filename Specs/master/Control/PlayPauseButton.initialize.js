(function() {
    
    var element = null;
    var video = null;
    var change_paused_status_called = false;
    var change_paused_arg_value = null;
    var change_over_status_called = false;
    var change_over_arg_value = null;
    var change_click_status_called = false;
    var change_click_arg_value = null;
    var toggle_state_called = false;
    var toggle_state_arg_value = null;

    describe('Control.PlayPauseButton.initialization function', {
        
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
            
            Video.Control.PlayPauseButton.prototype.changePausedStatus = function(state) {
                change_paused_status_called = true;
                change_paused_arg_value = state;
            };
            
            Video.Control.PlayPauseButton.prototype.changeMouseOverStatus = function(state) {
                change_over_status_called = true;
                change_over_arg_value = state;
            };
            
            Video.Control.PlayPauseButton.prototype.changeClickStatus = function(state) {
                change_click_status_called = true;
                change_click_arg_value = state;
            };
            
            Video.Control.PlayPauseButton.prototype.toggleState = function() {
                toggle_state_called = true;
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
        
        "should call the changePausedStatus with current video state": function() {
            new Video.Control.PlayPauseButton(element, video);
            value_of(change_paused_status_called).should_be_true();
            value_of(change_paused_arg_value).should_be(video.paused)
        },
        
        "should handle the play video event": function() {
            new Video.Control.PlayPauseButton(element, video);
            video.fireEvent('play');
            value_of(change_paused_status_called).should_be_true();
            value_of(change_paused_arg_value).should_be_false();
        },
        
        "should handle the pause video event": function() {
            new Video.Control.PlayPauseButton(element, video);
            video.fireEvent('pause', {preventDefault: $empty});
            value_of(change_paused_status_called).should_be_true();
            value_of(change_paused_arg_value).should_be_true();
        },
        
        "should handle the mouseenter element event": function() {
            new Video.Control.PlayPauseButton(element, video);
            element.fireEvent('mouseenter', {preventDefault: $empty});
            value_of(change_over_status_called).should_be_true();
            value_of(change_over_arg_value).should_be_true();
        },
        
        "should handle the mouseleave element event": function() {
            new Video.Control.PlayPauseButton(element, video);
            element.fireEvent('mouseleave', {preventDefault: $empty});
            value_of(change_over_status_called).should_be_true();
            value_of(change_over_arg_value).should_be_false();
        },
        
        "should handle the mousedown element event": function() {
            new Video.Control.PlayPauseButton(element, video);
            element.fireEvent('mousedown', {preventDefault: $empty});
            value_of(change_click_status_called).should_be_true();
            value_of(change_click_arg_value).should_be_true();
        },
        
        "should handle the mouseup element event": function() {
            new Video.Control.PlayPauseButton(element, video);
            element.fireEvent('mouseup', {preventDefault: $empty});
            value_of(change_click_status_called).should_be_true();
            value_of(change_click_arg_value).should_be_false();
        },
        
        "should handle the click element event": function() {
            new Video.Control.PlayPauseButton(element, video);
            element.fireEvent('click',{ preventDefault: $empty});
            value_of(toggle_state_called).should_be_true();
        },
        
    });
    
})();