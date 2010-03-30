MooPlay
=======


MooPlay give some tools on top of a video html markup. You can have :

* a play / pause control
* a play progress bar
* subtitles synchronized with the video
 
The video element can be used by other scripts, MooPlay objects will adapt themself to state changes.

All elements are css customizable. Actually, none great css has already been wrote for it. Then, you're welcome to make your own :) 

More functionnalities will be available.

![Screenshot](http://img94.imageshack.us/img94/47/image3gd.png)

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
    
The subtitles loaded through **MooPlay.Subtitle.Parser.SubRip** will be displayed in the *subtitles_container* element and synchronized with the current position of the video.

**MooPlay.Subtitle.Player** can have a third argument which is the hash options. You could specifiy your own *onDisplay* and *onDispose* callbacks functions. The both of them will received 3 arguments :

* *the element to be displayed*
* *the container* as specified at initialization
* *the overlapping level* : in case several subtitles should be displayed at the same time, each one as a different level associated as integer. Most part of the time, the value will be *0*
    
