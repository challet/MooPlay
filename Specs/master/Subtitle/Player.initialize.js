(function() {
    
    var subs_root = null;
    var element = null;
    var player = null;
    var tick_called = false;
    var abs_movie_time_arg_value = null;
    var load_subtitles_called = false;
    var load_subtitles_arg = null;
    
    describe('Subtitle.Player.initialize function', {
        
        before_each: function() {
            
            subs_root = new Mooplay.Subtitle.Tree(0,10000);

            element = new Element('div', {
                id: 'video',
                styles: {
                    width: 400,
                    height: 300,
                    position: 'absolute',
                    top:0
                }
            });

            Mooplay.Subtitle.Player.prototype.tick = function(abs_movie_time) {
                abs_movie_time_arg_value = abs_movie_time;
                tick_called = true;
            };
            
            Mooplay.Subtitle.Player.prototype.loadSubtitles = function(subs) {
                load_subtitles_called = true;
                load_subtitles_arg = subs;
            }
            
        },
        
        after_each: function() {

            item = null;
            element = null;
            player = null;
            tick_called = false;
            abs_movie_time_arg_value = null;
            load_subtitles_called = false;
            load_subtitles_arg = null;
            
        },
        
        
        "should call the load function if subtitles are passed as option": function() {
            var player = new Mooplay.Subtitle.Player(element, {subs_hash: subs_root});
            value_of(load_subtitles_called).should_be_true();
            value_of(load_subtitles_arg).should_be(subs_root);
        },
        
        "should set a callback from video.timeupdate update and call it if subtitles are loaded": function() {
            var player = new Mooplay.Subtitle.Player(element);
            player.subs_hash = subs_root;
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(tick_called).should_be_true();
        },
        
        "should set a callback from video.timeupdate update and call it if subtitles are displayed": function() {
            var player = new Mooplay.Subtitle.Player(element);
            player.displayed = ["4sd2fds25"];
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(tick_called).should_be_true();
        },
        
        "should not to call the callback if no subtitles are loaded nor displayed": function() {
            var player = new Mooplay.Subtitle.Player(element);
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(tick_called).should_be_false();
        },
        
        "should convert time to ms before call the tick function": function() {
            var player = new Mooplay.Subtitle.Player(element);
            player.subs_hash = subs_root;
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(abs_movie_time_arg_value).should_be(5000);
        }

    });
    
})();