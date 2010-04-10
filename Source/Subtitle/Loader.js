/*
---
description: ajax-loading subtitles and routing to the right parser

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- MooPlay.Subtitle.Item
- MooPlay.Subtitle.Tree

provides: 
- MooPlay.Subtitle.Loader

...
*/

MooPlay.Subtitle.Loader = new Class({
    
    Implements: [Options],
    
    initialize: function(url, options) {
        this.url = url;
        this.setOptions(options);
        this.load();            
    },

    load: function() {

        var request = new Request({
            url: this.url,
            method: 'get',
            onSuccess: this.run.bind(this)
        });
        request.send({});
    },
    
    run: function (data) {
        
        var ext = this.url.split('.').pop();
        switch(ext) {
            case 'srt':
                var parser = new MooPlay.Subtitle.Parser.SubRip(data, {onComplete: this.options.onComplete});
            break;
            case 'sub':
                var parser = new MooPlay.Subtitle.Parser.SubViewer(data, {onComplete: this.options.onComplete});
            break;
        }
        
    }
});
