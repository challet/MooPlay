(function() {
    
    var subs_root = null;
    var element = null;
    var element_sub = null;
    var player = null;
    var tick_called = false;
    var abs_movie_time_arg_value = null;
    var load_subtitles_called = false;
    var load_subtitles_arg = null;
    
    var initial_prototype = {};
    
    describe('Subtitle.Player.initialize function', {
        
        before_all: function() {
            initial_prototype = {
                tick: MooPlay.Subtitle.Player.prototype.tick,
                loadSubtitles: MooPlay.Subtitle.Player.prototype.loadSubtitles
            };
        },
        
        after_all: function() {
            MooPlay.Subtitle.Player.prototype.tick = initial_prototype.tick;
            MooPlay.Subtitle.Player.prototype.loadSubtitles = initial_prototype.loadSubtitles;
        },
        
        before_each: function() {
            
            subs_root = new MooPlay.Subtitle.Tree(0,10000);

            element = new Element('div', {
                id: 'video',
                styles: {
                    width: 400,
                    height: 300,
                    position: 'absolute',
                    top:0
                }
            });
            
            element_sub = new Element('div', {
                id: 'sub'
            });

            MooPlay.Subtitle.Player.prototype.tick = function(abs_movie_time) {
                abs_movie_time_arg_value = abs_movie_time;
                tick_called = true;
            };
            
            MooPlay.Subtitle.Player.prototype.loadSubtitles = function(subs) {
                load_subtitles_called = true;
                load_subtitles_arg = subs;
            }
            
        },
        
        after_each: function() {

            item = null;
            element = null;
            element_sub = null;
            player = null;
            tick_called = false;
            abs_movie_time_arg_value = null;
            load_subtitles_called = false;
            load_subtitles_arg = null;
            
        },
        
        
        "should call the load function if subtitles are passed as option": function() {
            var player = new MooPlay.Subtitle.Player(element, element_sub, {subs_hash: subs_root});
            value_of(load_subtitles_called).should_be_true();
            value_of(load_subtitles_arg).should_be(subs_root);
        },
        
        "should set a callback from video.timeupdate update and call it if subtitles are loaded": function() {
            var player = new MooPlay.Subtitle.Player(element, element_sub);
            player.subs_hash = subs_root;
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(tick_called).should_be_true();
        },
        
        "should set a callback from video.timeupdate update and call it if subtitles are displayed": function() {
            var player = new MooPlay.Subtitle.Player(element, element_sub);
            player.displayed = ["4sd2fds25"];
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(tick_called).should_be_true();
        },
        
        "should not to call the callback if no subtitles are loaded nor displayed": function() {
            var player = new MooPlay.Subtitle.Player(element, element_sub);
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(tick_called).should_be_false();
        },
        
        "should convert time to ms before call the tick function": function() {
            var player = new MooPlay.Subtitle.Player(element, element_sub);
            player.subs_hash = subs_root;
            element.fireEvent('timeupdate', {target:{currentTime: 5}});
            value_of(abs_movie_time_arg_value).should_be(5000);
        }

    });
    
})();