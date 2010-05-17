(function() {
    
    var video_div = null;
    var slider_div = null;
    var knob_div = null;
    var slider = null;
    var progress = null;
    var tick_executed = false;
    var change_executed = false;
    var resume_executed = false;
    var suspend_executed = false;
    
    var initial_prototype = {};
    
    describe('Control.PlayProgress.initialize function', {
        
        before_all: function() {
            initial_prototype = {
                tick: MooPlay.Control.PlayProgress.prototype.tick,
                change: MooPlay.Control.PlayProgress.prototype.change,
                suspend: MooPlay.Control.PlayProgress.prototype.suspend,
                resume: MooPlay.Control.PlayProgress.prototype.resume
            };
        },
        
        after_all: function() {
            MooPlay.Control.PlayProgress.prototype.tick = initial_prototype.tick;
            MooPlay.Control.PlayProgress.prototype.change = initial_prototype.change;
            MooPlay.Control.PlayProgress.prototype.suspend = initial_prototype.suspend;
            MooPlay.Control.PlayProgress.prototype.resume = initial_prototype.resume;
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
            
            MooPlay.Control.PlayProgress.prototype.tick = function(currentTime, duration) {
                tick_executed = true;
            };

            MooPlay.Control.PlayProgress.prototype.change = function(event) {
                change_executed = true;
            };
            
            MooPlay.Control.PlayProgress.prototype.resume = function(currentTime, duration) {
                resume_executed = true;
            };

            MooPlay.Control.PlayProgress.prototype.suspend = function(event) {
                suspend_executed = true;
            };
            
            slider = new Slider(slider_div, knob_div);
            progress = new MooPlay.Control.PlayProgress(slider, video_div);

            
        },
        
        after_each: function() {
            
            video_div.dispose();
            knob_div.dispose();
            slider_div.dispose();
            
            video_div = null;
            slider = null;
            progress = null;
            tick_executed = false;
            change_executed = false;
            resume_executed = false;
            suspend_executed = false;
            
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
                
        "'video.seeked' event should callback the resume function": function() {
            video_div.fireEvent('seeked', {target: video_div});
            value_of(resume_executed).should_be_true();
        },
        
        "'knob.mousedown' should callback the suspend function": function() {
            slider.knob.fireEvent('mousedown', {page: {z:0}});
            value_of(suspend_executed).should_be_true();
        },
        
        "'knob.mouseup' should callback the resume function": function() {
            slider.knob.fireEvent('mouseup', {page: {z:0}});
            value_of(resume_executed).should_be_true();
        },
        
        "'slider.change' should callback the change function": function() {
            slider.fireEvent('change');
            value_of(change_executed).should_be_true();
        }

    });
    
})();