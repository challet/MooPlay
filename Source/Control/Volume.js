MooPlay.Control.Volume = new Class({

    Implements: [Options],
        
    initialize: function(slider, video, options) {
        
        this.setOptions(options);
        
        this.slider = slider;
        this.video = $(video);

        this.video.addEvents({
            'volumechange': this.update.bind(this)
        });

        this.slider.addEvent('change', this.change.bind(this));

    },

    update: function(event) {
        var volume = event.target.muted ? 0 : event.target.volume;
        position = this.slider.toPosition( volume * this.slider.range );
        this.slider.knob.setStyle(this.slider.property, position);
    },

    change: function(pos) {
        this.video.volume = pos / this.slider.steps;
    }

});
