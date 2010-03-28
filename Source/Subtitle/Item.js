/*
---
description: object representation of a subtitle line

license: GNU GPL

authors:
- Clément Hallet

requires:
- Mooplay

provides: 
- Mooplay.Subtitle.Item

*/


Mooplay.Subtitle.Item = new Class({
    
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
