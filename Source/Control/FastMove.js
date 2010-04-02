

MooPlay.Control.FastMove = new Class({
    

    Implements: MooPlay.Control.BaseButton,
    
    options: {
        speed_factor: 1
    },
    
    specificInitialize: function() {
        
        this.element.addEvents({
            'mousedown': this.beginMove.bind(this),
            'mouseup': this.stopMove.bind(this),
            'mouseleave': this.stopMove.bind(this)
        });
        
    },
    
    beginMove: function() {
        if(this.timer == null) {
            this.start_time = $time();
            this.start_pos = this.video.currentTime;
            this.timer = this.tick.bind(this).periodical(50);
        }
    },
    
    stopMove: function() {
        if(this.timer != null) {
            this.start_time = null;
            $clear(this.timer);
            this.timer = null;
        }
    },
    
    tick: function() {
        
        if(this.start_time == null) {
            return;
        }
        
        var time_to_move = ($time() - this.start_time) * this.options.speed_factor;
        
        this.video.currentTime = this.start_pos + (time_to_move / 1000);
        
    }

});
