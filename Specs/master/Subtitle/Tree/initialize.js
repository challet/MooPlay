(function() {
    
    var item = null;
    var element = null;
    var start = null;
    var end = null;

    describe('Subtitle.Tree.initialize function', {
        
        before_each: function() {
            
            start = 0;
            end = 10000;
            
            tree = new MooPlay.Subtitle.Tree(start, end);
            
        },
        
        after_each: function() {

            tree = null;
            start = null;
            end = null;
            
        },
        
        "tree.start should be initialized": function() {
            value_of(tree.start).should_be(start);
        },
        
        "tree.end should be initialized": function() {
            value_of(tree.end).should_be(end);
        }

    });
    
})();