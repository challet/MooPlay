(function() {

    var initial_prototype = {};

    var slider = null;
    var slider_div = null;
    var knob_div = null;
    var video = null;
    var change_called = false;
    var update_called = false;

    describe('Control.Volume.initialize function', {
        
        before_all: function() {
            initial_prototype.change = MooPlay.Control.Volume.prototype.change;
            initial_prototype.update = MooPlay.Control.Volume.prototype.update;
        },
        
        after_all: function() {
            MooPlay.Control.Volume.prototype.change = initial_prototype.change;
            MooPlay.Control.Volume.prototype.update = initial_prototype.update;
        },
        
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
                        
            MooPlay.Control.Volume.prototype.update = function() {
                update_called = true;
            };
            
            MooPlay.Control.Volume.prototype.change = function() {
                change_called = true;
            };
            
        },
        
        after_each: function() {
            
            slider_div.dispose();
            knob_div.dispose();
            video.dispose();
            
            slider = null;
            slider_div = null;
            knob_div = null;
            video = null;
            change_called = false;
            update_called = false;
            
        },
                
        "should handle the volumechange video event": function() {
            new MooPlay.Control.Volume(video, slider);
            video.fireEvent('volumechange', {preventDefault: $empty});
            value_of(update_called).should_be_true();
        },

        "should handle the change slider event": function() {
            new MooPlay.Control.Volume(video, slider);
            slider.fireEvent('change',{ preventDefault: $empty});
            value_of(change_called).should_be_true();
        }
        
    });
    
})();
