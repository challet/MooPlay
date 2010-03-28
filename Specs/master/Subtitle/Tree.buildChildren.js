(function() {
    
    var element = null;
    var start = null;
    var end = null;
    var subtitle_item_inside = null;
    var subtitle_item_outside = null;

    
    describe('Subtitle.Tree.buildChildren function', {
        
        before_each: function() {
            
            start = 0;
            end = 10000;
            
            tree = new MooPlay.Subtitle.Tree(start, end);
            
        },
        
        after_each: function() {

            element = null;
            start = null;
            end = null;
            subtitle_item_inside = null;
            subtitle_item_outside = null;
            
        },
        
        "a tree with no children and called with even_empty=false should return an empty array": function() {
            value_of(tree.getChildren(false)).should_be_empty();
        },
        
        "a tree with no children and called with even_empty=true should return an non-empty array": function() {
            value_of(tree.getChildren(true)).should_not_be_empty();
        },
        
        "a tree with no children and called with even_empty=true should construct a children tree": function() {
            tree.getChildren(true);
            value_of(tree.children).should_not_be_empty();
        },
        
        "a tree with children should return the children tree": function() {
            tree.children = [1, 2];
            value_of(tree.getChildren(false)).should_be(tree.children);
            value_of(tree.getChildren(true)).should_be(tree.children);
        }

    });
    
})();