(function() {
    
    var subs_root = null;
    var subs = [];
    var parser = null;
    var on_complete_called = false;
    var hash_called = false;
    var hash_start_arg_value = null;
    var hash_end_arg_value = null;
    var hash_subs_arg_value = null;
    var hash_return_mock_value = "s3f65à)sdf2";
    
    describe('Subtitle.Parser.Base.run function', {

        before_each: function() {
            
            subs = [
                new Mooplay.Subtitle.Item(1000, 6000, ["dsmlkgsmdlkfgmlsdf"]),
                new Mooplay.Subtitle.Item(4000, 9000, ["25sdf4ds2sd2f14ds2f"])
            ];
            
            // to avoid any ajax call
            Mooplay.Subtitle.Parser.Base.prototype.load = function() {
                return;
            }
            
            parser = new Mooplay.Subtitle.Parser.Base({
                onComplete: function() {
                    on_complete_called = true;
                }
            });
            
            parser.hash = function(abs_start, abs_end, subs) {
                hash_called = true;
                hash_start_arg_value = abs_start
                hash_end_arg_value = abs_end;
                hash_subs_arg_value = subs;
                return hash_return_mock_value;
            };
            
        },
        
        after_each: function() {
            
            subs_root = null;
            subs = [];
            parser = null;
            on_complete_called = false;
            hash_called = false;
            hash_start_arg_value = null;
            hash_end_arg_value = null;
            hash_subs_arg_value = null;
            hash_return_mock_value = "s3f65à)sdf2";
            
        },  
        
        
        "should call the hash method": function() { 
            parser.run(subs);
            value_of(hash_called).should_be_true();
        },
        
        "should pass the absolute start value to hash method": function() { 
            parser.run(subs);
            value_of(hash_start_arg_value).should_be(1000);
        },
        
        "should pass the absolute end value to hash method": function() { 
            parser.run(subs);
            value_of(hash_end_arg_value).should_be(9000);
        },
        
        "should pass the subs to hash method": function() { 
            parser.run(subs);
            value_of(hash_subs_arg_value).should_include(subs[0]);
            value_of(hash_subs_arg_value).should_include(subs[1]);
        },
        
        "should set the hash method return as the hash_root": function() { 
            parser.run(subs);
            value_of(parser.hash_root).should_be(hash_return_mock_value);
        },

        "should call the options.onComplete method": function() {
            parser.run(subs);
            value_of(on_complete_called).should_be_true();            
        }
        
    });
    
})();