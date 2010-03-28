(function() {
    
    var item = null;
    var element = null;
    var start = null;
    var end = null;
    var subtitle_item_inside = null;
    var subtitle_item_outside = null;

    describe('Subtitle.Tree.addSub function', {
        
        before_each: function() {
            
            start = 0;
            end = 10000;
            
            tree = new MooPlay.Subtitle.Tree(start, end);

            subtitle_item_outside_all_children =  new MooPlay.Subtitle.Item(start, end, ["d54fg4dsf35f4ds23"]);
            subtitle_item_inside_first_children =  new MooPlay.Subtitle.Item(start, (end - start) / tree.nb_childs, ["d54fg4dsf35f4ds23"]);
            
        },
        
        after_each: function() {

            tree = null;
            start = null;
            end = null;
            subtitle_item_inside = null;
            subtitle_item_outside = null;
            
        },
        
        "sub outside all children should be attached to the current tree": function() {
            tree.addSub(subtitle_item_outside_all_children);
            value_of(tree.subs).should_have_exactly(1, "items");
            value_of(tree.subs).should_include(subtitle_item_outside_all_children);
        },
        
        "sub outside all children should not be attached to any child": function() {
            tree.addSub(subtitle_item_outside_all_children);
            tree.getChildren(true).each(function(sub_tree) {
                value_of(sub_tree.subs).should_be_empty();
            })
        },
        
        "sub inside a child should not be attached to the current tree": function() {
            tree.addSub(subtitle_item_inside_first_children);
            value_of(tree.subs).should_be_empty();
        },
        
        "sub inside a child should be attached to a child": function() {
            tree.addSub(subtitle_item_inside_first_children);
            value_of(tree.getChildren(true)[0].subs).should_include(subtitle_item_inside_first_children);
        }

    });
    
})();