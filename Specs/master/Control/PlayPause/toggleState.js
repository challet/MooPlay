(function() {
    
    var element = null;
    var video = null;
    var mock_video = null;
    var play_pause = null;
    
    var play_called = false;
    var pause_called = false;
    
    describe('Control.PlayPause.toggleState function', {
        
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
            
            mock_video = {
                paused: false,
                play: function() {
                    this.paused = false;
                    play_called = true;
                },
                pause: function() {
                    this.paused = true;
                    pause_called = true;
                }
            };
            
            play_pause = new MooPlay.Control.PlayPause(element, video);
            play_pause.video = mock_video;
        },
        
        after_each: function() {
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            mock_video = null;
            play_pause = null;
            
            play_called = false;
            pause_called = false;

            
        },
        
        "should call the pause method if state is playing": function() {
            mock_video.paused = false;
            play_pause.toggleState();
            value_of(pause_called).should_be_true();
        },
        
        "should call the play method if state is paused": function() {
            mock_video.paused = true;
            play_pause.toggleState();
            value_of(play_called).should_be_true();
        }
        
    });
    
})();