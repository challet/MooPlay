(function() {
    
    var initial_prototype = {};
    var fake_event = {preventDefault: $empty};

    var element = null;
    var video = null;
    var fast_move = null;
    var mock_video = null;
    var tick_called_times = 0;
    
    describe('Control.FastMove.stopMove function', {
        
        before_all: function() {
            initial_prototype = {
                tick: MooPlay.Control.FastMove.prototype.tick
            };
        },
        
        after_all: function() {
            MooPlay.Control.FastMove.prototype.tick = initial_prototype.tick;
        },
        
        
        before_each: function() {
            
            MooPlay.Control.FastMove.prototype.tick = function() {
                tick_called_times++;
            }
            
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
            
            fast_move = new MooPlay.Control.FastMove(video, element);;
            fast_move.video = mock_video;
            
        },
        
        after_each: function() {
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            fast_move = null;
            mock_video = null;
            tick_called_times = 0;
            
        },
        
        "should reset the start_time": function() {
            fast_move.timer = 232423;
            fast_move.start_time = 234324;
            fast_move.stopMove();
            value_of(fast_move.start_time).should_be_null();
        },
        
        "should reset the start_pos": function() {
            fast_move.timer = 4654;
            fast_move.start_pos = 23234234;
            fast_move.stopMove();
            value_of(fast_move.start_pos).should_be_null();
        },
        
        "should reset the timer": function() {
            fast_move.timer = 4444432;
            fast_move.stopMove();
            value_of(fast_move.timer).should_be_null();
        },
        
        "should do nothing if move is stopped": function() {
            fast_move.start_time = 234324;
            fast_move.start_pos = 23234234;
            fast_move.timer = null;
            fast_move.stopMove();
            value_of(fast_move.start_time).should_be(234324);
            value_of(fast_move.start_pos).should_be(23234234);
        }
        
    });
    
})();