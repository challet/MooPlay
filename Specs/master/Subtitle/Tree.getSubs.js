(function() {
    
    var element = null;
    var start = null;
    var end = null;
    var subtitle_item_inside = null;
    var subtitle_item_inside_child = null;

    
    describe('Subtitle.Tree.getSubs function', {
        
        before_each: function() {
            
            start = 0;
            end = 10000;
            
            tree = new MooPlay.Subtitle.Tree(start, end);
            

            subtitle_item_inside =  new MooPlay.Subtitle.Item(1000, 6000, ["lmdfkgmldfk"]);
            subtitle_item_inside_child =  new MooPlay.Subtitle.Item(2000, 4000, ["sdf24sd1f23"]);
            
        },
        
        after_each: function() {

            element = null;
            start = null;
            end = null;
            subtitle_item_inside = null;
            subtitle_item_inside_child = null;
            
        },
        
        "timestamp outside node should return an empty array": function() {
            value_of(tree.getSubs(20000)).should_be_empty();
        },
        
        "should return subs from itself": function() {
            tree.children = [];
            tree.subs.push(subtitle_item_inside);
            value_of(tree.getSubs(2000)).should_include(subtitle_item_inside);
        },
        
        "should not return subs from itself": function() {
            tree.children = [];
            tree.subs.push(subtitle_item_inside);
            value_of(tree.getSubs(7000)).should_be_empty(subtitle_item_inside);
        },
        
        "should return subs from children": function() {
            var sub_tree = new MooPlay.Subtitle.Tree(0, 5000);
            sub_tree.subs.push(subtitle_item_inside_child);
            tree.children.push(sub_tree);
            value_of(tree.getSubs(3000)).should_include(subtitle_item_inside_child);
        },
        
        "should not return subs from children": function() {
            var sub_tree = new MooPlay.Subtitle.Tree(0, 5000);
            sub_tree.subs.push(subtitle_item_inside_child);
            tree.children.push(sub_tree);
            value_of(tree.getSubs(7000)).should_be_empty();
        },
        
        "should return both subs from children and itself": function() {
            tree.subs.push(subtitle_item_inside);
            var sub_tree = new MooPlay.Subtitle.Tree(0, 5000);
            sub_tree.subs.push(subtitle_item_inside_child);
            tree.children.push(sub_tree);
            value_of(tree.getSubs(3000)).should_include(subtitle_item_inside);
            value_of(tree.getSubs(3000)).should_include(subtitle_item_inside_child);
        }

    });
    
})();