(function() {
    
    
    var parser = null;
    var raw_one_sub = "00:00:01.150,00:00:05.930\nmysub1\n";
    var raw_subs = "00:00:01.150,00:00:05.930\nmysub1\n\n00:00:12.457,00:00:15.725\nmysub2";
    var raw_sub_multi_lines = "00:00:01.150,00:00:05.930\nmysubline1[BR]mysubline2";
    var start_value = null;
    var end_value = null;
    var text_value = null;

    var initial_prototype = {};
    
    describe('Subtitle.Parser.SubViewer.parse function', {
        
        before_all: function() {
            initial_prototype = {
                initialize_parser: MooPlay.Subtitle.Parser.SubViewer.prototype.initialize,
                initialize_item: MooPlay.Subtitle.Item.prototype.initialize
            };
        },
        
        after_all: function() {
            MooPlay.Subtitle.Parser.SubViewer.prototype.initialize = initial_prototype.initialize_parser;
            MooPlay.Subtitle.Item.prototype.initialize = initial_prototype.initialize_item;
        },
        
        
        before_each: function() {
            
            MooPlay.Subtitle.Parser.SubViewer.prototype.initialize = $empty;
            MooPlay.Subtitle.Item.prototype.initialize = function(start, end, text) {
                start_value = start;
                end_value = end,
                text_value = text;
            };
                        
            parser = new MooPlay.Subtitle.Parser.SubViewer();

        },
        
        after_each: function() {
            
            parser = null;
            raw_one_sub = "00:00:01.150,00:00:05.930\nmysub1\n";
            raw_subs = "00:00:01.150,00:00:05.930\nmysub1\n\n00:00:012.457,00:00:15.725\nmysub2";
            raw_sub_multi_lines = "00:00:01.150,00:00:05.930\nmysubline1[BR]mysubline2";
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