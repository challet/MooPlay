Video.Subtitle.Parser.SubRip = new Class({

    Extends: Video.Subtitle.Parser.Base,
    
    regexps: {
        new_sub: /^(\d+)$/,
        time: /^(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})$/,
        text: /^(.+)$/
    },
    
    options: {
        srt_end_of_line: '\n',
        url: 'fun.srt',
        onComplete: $empty
    },

    parse: function(data) {
    
        var subs = [];
        var current_sub = null;
        var current_text = null;
        var index = null

        var lines = data.split(this.options.srt_end_of_line);
        // in case file doesn't end with an empty line
        lines.push('');

        do {

            var line = lines.shift();

            if(this.regexps.new_sub.test(line)) {
                current_text = [];
                current_sub = {};
            } else if(line != null && this.regexps.time.test(line)) {
                var times = this.regexps.time.exec(line);
                current_sub.start = Video.Utils.srtToTimestamp(times.slice(1,5));
                current_sub.end = Video.Utils.srtToTimestamp(times.slice(5,9));
                var times = null;
            } else if(line != null && this.regexps.text.test(line)) {
                current_text = new Element('p').appendText(this.regexps.text.exec(line)[1]);
            } else if(current_sub != null) {
                subs.push(new Video.Subtitle.Item(current_sub.start, current_sub.end, current_text));
                current_sub = null;
                current_text = null;
            }

        } while(line != null);

        return subs;

    },

});
