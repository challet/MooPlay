Video.Subtitle.Item = new Class({
    
    initialize: function(start, end, text) {
        
        this.start = start;
        this.end = end;
        this.element = new Element('p').appendText(text);
        
    },
    
});
