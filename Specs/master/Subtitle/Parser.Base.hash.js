(function() {
    
    var sub_element = null;
    var subs_root = null;
    var subs = [];
    var parser = null;
    var subs_passed_to_hash = [];
    var abs_start_value = 16513;
    var abs_end_value = 367992;
    
    
    describe('Subtitle.Parser.Base.hash function', {

        before_each: function() {
            
            sub_element = new Element('div', {
                id: 'sub'
            });
            
            subs = [
                new Video.Subtitle.Item(1000, 6000, sub_element),
                new Video.Subtitle.Item(4000, 9000, sub_element)
            ];
            
            // to avoid any ajax call
            Video.Subtitle.Parser.Base.prototype.load = function() {
                return;
            }
            
            Video.Subtitle.Tree.prototype.addSub = function(sub) {
                subs_passed_to_hash.push(sub);
            }
            
            parser = new Video.Subtitle.Parser.Base();

        },
        
        after_each: function() {
            
            sub_element = null;
            subs_root = null;
            subs = [];
            parser = null;
            subs_passed_to_hash = [];
            abs_start_value = 16513;
            abs_end_value = 367992;
            
        },  
        
        "should set the start of the hash root": function() { 
            var hash_root = parser.hash(abs_start_value, abs_end_value, subs);
            value_of(hash_root.start).should_be(abs_start_value);
        },
        
        "should set the end of the hash root": function() { 
            var hash_root = parser.hash(abs_start_value, abs_end_value, subs);
            value_of(hash_root.end).should_be(abs_end_value);
        },
        
        "should pass all the subs to the hash root": function() { 
            var hash_root = parser.hash(abs_start_value, abs_end_value, subs);
            value_of(subs_passed_to_hash).should_include(subs[0]);
            value_of(subs_passed_to_hash).should_include(subs[1]);
        }
        
        
    });
    
})();