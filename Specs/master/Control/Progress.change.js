(function() {
    
    var video_div = null;
    var slider_div = null;
    var knob_div = null;
    var slider = null;
    
    describe('Control.Progress.tick function', {
        
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
            progress = new Video.Control.Progress(slider, video_div);

        },
        
        after_each: function() {
            
            video_div.dispose();
            knob_div.dispose();
            slider_div.dispose();
            
            video_div = null;
            slider_div = null;
            knob_div = null;
            
        },
        
        "progress.change should set the video.currentTime": function() {
            
            var duration = 10000;
            var slider_length = 100;
            var click_position = 50;
            
            video_div.duration = duration;
            
            progress.change({
                client: {
                    x: click_position
                },
                target: {
                    offsetLeft: 0,
                    offsetWidth: slider_length
                }
            });

            value_of(video_div.currentTime).should_be(duration * click_position / slider_length);
        }
        
    });
    
})();