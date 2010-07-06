/*
---
description: some utility functions

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay

provides: 
- MooPlay.Utils

...
*/

MooPlay.Utils = {
    /**
     *  @param srt_time : format is '00:02:52,406'
     */
    sexagesimalToTimestamp: function(srt_time) {

        return ((srt_time.h * 60 + srt_time.m) * 60 + srt_time.s) * 1000 + srt_time.ms;

    },

    /**
     *  @return format is '00:02:52,406'
     */
    timestampToSexagesimal: function(timestamp) {

        var ms = timestamp.floor();
        var s = (ms / 1000).floor() ;
        var m = (s / 60).floor();
        var h = (m / 60).floor();

        return {
            h: h,
            m: m % 60,
            s: s % 60,
            ms: ms % 1000
        };

    },
    
    readable: function(srt_time) {
        
        srt_time.m = String(srt_time.m).pad(2,'0');
        srt_time.s = String(srt_time.s).pad(2,'0');
        srt_time.ms = String(srt_time.ms).pad(3,'0');
        
        return srt_time;
        
    }
    
    
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/string/pad [rev. #1]

String.prototype.pad = function(l, s, t){
    return s || (s = " "), (l -= this.length) > 0 ? (s = new Array(Math.ceil(l / s.length)
        + 1).join(s)).substr(0, t = !t ? l : t == 1 ? 0 : Math.ceil(l / 2))
        + this + s.substr(0, l - t) : this;
};