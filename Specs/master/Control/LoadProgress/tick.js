(function() {
    
    var video_div = null;
    var container_progress_bar = null;
    var progressbar = null;
    var progress = null;

    var progressbar_set_called = false;
    var progressbar_set_arg = null;
    
    var initial_prototype = {};
    
    describe('Control.LoadProgress.tick function', {
        
        
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

            progressbar.set = function(percentage) {
                progressbar_set_called = true;
                progressbar_set_arg = percentage;
            }
        },
        
        after_each: function() {
            
            video_div.dispose();
            container_progress_bar.dispose();
            
            video_div = null;
            container_progress_bar = null;
            progressbar = null;
            progress = null;
            
            progressbar_set_called = false;
            progressbar_set_arg = null;
            
        },
        
        "should call the progress bar set function": function() {
            progress.tick();
            value_of(progressbar_set_called).should_be_true();
        },
        
        "should compute the right progress percentage": function() {
            progress.tick(4, 10);
            value_of(progressbar_set_arg).should_be(40);
        },
        
        

    });
    
})();