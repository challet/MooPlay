(function() {
    
    var subs_root = null;
    var video_div = null;
    var sub_element = null;
    var player = null;
    var on_dispose_called = false;
    var on_dispose_arg = null;
    var on_display_called = false;
    var on_display_arg = null;
    
    describe('Subtitle.Player.tick function', {
        
        before_each: function() {
            
            subs_root = new Video.Subtitle.Tree(0,10000);

            video_div = new Element('video', {
                id: 'video',
                styles: {
                    width: 400,
                    height: 300,
                    position: 'absolute',
                    top: 0
                }
            }).inject(document.body);
            
            container_element = new Element('div', {
                id: 'container'
            }).inject(document.body);
            
            sub_element = new Element('div', {
                id: 'sub'
            });
            
            
            player = new Video.Subtitle.Player(subs_root, video_div, {
                onDispose: function(element) {
                    on_dispose_called = true,
                    on_dispose_arg = element;
                },
                onDisplay: function(element) {
                    on_display_called = true,
                    on_display_arg = element;
                }
            });
        
        },
        
        after_each: function() {

            subs_root = null;
            video_div = null;
            player = null;
            sub_element = null;
            on_dispose_called = false;
            on_dispose_arg = null;
            on_display_called = false;
            on_display_arg = null;
            
        },
        
        "should display sub inside": function() {
            subs_root.subs.push(new Video.Subtitle.Item(3000, 5000, sub_element));
            player.tick(4000);
            value_of(on_display_called).should_be_true();
            value_of(on_display_arg).should_be(sub_element);
        },
        
        "should not display sub outside": function() {
            subs_root.subs.push(new Video.Subtitle.Item(3000, 5000, sub_element));
            player.tick(7000);
            value_of(on_display_called).should_be_false();
        },
        
        "should dispose sub inside": function() {
            player.displayed.push(new Video.Subtitle.Item(3000, 5000, sub_element));
            player.tick(7000);
            value_of(on_dispose_called).should_be_true();
            value_of(on_dispose_arg).should_be(sub_element);
        },

    });
    
})();