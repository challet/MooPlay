/*
---
description: object representation of a subtitle line

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay

provides: 
- MooPlay.Subtitle.Item

...
*/


MooPlay.Subtitle.Item = new Class({
    
    initialize: function(start, end, texts) {
        
        this.start = start;
        this.end = end;
        this.element = new Element('div');
        texts.each(function(text) {
            this.element.grab(
                new Element('p').appendText(text)
            );
        }.bind(this));
        
    },
    
});
