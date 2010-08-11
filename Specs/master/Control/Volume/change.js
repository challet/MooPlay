(function() {

    var slider = null;
    var slider_div = null;
    var knob_div = null;
    var video = null;
    var volume = null;

    describe('Control.Volume.change function', {

        
        before_each: function() {
            
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
            
            video = new Element('video', {
                id: 'video',
                styles: {
                    width: 50,
                    height: 50
                }
            }).inject(document.body);
            
            slider = new Slider(slider_div, knob_div);
            volume = new MooPlay.Control.Volume(video, slider);            
            
        },
        
        after_each: function() {
            
            slider_div.dispose();
            knob_div.dispose();
            video.dispose();
            
            slider = null;
            slider_div = null;
            knob_div = null;
            video = null;
            volume = null;

        },
        
        "should set volume according to position": function() {
            slider.steps = 100;
            volume.change(47);
            value_of(video.volume.round(2)).should_be(0.47);
        },
        
        "should unmute if the according option allows it": function() {
            volume.options.auto_unmute = true;
            video.muted = true;
            volume.change(47);
            value_of(video.muted).should_be_false();
        },
        
        "should not unmute if the according option denies it": function() {
            volume.options.auto_unmute = false;
            video.muted = true;
            volume.change(47);
            value_of(video.muted).should_be_true();
        }
        
    });
    
})();
