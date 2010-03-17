Video.Control.Progress = new Class({

    Implements: [Options],
        
    initialize: function(slider, video, options) {
        
        this.setOptions(options);
        
        this.slider = slider;
        this.video = $(video);
        
        this.video.addEvent('timeupdate', function(event) {
            this.tick(event.target.currentTime * 1000, event.target.duration * 1000);
        }.bind(this));
        
        this.slider.element.addEvent('click', function(event) {
            this.change(event);
        }.bind(this));
        
    },
    
    tick: function(currentTime, duration) {
        this.slider.set(this.slider.steps * currentTime / duration);
    },

    change: function(event) {
        
        if(this.slider.axis == 'x') {
            var ratio =  (event.client.x - event.target.offsetLeft) / event.target.offsetWidth ;
        } else if(this.slider.axis == 'y') {
            var ratio =  (event.client.y - event.target.offsetTop) / event.target.offsetHeight ;
        } else {
            return;
        }
        
        this.video.currentTime = ratio * this.video.duration;
    }

});
