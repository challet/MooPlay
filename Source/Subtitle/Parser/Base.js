/*
---
description: base class for ajax-loading and parsing subtitles file

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- MooPlay.Subtitle.Item
- MooPlay.Subtitle.Tree

provides: 
- MooPlay.Subtitle.Parser.Base

...
*/

MooPlay.Subtitle.Parser.Base = new Class({
    
    Implements: [Options],
    
    options: {
        onComplete: $empty
    },
    
    initialize: function(data, options) {
        this.setOptions(options);
        this.hash(
            this.parse(data)
        );
        
        this.options.onComplete(this.hash_root);
        
    },
    
    hash: function(subs) {
        
        var abs_start = Infinity;
        var abs_end = 0;
        subs.each(function(sub) {
            abs_start = Math.min(abs_start, sub.start);
            abs_end = Math.max(abs_end, sub.end);
        });
        
        this.hash_root = new MooPlay.Subtitle.Tree(abs_start, abs_end);

        subs.each(function(sub) {
            this.hash_root.addSub(sub);
        }.bind(this));
        
    }

});
