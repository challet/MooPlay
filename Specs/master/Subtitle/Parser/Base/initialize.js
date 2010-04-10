(function() {
    
    
    
    
    var initial_prototype = {};
    
    var raw_data = "jlfd5dfs25dfs2524dsf21ds";
    var parse_result = "3524sdf4sd25fds23fds2";
    
    var parse_called = false;
    var parse_arg_value = null;
    var hash_called = false;
    var hash_arg_value = null;
    
    describe('Subtitle.Parser.Base.initialize function', {
        
        before_all: function() {
            initial_prototype = {
                hash: MooPlay.Subtitle.Parser.Base.prototype.hash,
                parse: MooPlay.Subtitle.Parser.Base.prototype.parse,
            };
        },
        
        after_all: function() {
            MooPlay.Subtitle.Parser.Base.prototype.hash = initial_prototype.hash;
            MooPlay.Subtitle.Parser.Base.prototype.parse = initial_prototype.parse;
        },
        
        before_each: function() {
            MooPlay.Subtitle.Parser.Base.prototype.parse = function(data) {
                parse_called = true;
                parse_arg_value = data;
                
                return parse_result;
            };
            MooPlay.Subtitle.Parser.Base.prototype.hash = function(subs) {
                hash_called = true;
                hash_arg_value = subs;
            };
           
        },
        
        after_each: function() {
            
            raw_data = "jlfd5dfs25dfs2524dsf21ds";
            parse_result = "3524sdf4sd25fds23fds2";
            
            parse_called = false;
            parse_arg_value = null;
            hash_called = false;
            hash_arg_value = null;
            
        },  
        
        "should call the parse function and ": function() {
            new MooPlay.Subtitle.Parser.Base(raw_data);
            value_of(parse_called).should_be_true();
            value_of(parse_arg_value).should_be(raw_data);
        },
        
        "should pass raw_data to the parse function": function() {
            new MooPlay.Subtitle.Parser.Base(raw_data);
            value_of(parse_arg_value).should_be(raw_data);
        },
        
        "should call the hash function and ": function() { 
            new MooPlay.Subtitle.Parser.Base(raw_data);
            value_of(hash_called).should_be_true();
            value_of(hash_arg_value).should_be(parse_result);
        },
        
        "should transmit the return of parse function to the hash function": function() { 
            new MooPlay.Subtitle.Parser.Base(raw_data);
            value_of(hash_arg_value).should_be(parse_result);
        }
        
        
    });
    
})();