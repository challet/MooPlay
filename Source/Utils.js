Video.Utils = {
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
