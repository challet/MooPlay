/*
---
description: display position in the video, in human readable time

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- MooPlay.Utils


provides: 
- MooPlay.Display.Time

...
*/

MooPlay.Display.Time = new Class({
    
    Implements: [Options],
    
    options: {
        pattern: '{h}:{m}:{s},{ms}',
        actual: true // vs 'remaining'
    },
    
    initialize: function(video, container, options) {
        
        this.setOptions(options);
        
        this.container = $(container);
        this.video = $(video);
        
        this.video.addEvent('timeupdate', function(event) {
            if(this.options.actual) {
                this.tick(event.target.currentTime * 1000);
            } else {
                this.tick(Math.max(0, event.target.duration - event.target.currentTime) * 1000);
            }
        }.bind(this));
        
    },
    
    tick: function(abs_movie_time) {
        this.container.empty().appendText(
            this.options.pattern.substitute(
                MooPlay.Utils.timestampToSexagesimal(abs_movie_time)
            )
        );
    }

});
