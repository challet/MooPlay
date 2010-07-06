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
- MooPlay.Control.TimeDisplay

...
*/

MooPlay.Control.TimeDisplay = new Class({
    
    Implements: [Options],
    
    options: {
        pattern: '{h}:{m}:{s},{ms}',
        current: true // vs 'remaining'
    },
    
    initialize: function(video, container, options) {
        
        this.setOptions(options);
        
        this.container = $(container);
        this.video = $(video);
        
        this.video.addEvent('timeupdate', function(event) {
            if(this.options.current) {
                this.update(event.target.currentTime * 1000);
            } else {
                this.update(Math.max(0, event.target.duration - event.target.currentTime) * 1000);
            }
        }.bind(this));
        
    },
    
    update: function(abs_movie_time) {
        
        var time = MooPlay.Utils.readable(MooPlay.Utils.timestampToSexagesimal(abs_movie_time));
        
        this.container.empty().appendText(
            this.options.pattern.substitute(
                time
            )
        );
    }

});
