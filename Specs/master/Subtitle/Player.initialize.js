(function() {
    
    var subs_root = null;
    var element = null;
    var player = null;
    var tick_called = false;
    var abs_movie_time_arg_value = null;
    
    describe('Subtitle.Player.initialization function', {
        
        before_each: function() {
            
            subs_root = new Video.Subtitle.Tree(0,10000);

            element = new Element('div', {
                id: 'video',
                styles: {
                    width: 400,
                    height: 300,
                    position: 'absolute',
                    top:0
                }
            });

            
            player = new Video.Subtitle.Player(subs_root, element);
            player.tick = function(abs_movie_time) {
                abs_movie_time_arg_value = abs_movie_time;
                tick_called = true;
            }
            
        },
        
        after_each: function() {

            item = null;
            element = null;
            player = null;
            tick_called = false;
            abs_movie_time_arg_value = null;
            
        },
        
        "should set a callback from video.timeupdate update": function() {
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(tick_called).should_be_true();
        },
        
        "should convert time to ms before call the tick function": function() {
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(abs_movie_time_arg_value).should_be(5000);
        }

    });
    
})();