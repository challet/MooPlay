(function() {
    
    var element = null;
    var start = null;
    var end = null;
    var subtitle_item_inside = null;
    var subtitle_item_outside = null;

    
    describe('Subtitle.Tree.getChildren function', {
        
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
            value_of(tree.children).should_have_exactly(tree.nb_childs, "items");
        },
        
        "a tree with children should return the children tree": function() {
            tree.children = [1, 2];
            value_of(tree.getChildren(false)).should_be(tree.children);
            value_of(tree.getChildren(true)).should_be(tree.children);
            value_of(tree.getChildren(true)).should_have_exactly(tree.children.length, "items");
            value_of(tree.getChildren(true)).should_have_exactly(tree.children.length, "items");
        }

    });
    
})();