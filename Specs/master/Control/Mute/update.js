(function() {

    var initial_prototype = {};

    var element = null;
    var video = null;
    var mute = null;

    describe('Control.Mute.update function', {
        
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
            
            mute = new MooPlay.Control.Mute(video, element);
            
        },
        
        after_each: function() {
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            mute = null;
            
        },
                
        "should add the css class if muted": function() {
            element.removeClass(mute.options.muted_state_class);
            mute.update({target: {muted: true}});
            value_of(element.hasClass(mute.options.muted_state_class)).should_be_true();
        },
        
        "should remove the css class if not muted": function() {
            element.addClass(mute.options.muted_state_class);
            mute.update({target: {muted: false}});
            value_of(element.hasClass(mute.options.muted_state_class)).should_be_false();
        }
        
    });
    
})();
