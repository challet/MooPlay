(function() {
    
    
    var parser = null;
    var raw_one_sub = "1\n00:00:01,150 --> 00:00:05,930\nmysub1\n";
    var raw_subs = "1\n00:00:01,150 --> 00:00:05,930\nmysub1\n\n5\n00:00:012,457 --> 00:00:15,725\nmysub2";
    var raw_sub_multi_lines = "1\n00:00:01,150 --> 00:00:05,930\nmysubline1\nmysubline2";
    var start_value = null;
    var end_value = null;
    var text_value = null;
    
    
    describe('Subtitle.Parser.SubRip.parse function', {

        before_each: function() {
            
            // to avoid any ajax call
            Video.Subtitle.Parser.Base.prototype.load = function() {
                return;
            };
            
            Video.Subtitle.Item.prototype.initialize = function(start, end, text) {
                start_value = start;
                end_value = end,
                text_value = text;
            };
                        
            parser = new Video.Subtitle.Parser.SubRip();

        },
        
        after_each: function() {
            
            parser = null;
            raw_one_sub = "1\n00:00:01,150 --> 00:00:05,930\nmysub1\n";
            raw_subs = "1\n00:00:01,150 --> 00:00:05,930\nmysub1\n\n5\n00:00:012,457 --> 00:00:15,725\nmysub2";
            start_value = null;
            end_value = null;
            text_value = null;
            
        },  
        
        "should return subs": function() { 
            value_of(parser.parse(raw_subs)).should_have(2, "items");
        },
        
        "should get the right start value from the sub": function() {
            var subs = parser.parse(raw_one_sub);
            value_of(start_value).should_be(1150);
        },
        
        "should get the right end value from the sub": function() {
            var subs = parser.parse(raw_one_sub);
            value_of(end_value).should_be(5930);
        },
        
        "should get the right text value from the sub": function() {
            var subs = parser.parse(raw_one_sub);
            value_of(text_value).should_include('mysub1');
        },
        
        "should handle multi-lines subs text": function() {
            var subs = parser.parse(raw_sub_multi_lines);
            value_of(text_value).should_include('mysubline1');
            value_of(text_value).should_include('mysubline2');
        }
     
        
        
    });
    
})();