(function() {

    var slider = null;
    var slider_div = null;
    var knob_div = null;
    var video = null;
    var volume = null;
    var to_position_arg_value = null;
    var set_style_arg_value = null;

    describe('Control.Volume.update function', {

        
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
            slider.toPosition = function(arg) {
                to_position_arg_value = arg;
                return "d42fds2fds2f";
            };
            slider.knob.setStyle = function (prop, value) {
                set_style_arg_value = value;
            };
            volume = new MooPlay.Control.Volume(slider, video);            
            
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
            to_position_arg_value = null;
            set_style_arg_value = null;
            
        },
        
        "should consider volume as 0 when muted": function() {
            volume.update({target: {muted: true, volume: 1}});
            value_of(to_position_arg_value).should_be(0);
        },
        
        "should pass a position function of the volume": function() {
            slider.range = 100;
            volume.update({target: {muted: false, volume: 0.5}});
            value_of(to_position_arg_value).should_be(50);
        },
        
        "should set style according to computed position": function() {
            volume.update({target: {muted: false, volume: 0.5}});
            value_of(set_style_arg_value).should_be("d42fds2fds2f");
        }
        
    });
    
})();
