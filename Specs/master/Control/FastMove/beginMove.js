(function() {
    
    var initial_prototype = {};
    var fake_event = {preventDefault: $empty};

    var element = null;
    var video = null;
    var fast_move = null;
    var mock_video = null;
    var tick_called_times = 0;
    
    describe('Control.FastMove.beginMove function', {
        
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
            
            fast_move = new MooPlay.Control.FastMove(element, video);
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
        
        "should set a start_time": function() {
            fast_move.beginMove();
            value_of(fast_move.start_time).should_not_be_null();
        },
        
        "should set a start_pos": function() {
            fast_move.beginMove();
            value_of(fast_move.start_pos).should_not_be_null();
            value_of(fast_move.start_pos).should_be(mock_video.currentTime);
        },
        
        "should set a timer": function() {
            fast_move.beginMove();
            value_of(fast_move.timer).should_not_be_null();
        },
        
        "should have periodically called the tick method": function() {
            fast_move.beginMove();
            // saying called at least two times is periodical
            // /!\ could be a race condition here
            value_of(tick_called_times > 2).should_be_true();
        },
        
        "should do nothing if move has already began": function() {
            fast_move.timer = "a string";
            fast_move.beginMove();
            value_of(fast_move.start_time).should_be_null();
            value_of(fast_move.start_pos).should_be_null();
            value_of(fast_move.timer).should_be("a string");
        }
        
    });
    
})();