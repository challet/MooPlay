var Srt = {
    
    Reader: new Class({
        Implements: [Options],
    
        options : {
            refresh_delay: 50,
            container: 'subtitle',
            time_container: 'time'
        },
    
        initialize: function(subs, options) {
        
            this.setOptions(options);
    
            this.container = $(this.options.container);
        
            this.timer = null;
            this.start_time = null;
            this.pause_time = null;
        
            this.current_index = 1;
        
            this.subs = subs;
            
            
        },
    
        start: function() {
            if(this.start_time == null) {
                this.start_time = $time();
            } else if(this.pause_time != null) {
                this.start_time += ($times() - this.pause_time);
                this.pause_time = null;
            } else {
                return false;
            }
        
            this.displayed = new Array();
            this.tick();
            return true;
        },
    
        pause: function() {
        
            if(this.pause_time == null) {
                $clear(this.timer);
                this.pause_time = $time();
                return true;
            } else {
                return false;
            }
        
        },
    
        tick: function() {
            var abs_movie_time = $time() - this.start_time;
        
            // for debug
            $(this.options.time_container).empty().appendText(Srt.Utils.timestampToSrt(abs_movie_time));
                
            this.checkDisplayed(abs_movie_time);
            this.checkNext(abs_movie_time);

            this.timer = this.tick.bind(this).delay(this.options.refresh_delay);
        },
    
    
        checkDisplayed: function(abs_movie_time) {
        
            var displayed_yet = new Array();
        
            this.displayed.each(function(sub) {
                if(sub.end < abs_movie_time) {
                    sub.text.dispose();
                } else {
                    displayed_yet.push(sub);
                }
            });
        
            this.displayed = displayed_yet;
        
        },
    
        checkNext: function(abs_movie_time) {
        
            if(this.subs[this.current_index] != undefined && this.subs[this.current_index].start < abs_movie_time) {
            
                this.subs[this.current_index].text.addClass('overlapping' + String(this.displayed.length));
            
                this.subs[this.current_index].text.inject(this.container, 'bottom');
                this.displayed.push(this.subs[this.current_index]);
                this.current_index++;
            }
        
        },
    
    
        /**
         *  @param time : format is '00:02:52,406'
         */
        timerUpdate: function(time) {
            // format is 
        },

        
    
    }),
    
    Parser: new Class({
        
        Implements: [Options],
        
        options: {
            srt_end_of_line: '\n',
            url: 'fun.srt',
            onComplete: $empty
        },
        
        regexps: {
            new_sub: /^(\d+)$/,
            time: /^(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})$/,
            text: /^(.+)$/
        },
        
        initialize: function(options) {
            this.setOptions(options);
            this.load();            
        },
        
        
        load: function() {

            var request = new Request({
                url: this.options.url,
                method: 'get',
                onSuccess: this.run.bind(this)
            });
            request.send({});
        },
        
        

        
        run: function(data) {

            this.subs = new Array();
            var current_sub = null;
            var current_text = null;
            var index = null

            var lines = data.split(this.options.srt_end_of_line);
            // in case file doesn't end with a nempty line
            lines.push('');

            do {

                var line = lines.shift();

                if(this.regexps.new_sub.test(line)) {
                    index = this.regexps.new_sub.exec(line)[1].toInt();
                    current_text = new Array();
                    current_sub = {};
                } else if(line != null && this.regexps.time.test(line)) {
                    var times = this.regexps.time.exec(line);
                    current_sub.start = Srt.Utils.srtToTimestamp(times.slice(1,5));
                    current_sub.end = Srt.Utils.srtToTimestamp(times.slice(5,9));
                    var times = null;
                } else if(line != null && this.regexps.text.test(line)) {
                    current_text.push(new Element('p').appendText(this.regexps.text.exec(line)[1]));
                } else if(current_sub != null) {
                    current_sub.text = new Element('div').adopt(current_text);
                    this.subs[index] = current_sub;
                    current_sub = null;
                    current_text = null;
                    index = null;
                }

            } while(line != null);
            
            this.complete();
        
        },
        
        complete: function() {
            this.options.onComplete(this.subs);
        }
        
    }),
    
    Utils: {
        /**
         *  @param srt_time : format is '00:02:52,406'
         */
        srtToTimestamp: function(srt_time) {
        
            return ((srt_time[0].toInt() * 60 + srt_time[1].toInt()) * 60 + srt_time[2].toInt()) * 1000 + srt_time[3].toInt();
        
        },
    
        /**
         *  @return format is '00:02:52,406'
         */
        timestampToSrt: function(timestamp) {

            var ms = timestamp;
            var s = (ms / 1000).floor() ;
            var m = (s / 60).floor();
            var h = (m / 60).floor();
        
            return  String(h) + ':' + String(m % 60) + ':' + String(s % 60) + ',' + String(ms % 1000);
        
        }
    }
    
}