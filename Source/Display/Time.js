/*
---
description: display position in the video, in human readable time

license: GNU GPL

authors:
- Clément Hallet

requires:
- Mooplay
- Mooplay.Utils


provides: 
- Mooplay.Display.Time

*/

Mooplay.Display.Time = new Class({
    
    initialize: function(video, container) {
        
        this.container = $(container);
        this.video = $(video);
        
        this.video.addEvent('timeupdate', function(event) {
            this.tick(event.target.currentTime * 1000);
        }.bind(this));
        
    },
    
    tick: function(abs_movie_time) {
        this.container.empty().appendText(Mooplay.Utils.timestampToSrt(abs_movie_time));
    }

});
