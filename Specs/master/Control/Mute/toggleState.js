(function() {

    var initial_prototype = {};

    var element = null;
    var video = null;
    var mute = null;

    describe('Control.Mute.toggleState function', {
        
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
                
        "should mute the video": function() {
            video.muted = false;
            mute.toggleState();
            value_of(video.muted).should_be_true();
        },
        
        "should unmute the video": function() {
            video.muted = true;
            mute.toggleState();
            value_of(video.muted).should_be_false();
        }
        
    });
    
})();
