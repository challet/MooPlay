MooPlay
=======


MooPlay give some tools on top of an html5 video markup. You can build your own player with :

* a play / pause control
* a play progress bar
* subtitles loaded through an ajax request and synchronized with the video ( only .srt format support for now )
 
The video element methods can be called by other scripts, MooPlay objects will adapt themself to state changes.   

More functionnalities will be available.

![Screenshot](http://img441.imageshack.us/img441/1659/image4kp.png)

How to use
----------

### MooPlay.Control.PlayPause
    
    <video id="video" src="http://myvideo.ogv"></video>
    <a href="#" id='playpause'>play / pause</a>

    new MooPlay.Control.PlayPause($('playpause'), $('video'), {
        paused_state_class: 'paused',
        over_state_class: 'over',
        click_state_class: 'clicked'
    })

When the *playpause* receive clicks, it will toggle the player state.
Then, it will have its css class changed, accordingly to the ones specified in the options


### MooPlay.Control.PlayProgress

    <video id="video" src="http://myvideo.ogv"></video>
    <div id="slider" style="width:400px;height:5px;background:#a0a0a0;">
        <div id="knob" style="width:5px;height:5px;background:#ffff80;"></div>
    </div>
    
    var slider = new Slider($('slider'), $('knob'));
    new MooPlay.Control.PlayProgress(slider, $('video'));
    
The *knob* position will be set function of the video progress in the playing.
The *slider* element can be clicked to navigate through the video.


### MooPlay.Subtitle

    var subs_reader = new MooPlay.Subtitle.Player($('video'), $('subtitles_container'));
    new MooPlay.Subtitle.Parser.SubRip({
        url: 'http://mysubtitles.srt',
        onComplete: function(subs_hash) {
            subs_reader.loadSubtitles(subs_hash);
        }
    });
    
The subtitles are loaded through **MooPlay.Subtitle.Parser.SubRip** performing an ajax request. They will be then displayed in the *subtitles_container* element and synchronized with the current position of the video.

**MooPlay.Subtitle.Player** can have an options hash as the third. Through it, you can specifiy your own *onDisplay* and *onDispose* callbacks functions. When called, the both of them will received 3 arguments :

* *the element to be displayed*
* *the container* as specified at initialization
* *the overlapping level* : in case several subtitles should be displayed at the same time, each one has a different level associated as integer, beggining to 0.
    
