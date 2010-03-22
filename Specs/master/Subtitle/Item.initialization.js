(function() {
    
    var item = null;
    var element = null;
    var start = null;
    var end = null;

    
    describe('Subtitle.Item.initialization function', {
        
        before_each: function() {

            element = new Element('div', {
                id: 'video',
                styles: {
                    width: 400,
                    height: 300,
                    position: 'absolute',
                    top:0
                }
            });
            
            start = 0;
            end = 10000;
            
            item = new Video.Subtitle.Item(start, end, element);
            
        },
        
        after_each: function() {

            item = null;
            element = null;
            start = null;
            end = null;
            
        },
        
        "item.start should be initialized": function() {
            value_of(item.start).should_be(start);
        },
        
        "item.end should be initialized": function() {
            value_of(item.end).should_be(end);
        },
        
        "item.element should be initialized": function() {
            value_of(item.element).should_be(element);
        }

    });
    
})();