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
            
            tree = new MooPlay.Subtitle.Tree(start, end);
            

            subtitle_item_inside =  new MooPlay.Subtitle.Item(1000, 4000, ["dfgkljdf"]);
            subtitle_item_outside =  new MooPlay.Subtitle.Item(15000, 20000, ["sdf2sd42f"]);
            
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