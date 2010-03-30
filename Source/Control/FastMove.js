

MooPlay.Control.FastMove = new Class({
    

    Implements: [MooPlay.Control.ButtonBase],
    
    options: {
        speed_factor: 1
    },
    
    specificInitialize: function() {
        this.element.addEvents({
            
            'mousedown': function() {
                this.beginMove(false);
            }.bind(this),
        
            'mouseup': function() {
                this.stopMove(true);
            }.bind(this),
            
            'mouseleave': function() {
                this.stopMove(true);
            }.bind(this)
            
        });
    },
    
    beginMove: function(down) {
        if(this.timer == null) {
            this.video.pause();
            this.start_time = $time();
            this.timer = this.tick.bind(this).periodical(10);
        }
    },
    
    stopMove: function() {
        if(this.timer != null) {
            this.start_time = null;
            $clear(this.timer);
            this.timer = null;
            this.video.play();
        }
    },
    
    tick: function() {
        if(this.start_time == null) {
            return;
        }
        
        var time_for_moving = ($time() - this.start_time) * this.options.speed_factor;
        
        this.video.currentTime = this.video.currentTime + (time_for_moving / 1000);
        
    }

});
