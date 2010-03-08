var Video = {

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
    },
    
    SubTitle : {
        Player: new Class({
        
            Implements: [Options],
        
            options: {
                container: 'subtitle',
                time_container: 'time',
                tick_delay: 100
            },
        
            initialize: function(subs, video, options) {
        
                this.setOptions(options);
                
                this.video = video;
                this.container = $(this.options.container);
        
                this.timer = null;
                this.start_time = null;
                this.pause_time = null;
        
                this.current_index = 1;
        
                this.subs = subs;
            
                this.displayed = new Array();
                
                
                (function() {
                    this.tick(this.video.currentTime * 1000);
                }).bind(this).periodical(this.options.tick_delay);
                
            
            },        
        
            tick: function(abs_movie_time) {

                // for debug
                if($(this.options.abs_movie_time))
                    $(this.options.time_container).empty().appendText(Video.Utils.timestampToSrt(abs_movie_time));

                this.checkDisplayed(abs_movie_time);
                this.checkNext(abs_movie_time);

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

            }


        }),
    
        Parser: {
            SubRip: new Class({
            
            
                regexps: {
                    new_sub: /^(\d+)$/,
                    time: /^(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})$/,
                    text: /^(.+)$/
                },
            
                Implements: [Options],

                options: {
                    srt_end_of_line: '\n',
                    url: 'fun.srt',
                    onComplete: $empty
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
            
                complete: function() {
                    this.options.onComplete(this.subs);
                },
            
                run: function(data) {
                
                    this.subs = new Array();
                    var current_sub = null;
                    var current_text = null;
                    var index = null

                    var lines = data.split(this.options.srt_end_of_line);
                    // in case file doesn't end with an empty line
                    lines.push('');

                    do {

                        var line = lines.shift();

                        if(this.regexps.new_sub.test(line)) {
                            index = this.regexps.new_sub.exec(line)[1].toInt();
                            current_text = new Array();
                            current_sub = {};
                        } else if(line != null && this.regexps.time.test(line)) {
                            var times = this.regexps.time.exec(line);
                            current_sub.start = Video.Utils.srtToTimestamp(times.slice(1,5));
                            current_sub.end = Video.Utils.srtToTimestamp(times.slice(5,9));
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
            
            })
        
        }
        
    }
    
    
};