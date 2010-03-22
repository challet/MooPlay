(function() {
    
    var item = null;
    var element = null;
    var start = null;
    var end = null;
    var subtitle_item_inside = null;
    var subtitle_item_outside = null;

    describe('Subtitle.Tree.doesSubtitleFit function', {
        
        before_each: function() {
            
            start = 0;
            end = 10000;
            
            tree = new Video.Subtitle.Tree(start, end);
            
            sub_element = new Element('div', {
                id: 'video',
                styles: {
                    width: 400,
                    height: 300,
                    position: 'absolute',
                    top:0
                }
            });

            subtitle_item_inside =  new Video.Subtitle.Item(1000, 4000, sub_element);
            subtitle_item_outside =  new Video.Subtitle.Item(15000, 20000, sub_element);
            
        },
        
        after_each: function() {

            tree = null;
            start = null;
            end = null;
            subtitle_item_inside = null;
            subtitle_item_outside = null;
            
        },
        
        "should return true with subitle inside": function() {
            value_of(tree.doesSubtitleFit(subtitle_item_inside)).should_be_true();
        },
        
        "should return false with subitle outside": function() {
            value_of(tree.doesSubtitleFit(subtitle_item_outside)).should_be_false();
        }

    });
    
})();