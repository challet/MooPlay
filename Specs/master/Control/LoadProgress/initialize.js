(function() {
    
    var video_div = null;
    var container_progress_bar = null;
    var progressbar = null;
    var progress = null;
    
    var tick_executed = false;
    var tick_arg_loaded = null;
    var tick_arg_total = null; 
    var preload_executed = false;
    var preload_arg = null;
    
    var initial_prototype = {};
    
    describe('Control.LoadProgress.initialize function', {
        
        before_all: function() {
            initial_prototype = {
                tick: MooPlay.Control.LoadProgress.prototype.tick,
                preload: MooPlay.Control.LoadProgress.prototype.preload
            };
        },
        
        after_all: function() {
            MooPlay.Control.LoadProgress.prototype.tick = initial_prototype.tick;
            MooPlay.Control.LoadProgress.prototype.preload = initial_prototype.preload;
        },
        
        before_each: function() {

            video_div = new Element('div', {
                id: 'video',
                styles: {
                    width: 400,
                    height: 300,
                    position: 'absolute',
                    top:0
                }
            }).inject(document.body);

            container_progress_bar = new Element('div', {
                id: 'progress_container',
                styles: {
                    width: 400,
                    height: 5,
                    background: '#a0a0a0'
                }
            }).inject(document.body);
            
            MooPlay.Control.LoadProgress.prototype.tick = function(loaded, total) {
                tick_executed = true;
                tick_arg_loaded = loaded;
                tick_arg_total = total;
            };

            MooPlay.Control.LoadProgress.prototype.preload = function(state) {
                preload_executed = true;
                preload_arg = state;
            };
            
            progressbar = new ProgressBar({
                container: $('progress_container'),
                startPercentage: 0,
                step: 0,
            });
            progress = new MooPlay.Control.LoadProgress( $('video'), progressbar);
            
        },
        
        after_each: function() {
            
            video_div.dispose();
            container_progress_bar.dispose();
            
            video_div = null;
            container_progress_bar = null;
            progressbar = null;
            progress = null;
            
            tick_executed = false;
            tick_arg_loaded = null;
            tick_arg_total = null; 
            preload_executed = false;
            preload_arg = null;
            
        },
        
        "progress.progressbar should be the progressbar element": function() {
            value_of(progress.progressbar).should_be(progressbar);
        },
        
        "progress.video should be the video_div element": function() {
            value_of(progress.video).should_be(video_div);
        },
        
        "'video.loadstart' event should callback the preload function with 'true' arg value": function() {
            video_div.fireEvent('loadstart');
            value_of(preload_executed).should_be_true();
            value_of(preload_arg).should_be_true();
        },
                
        "'video.seeking' event should callback the prelaod function with 'true' arg value": function() {
            video_div.fireEvent('seeking');
            value_of(preload_executed).should_be_true();
            value_of(preload_arg).should_be_true();
        },
        
        "'video.loadedmetadata' event should callback the prelaod function with 'false' arg value": function() {
            video_div.fireEvent('loadedmetadata');
            value_of(preload_executed).should_be_true();
            value_of(preload_arg).should_be_false();
        },
        
        "'video.seeked' event should callback the prelaod function with 'false' arg value": function() {
            video_div.fireEvent('seeked');
            value_of(preload_executed).should_be_true();
            value_of(preload_arg).should_be_false();
        },
        
        "'video.progress' event with no length computable should callback the prelaod function with 'true' arg value": function() {
            video_div.fireEvent('progress', {event: {lengthComputable: false}});
            value_of(preload_executed).should_be_true();
            value_of(preload_arg).should_be_true();
        },
        
        "'video.progress' event with length computable should callback the tick function": function() {
            video_div.fireEvent('progress', {event: {lengthComputable: true, loaded: 7647836, total: 98989713}});
            value_of(tick_executed).should_be_true();
            value_of(tick_arg_loaded).should_be(7647836);
            value_of(tick_arg_total).should_be(98989713);
        }
        
    });
    
})();