(function() {
    
    var video_div = null;
    var slider_div = null;
    var knob_div = null;
    var slider = null;
    var progress = null;
    var tick_executed = false;
    var tick_currentTime_arg = null;
    var tick_duration_arg = null;
    var change_executed = false;
    
    describe('Control.Progress.initialize function', {
        
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

            slider_div = new Element('div', {
                id: 'slider',
                styles: {
                    width: 400,
                    height: 5,
                    background: '#a0a0a0'
                }
            }).inject(document.body);

            knob_div = new Element('div', {
                id: 'knob',
                styles: {
                    width: 5,
                    height: 5,
                    background: '#ffff80'
                }
            }).inject(slider_div);

            slider = new Slider(slider_div, knob_div);
            progress = new MooPlay.Control.Progress(slider, video_div);

            progress.tick = function(currentTime, duration) {
                tick_executed = true;
                tick_currentTime_arg = currentTime;
                tick_duration_arg = duration;
            };

            progress.change = function(event) {
                change_executed = true;
            };
        },
        
        after_each: function() {
            
            video_div.dispose();
            knob_div.dispose();
            slider_div.dispose();
            
            vvideo_div = null;
            slider = null;
            progress = null;
            tick_executed = false;
            tick_currentTime_arg = null;
            tick_duration_arg = null;
            change_executed = false;
            
        },
        
        "progress.slider should be the slider element": function() {
            value_of(progress.slider).should_be(slider);
        },
        
        "progress.video should be the video_div element": function() {
            value_of(progress.video).should_be(video_div );
        },
        
        "'video.timeupdate' event should callback the tick function": function() {
            video_div.fireEvent('timeupdate', {target: video_div});
            value_of(tick_executed).should_be_true();
        },
        
        "the tick function should get ms values as args": function() {
            var currentTime = 215.32;
            var duration = 1695.684;
            video_div.fireEvent('timeupdate', {target: {currentTime: currentTime, duration: duration}});
            value_of(tick_currentTime_arg).should_be(currentTime * 1000);
            value_of(tick_duration_arg).should_be(duration * 1000);
        },
        
        "'slider.element.click' should callback the change function": function() {
            slider.element.fireEvent('click');
            value_of(change_executed).should_be_true();
        }

    });
    
})();