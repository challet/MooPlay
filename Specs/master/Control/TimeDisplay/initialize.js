(function() {
    
    var initial_prototype = {};
    var fake_event = {target: {
        duration: 582255,
        currentTime: 127355
    }};

    var element = null;
    var video = null;
    var update_called = false;
    var update_arg_value = null;

    describe('Control.TimeDisplay.initialize function', {
        
        before_all: function() {
            initial_prototype = {
                update: MooPlay.Control.TimeDisplay.prototype.update
            };
        },
        
        after_all: function() {
            MooPlay.Control.TimeDisplay.prototype.update = initial_prototype.update;
        },
        
        before_each: function() {
            
            element = new Element('div', {
                id: 'time_container',
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
            
            MooPlay.Control.TimeDisplay.prototype.update = function(timestamp) {
                update_called = true;
                update_arg_value = timestamp;
            }
            
        },
        
        after_each: function() {
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            update_called = false;
            update_arg_value = null;
            
        },
                
        "should call update on 'timeupdate' event": function() {
            new MooPlay.Control.TimeDisplay(video, element);
            video.fireEvent('timeupdate', fake_event);
            value_of(update_called).should_be_true();
        },
        
        "should pass the current time if 'current' option is true": function() {
            new MooPlay.Control.TimeDisplay(video, element, { current: true });
            video.fireEvent('timeupdate', fake_event);
            value_of(update_arg_value).should_be(fake_event.target.currentTime * 1000);
        },
        
        "should pass the remaining time if 'current' option is false": function() {
            new MooPlay.Control.TimeDisplay(video, element, { current: false });
            video.fireEvent('timeupdate', fake_event);
            value_of(update_arg_value).should_be((fake_event.target.duration - fake_event.target.currentTime) * 1000 );
        }
        
        
    });
    
})();