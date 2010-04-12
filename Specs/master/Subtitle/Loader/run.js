(function() {
    
    var initial_prototype = {};
    
    var srt_url = '/mysubtitle.srt';
    var sub_url = 'http://mydomain.com/mysubitle.sub';
    
    var loader = null;
    var subs_data = "dfsklg5ds56sd3d";
    var parser_arg_value = null;
    var subrip_initialized = false;
    var options_value = {onComplete: 'dflmkdsf522425'};
    var options_arg_value = null;
    
    describe('Subtitle.Loader.run function', {
        
        before_all: function() {
            initial_prototype = {
                load: MooPlay.Subtitle.Loader.prototype.load,
                selectParser: MooPlay.Subtitle.Loader.prototype.selectParser,
                subrip_initialize: MooPlay.Subtitle.Parser.SubRip.prototype.initialize
            };
        },

        after_all: function() {
            MooPlay.Subtitle.Loader.prototype.load = initial_prototype.load;
            MooPlay.Subtitle.Loader.prototype.selectParser = initial_prototype.selectParser;
            MooPlay.Subtitle.Parser.SubRip.prototype.initialize = initial_prototype.subrip_initialize;
        },        
        
        before_each: function() {
            MooPlay.Subtitle.Loader.prototype.load = $empty;
            MooPlay.Subtitle.Parser.SubRip.prototype.initialize = function(data, options) {
                subrip_initialized = true;
                parser_arg_value = data;
                options_arg_value = options;
            };
        },
        
        after_each: function() {
            loader = null;
            data = "dfsklg5ds56sd3d";
            parser_arg_value = null;
            subrip_initialized = false;
        },
        
        "should pass the first argument to the parser ": function() {
            var loader = new MooPlay.Subtitle.Loader(srt_url);
            loader.run(subs_data);
            value_of(parser_arg_value).should_be(subs_data);
        },
        
        "should pass the received onComplete option to the parser ": function() {
            var loader = new MooPlay.Subtitle.Loader(srt_url, options_value);
            loader.run(subs_data);
            value_of(options_arg_value.onComplete).should_be(options_value.onComplete);
        }
        
    });
    
})();
