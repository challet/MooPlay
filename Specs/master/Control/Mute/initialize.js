(function() {

    var initial_prototype = {};

    var element = null;
    var video = null;
    var update_called = false;
    var toggle_state_called = false;

    describe('Control.Mute.initialize function', {
        
        before_all: function() {
            initial_prototype.toggleState = MooPlay.Control.Mute.prototype.toggleState;
            initial_prototype.update = MooPlay.Control.Mute.prototype.update;
        },
        
        after_all: function() {
            MooPlay.Control.Mute.prototype.toggleState = initial_prototype.toggleState;
            MooPlay.Control.Mute.prototype.update = initial_prototype.update;
        },
        
        before_each: function() {
            
            element = new Element('a', {
                id: 'mute',
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
            
            
            MooPlay.Control.Mute.prototype.update = function() {
                update_called = true;
            };
            
            MooPlay.Control.Mute.prototype.toggleState = function() {
                toggle_state_called = true;
            };
            
        },
        
        after_each: function() {
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            toggle_state_called = false;
            update_called = false;
            
        },
                
        "should handle the volumechange video event": function() {
            new MooPlay.Control.Mute(video, element);;
            video.fireEvent('volumechange', {preventDefault: $empty});
            value_of(update_called).should_be_true();
        },

        "should handle the click element event": function() {
            new MooPlay.Control.Mute(video, element);
            element.fireEvent('click',{ preventDefault: $empty});
            value_of(toggle_state_called).should_be_true();
        }
        
    });
    
})();
