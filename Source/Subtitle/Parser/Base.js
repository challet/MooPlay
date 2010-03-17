Video.Subtitle.Parser.Base = new Class({
    
    Implements: [Options],
    
    initialize: function(options) {
        this.setOptions(options);
        this.load();            
    },

    load: function() {

        var request = new Request({
            url: this.options.url,
            method: 'get',
            onSuccess: this.run.bind(this)
        });
        request.send({});
    },
    
    run: function (data) {
        var subs = this.parse(data);

        var abs_start = Infinity;
        var abs_end = 0;
        subs.each(function(sub) {
            abs_start = Math.min(abs_start, sub.start);
            abs_end = Math.max(abs_end, sub.end);
        });
        this.hash_root = this.hash(abs_start, abs_end, subs);
        this.options.onComplete(this.hash_root);
        
    },
    
    hash: function(abs_start, abs_end, subs) {
        
        var hash_root = new Video.Subtitle.Tree(abs_start, abs_end);

        subs.each(function(sub) {
            hash_root.addSub(sub);
        });
        
        return hash_root;
    }

});
