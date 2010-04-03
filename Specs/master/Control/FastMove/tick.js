(function() {
    
    var initial_prototype = {};
    var fake_event = {preventDefault: $empty};

    var element = null;
    var video = null;
    var fast_move = null;
    var mock_video = null;
    
    describe('Control.FastMove.tick function', {
        
        
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
            
            mock_video = {currentTime: 2443242342};
            
            fast_move = new MooPlay.Control.FastMove(element, video, {speed_factor: 2});
            fast_move.video = mock_video;
            
        },
        
        after_each: function() {
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            fast_move = null;
            mock_video = null;
            
        },
        
        "should set the new time of the video element": function() {
            fast_move.start_time = $time() - 543534;
            fast_move.start_pos = 2443242342;
            fast_move.timer = 844848;
            fast_move.tick();
            // can't guess what the value should be, cause time is involved
            // but we can be sure of what it should not be
            value_of(mock_video.currentTime).should_not_be(2443242342);
        },
        
        "should do nothing if move have stopped": function() {
            fast_move.timer = null;
            fast_move.tick();
            value_of(mock_video.currentTime).should_be(2443242342);
        }
        
    });
    
})();