(function() {
    
    var sub_element = null;
    var subs_root = null;
    var subs = [];
    var parser = null;
    var subs_passed_to_hash = [];
    var abs_start_value = 16513;
    var abs_end_value = 367992;
    
    var initial_prototype = {};
    
    describe('Subtitle.Parser.Base.hash function', {
        
        before_all: function() {
            initial_prototype = {
                addSub: MooPlay.Subtitle.Tree.prototype.addSub,
                initialize: MooPlay.Subtitle.Parser.Base.prototype.initialize
            };
        },
        
        after_all: function() {
            MooPlay.Subtitle.Tree.prototype.addSub = initial_prototype.addSub;
            MooPlay.Subtitle.Parser.Base.prototype.initialize = initial_prototype.initialize;
        },
        
        before_each: function() {
            
            subs = [
                new MooPlay.Subtitle.Item(1000, 6000, ["mldsfkgl=dfsjgklds"]),
                new MooPlay.Subtitle.Item(4000, 9000, ["dgdf gdf gdf gdf"])
            ];
            

            MooPlay.Subtitle.Parser.Base.prototype.initialize = $empty;
            MooPlay.Subtitle.Tree.prototype.addSub = function(sub) {
                subs_passed_to_hash.push(sub);
            }
            
            parser = new MooPlay.Subtitle.Parser.Base();

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
            var hash_root = parser.hash(subs);
            value_of(parser.hash_root.start).should_be(subs[0].start);
        },
        
        "should set the end of the hash root": function() { 
            var hash_root = parser.hash(subs);
            value_of(parser.hash_root.end).should_be(subs[1].end);
        },
        
        "should pass all the subs to the hash root": function() { 
            var hash_root = parser.hash(subs);
            value_of(subs_passed_to_hash).should_include(subs[0]);
            value_of(subs_passed_to_hash).should_include(subs[1]);
        }
        
        
    });
    
})();