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

    }
}
