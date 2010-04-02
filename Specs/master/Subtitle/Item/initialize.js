(function() {
    
    var item = null;
    var text = "sd4sdf35sd35";
    var start = 0;
    var end = 10000;

    
    describe('Subtitle.Item.initialize function', {
        
        before_each: function() {
            
            item = new MooPlay.Subtitle.Item(start, end, [text]);
            
        },
        
        after_each: function() {

            item = null;
            text = "sd4sdf35sd35";
            start = 0;
            end = 10000;
            
        },
        
        "item.start should be initialized": function() {
            value_of(item.start).should_be(start);
        },
        
        "item.end should be initialized": function() {
            value_of(item.end).should_be(end);
        },
        
        "item.element should be initialized": function() {
            value_of(item.element.firstChild.firstChild.nodeValue).should_be(text);
        }

    });
    
})();