Mooplay.Display.Ratio = new Class({
    
    initialize: function(video, container) {
        
        this.container = $(container);
        this.video = $(video);                
        
        this.video.addEvent('timeupdate', function(event) {
            this.tick(event.target.currentTime * 1000, event.target.duration * 1000);
        }.bind(this));
    },
    
    tick: function(currentTime, duration) {
        this.container.empty().appendText(String(100 * currentTime / duration));
    }

});
