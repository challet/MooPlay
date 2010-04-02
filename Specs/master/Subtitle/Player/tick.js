(function() {
    
    var subs_root = null;
    var video_div = null;
    var text = "sdfsd35sdf453sdf345";
    var player = null;
    var on_dispose_called = false;
    var on_dispose_arg = null;
    var on_display_called = false;
    var on_display_arg = null;
    var on_dispose_number_of_calls = 0;
    
    describe('Subtitle.Player.tick function', {
        
        before_each: function() {
            
            subs_root = new MooPlay.Subtitle.Tree(0,10000);

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
                    
            
            player = new MooPlay.Subtitle.Player(video_div, container_element, {
                onDispose: function(element) {
                    on_dispose_called = true,
                    on_dispose_arg = element;
                    on_dispose_number_of_calls++;
                },
                onDisplay: function(element) {
                    on_display_called = true,
                    on_display_arg = element;
                }
            });
            
            player.loadSubtitles(subs_root);
        
        },
        
        after_each: function() {

            subs_root = null;
            video_div = null;
            player = null;
            text = "sdfsd35sdf453sdf345";
            on_dispose_called = false;
            on_dispose_arg = null;
            on_display_called = false;
            on_display_arg = null;
            on_dispose_number_of_calls = 0;
            
        },
        
        "should display sub inside": function() {
            var item = new MooPlay.Subtitle.Item(3000, 5000, [text])
            subs_root.subs.push(item);
            player.tick(4000);
            value_of(on_display_called).should_be_true();
            value_of(on_display_arg).should_be(item.element);
        },
        
        "should not display sub outside": function() {
            subs_root.subs.push(new MooPlay.Subtitle.Item(3000, 5000, [text]));
            player.tick(7000);
            value_of(on_display_called).should_be_false();
        },
        
        "should dispose sub inside": function() {
            var item = new MooPlay.Subtitle.Item(3000, 5000, [text])
            player.displayed.push(item);
            player.tick(7000);
            value_of(on_dispose_called).should_be_true();
            value_of(on_dispose_arg).should_be(item.element);
        },
        
        "should not display any sub if subs are not loaded": function() {
            player.subs_hash = null;
            subs_root.subs.push(new MooPlay.Subtitle.Item(3000, 5000, [text]));
            player.tick(4000);
            value_of(on_display_called).should_be_false();
        },
        
        "should dispose all displayed sub if subs are not loaded": function() {
            player.subs_hash = null;
            var item = new MooPlay.Subtitle.Item(3000, 5000, [text])
            player.displayed.push(item, item);
            player.tick(4000);
            value_of(on_dispose_called).should_be_true();
            value_of(on_dispose_arg).should_be(item.element);
            value_of(on_dispose_number_of_calls).should_be(2);
        }

    });
    
})();