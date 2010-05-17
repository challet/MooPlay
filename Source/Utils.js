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
    srtToTimestamp: function(srt_time) {

        return ((srt_time[0].toInt() * 60 + srt_time[1].toInt()) * 60 + srt_time[2].toInt()) * 1000 + srt_time[3].toInt();

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
