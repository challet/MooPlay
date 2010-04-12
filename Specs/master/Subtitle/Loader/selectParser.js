(function() {
    
    var initial_prototype = {};
    
    var srt_url = '/mysubtitle.srt';
    var sub_url = 'http://mydomain.com/mysubitle.sub';
    
    var loader = null;
    var subrip_initialized = false;
    var subviewer_initialized = false;
    
    describe('Subtitle.Loader.selectParser function', {
        
        before_all: function() {
            initial_prototype = {
                load: MooPlay.Subtitle.Loader.prototype.load,
                subrip_initialize: MooPlay.Subtitle.Parser.SubRip.prototype.initialize,
                subviewer_initialized: MooPlay.Subtitle.Parser.SubViewer.prototype.initialize
            };
        },

        after_all: function() {
            MooPlay.Subtitle.Loader.prototype.load = initial_prototype.load;
            MooPlay.Subtitle.Parser.SubRip.prototype.initialize = initial_prototype.subrip_initialize;
            MooPlay.Subtitle.Parser.SubViewer.prototype.initialize = initial_prototype.subviewer_initialized;
        },
        
        
        before_each: function() {
            MooPlay.Subtitle.Loader.prototype.load = $empty;
            MooPlay.Subtitle.Parser.SubRip.prototype.initialize = function() {
                subrip_initialized = true;
            };
            MooPlay.Subtitle.Parser.SubViewer.prototype.initialize = function() {
                subviewer_initialized = true;
            }
        },
        
        after_each: function() {
            loader = null;
            subrip_initialized = false;
            subviewer_initialized = false;
        },
        
        "should handle relative url": function() {
            var loader = new MooPlay.Subtitle.Loader(srt_url);
            try {
                loader.selectParser();
            } catch(e) {
                value_of().should_fail();
            }
        },
        
        "should handle absolute url": function() {
            var loader = new MooPlay.Subtitle.Loader(sub_url);
            try {
                loader.selectParser();
            } catch(e) {
                value_of().should_fail();
            }
        },
        
        "should return the SubRip parser class": function() {
            var loader = new MooPlay.Subtitle.Loader(srt_url);
            new (loader.selectParser())();
            value_of(subrip_initialized).should_be_true();
        },
        
        "should return the SubViewer parser class": function() {
            var loader = new MooPlay.Subtitle.Loader(sub_url);
            new (loader.selectParser())();
            value_of(subviewer_initialized).should_be_true();
        },
        
    });
    
})();
