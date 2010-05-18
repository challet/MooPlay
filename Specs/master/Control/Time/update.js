(function() {
    
    var element = null;
    var video = null;
    
    describe('Control.Time.update function', {
        
        before_each: function() {

            element = new Element('div', {
                id: 'time_container',
                styles: {
                    width: 50,
                    height: 50
                }
            }).inject(document.body);
            
            video = new Element('video', {
                id: 'video',
                styles: {
                    width: 50,
                    height: 50
                }
            }).inject(document.body);
            
            time_control = new MooPlay.Control.Time(video, element, {pattern: 'a{h}b{m}c{s}d{ms}e'});

        },
        
        after_each: function() {
            element.dispose();
            video.dispose();
            element = null;
            video = null;
        },
        
        "update should set a container text": function() {
            var start_inner_text = element.get('text');
            time_control.update(212122424);
            value_of(element.get('text')).should_not_be(start_inner_text);
        },
        
        "update should set a container text according to the pattern option": function() {
            time_control.update(212122424);
            value_of(element.get('text')).should_match(/a[0-9]+b[0-9]+c[0-9]+d[0-9]+e/);
        },
        
        "update should set a container text according to the time passed": function() {
            time_control.update( MooPlay.Utils.sexagesimalToTimestamp({ h: 1, m: 27, s: 52, ms: 406 }));
            value_of(element.get('text')).should_be('a1b27c52d406e');
        }
        
        
    });
    
})();