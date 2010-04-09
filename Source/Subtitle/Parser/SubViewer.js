/*
---
description: specific class for parsing subtitles file in SubViewer format (.sub)

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- MooPlay.Utils
- MooPlay.Subtitle.Parser.Base
- MooPlay.Subtitle.Item

provides: 
- MooPlay.Subtitle.Parser.SubViewer

...
*/


MooPlay.Subtitle.Parser.SubViewer = new Class({

    Implements: MooPlay.Subtitle.Parser.Base,
    
    regexps: {
        time: /^(\d{2}):(\d{2}):(\d{2}).(\d{3}),(\d{2}):(\d{2}):(\d{2}).(\d{3})$/,
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

            if(line != null && this.regexps.time.test(line)) {
                current_text = [];
                current_sub = {};
                var times = this.regexps.time.exec(line);
                current_sub.start = MooPlay.Utils.srtToTimestamp(times.slice(1,5));
                current_sub.end = MooPlay.Utils.srtToTimestamp(times.slice(5,9));
                var times = null;
            } else if(line != null && this.regexps.text.test(line)) {
                current_text = this.regexps.text.exec(line)[0].split('[BR]');
            } else if(current_sub != null) {
                subs.push(new MooPlay.Subtitle.Item(current_sub.start, current_sub.end, current_text));
                current_sub = null;
                current_text = null;
            }

        } while(line != null);

        return subs;

    },

});
