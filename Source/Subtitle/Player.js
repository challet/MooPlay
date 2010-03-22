Video.Subtitle.Player = new Class({

    Implements: [Options],

    options: {
        container: 'subtitle',
        time_container: 'time',
        tick_delay: 100,
        onDispose: function(element, container) {
            element.dispose();
        },
        onDisplay: function(element,container) {
            element.inject(container, 'bottom');
        }
    },

    initialize: function(subs_hash, video, options) {

        this.setOptions(options);
        
        this.video = $(video);
        this.container = $(this.options.container);

        this.subs_hash = subs_hash;
        
        this.overlapping_level = 0;
        this.displayed = [];

        this.video.addEvent('timeupdate', function(event) {
            this.tick(event.target.currentTime * 1000);
        }.bind(this));
    
    },
  
        
    tick: function(abs_movie_time) {

        var next_displayed = this.subs_hash.getSubs(abs_movie_time);
        
        // remove subs which are not here anymore
        this.displayed.each(function(sub) {
            var displayed = [];
            if(!next_displayed.contains(sub)) {
                sub.element.removeClass('overlapping' + String(--this.overlapping_level));
                this.options.onDispose(sub.element, this.container);
            } else {
                displayed.push(sub);
            }
            this.displayed = displayed;
        }.bind(this));
        
        // display subs which should to
        next_displayed.each(function(sub) {
            this.video.pause();
            if(!this.displayed.contains(sub)) {
                sub.element.addClass('overlapping' + String(this.overlapping_level++));
                this.displayed.push(sub);
                this.options.onDisplay(sub.element, this.container);
            }
        }.bind(this));

    }

});
