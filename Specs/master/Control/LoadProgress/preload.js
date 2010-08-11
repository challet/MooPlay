(function() {
    
    var video_div = null;
    var container_progress_bar = null;
    var progressbar = null;
    var progress = null;

    
    var initial_prototype = {};
    
    describe('Control.LoadProgress.preload function', {
        
        
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
            
        },
        
        "should add the specified class when preload is on": function() {
            progress.preload(true);
            value_of(progressbar.options.container.hasClass(progress.options.preload_class)).should_be_true();
        },
        
        "should remove the specified  when preload is off": function() {
            progressbar.options.container.addClass(progress.options.preload_class);
            progress.preload(false);
            value_of(progressbar.options.container.hasClass(progress.options.preload_class)).should_be_false();
        },
        
        

    });
    
})();