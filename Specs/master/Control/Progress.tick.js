(function() {
    
    var video_div = null;
    var slider_div = null;
    var knob_div = null;
    var slider = null;
    var progress = null;
    var set_executed = false;
    var set_step_arg = null;
    
    describe('Control.PlayProgress.tick function', {
        
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
            progress = new MooPlay.Control.PlayProgress(slider, video_div);

            slider.set = function(step) {
                set_executed = true;
                set_step_arg = step;
            };

        },
        
        after_each: function() {
            
            video_div.dispose();
            knob_div.dispose();
            slider_div.dispose();
            
            video_div = null;
            slider_div = null;
            knob_div = null;
            slider = null;
            progress = null;
            set_executed = false;
            set_step_arg = null;
            
        },
        
        "progress.tick should call the slider.set function": function() {
            progress.tick(0,1000);
            value_of(progress.set_executed).should_be_true;
        },
        
        "progress.tick should pass the ratio between currentTime and duration to the slider.set function": function() {
            var currentTime = 250;
            var duration = 1000;
            progress.tick(currentTime, duration);
            value_of(set_step_arg).should_be(slider.steps * currentTime / duration);
        }
        
    });
    
})();