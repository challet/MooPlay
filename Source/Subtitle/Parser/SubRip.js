/*
---
description: specific class for parsing subtitles file in SubRip format (.srt)

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- MooPlay.Utils
- MooPlay.Subtitle.Parser.Base
- MooPlay.Subtitle.Item

provides: 
- MooPlay.Subtitle.Parser.SubRip

...
*/


MooPlay.Subtitle.Parser.SubRip = new Class({

    Implements: MooPlay.Subtitle.Parser.Base,
    
    regexps: {
        new_sub: /^(\d+)$/,
        time: /^(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})$/,
        text: /^(.+)$/
    },
    
    options: {
        srt_end_of_line: '\n',
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
                current_sub.start = MooPlay.Utils.sexagesimalToTimestamp({ h: times[1].toInt(), m: times[2].toInt(), s: times[3].toInt(), ms: times[4].toInt() });
                current_sub.end = MooPlay.Utils.sexagesimalToTimestamp({ h: times[5].toInt(), m: times[6].toInt(), s: times[7].toInt(), ms: times[8].toInt() });
                var times = null;
            } else if(line != null && this.regexps.text.test(line)) {
                current_text.push(this.regexps.text.exec(line)[0]);
            } else if(current_sub != null) {
                subs.push(new MooPlay.Subtitle.Item(current_sub.start, current_sub.end, current_text));
                current_sub = null;
                current_text = null;
            }

        } while(line != null);

        return subs;

    },

});
