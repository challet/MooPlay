(function() {
    
    var mock_video_div = null;
    var slider_div = null;
    var knob_div = null;
    var slider = null;
    
    describe('Control.PlayProgress.change function', {
        
        before_each: function() {

            mock_video_div = new Element('div', {
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
            progress = new MooPlay.Control.PlayProgress(mock_video_div, slider);

        },
        
        after_each: function() {
            
            mock_video_div.dispose();
            knob_div.dispose();
            slider_div.dispose();
            
            video_div = null;
            slider_div = null;
            knob_div = null;
            
        },
        
        "progress.change should set the video.currentTime": function() {
            
            var duration = 10000;
            var click_position = 50;
            
            slider.steps = 100;
            
            mock_video_div.duration = duration;
            progress.change(50);

            value_of(mock_video_div.currentTime).should_be(5000);
        }
        
    });
    
})();