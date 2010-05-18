MooPlay
=======


MooPlay gives some tools on top of an html5 video markup. You can build your own player with :

* a play / pause control
* buttons to move inside the video (rewind and fast forward)
* an interactive play progress slider
* a load progress bar
* subtitles loaded through an ajax request and synchronized with the video. Supported formats are SubRip (.srt) and SubViewer (.sub)
  
The video element methods can be called by other scripts, MooPlay objects will adapt themself to state changes.   

More functionnalities will be available.

![Screenshot](http://img441.imageshack.us/img441/1659/image4kp.png)


Demo
----

A demo page is available at [http://mooplay.challet.eu/](http://mooplay.challet.eu/) : not a pretty design, but all the features are viewable. You should use an html5 browser supporting ogg codecs.


How to use
----------

### MooPlay.Control.PlayPause
    
    <video id="video" src="myvideo.ogv"></video>
    <a href="#" id='playpause'>play / pause</a>

    new MooPlay.Control.PlayPause($('playpause'), $('video'), {
        paused_state_class: 'paused',
        over_state_class: 'over',
        click_state_class: 'clicked'
    })

When the *playpause* receive clicks, it will toggle the player state.
Then, it will have its css class changed, accordingly to the ones specified in the options

### MooPlay.Control.FastMove

    <video id="video" src="myvideo.ogv"></video>
    <a id="fastrewindbutton" href="#">fast rewind</a>
    <a id="fastforwardbutton" href="#">fast forward</a>
    
    new MooPlay.Control.FastMove($('fastforwardbutton'), $('video'), {speed_factor: 6});
    new MooPlay.Control.FastMove($('fastrewindbutton'), $('video'), {speed_factor: -4});
    
The *element* passed as the first element will control move inside the *video* element (second argument).
As option you can set the *speed_factor*, for example 6 to fast_forward, -4 to rewind

### MooPlay.Control.TimeDisplay

    <span id="current_time_container"></span>
    <span id="remaining_time_container"></span>
    new MooPlay.Control.TimeDisplay($('video'), $('current_time_container'), {pattern: '{h}:{m}:{s}', current: true});
    new MooPlay.Control.TimeDisplay($('video'), $('remaining_time_container'), {pattern: '{h}:{m}:{s}', current: false});

The *element* will display the current time or the remaining time of the video according to

* the value of the **current** option (default is true)
* the format specified by the **pattern** option (default is '{h}:{m}:{s},{ms}')

### MooPlay.Control.LoadProgress
    
    <video id="video" src="myvideo.ogv"></video>
    <div id="progress_container" style="width:400px;height:5px;background:#a0a0a0;">
    
    var progressbar = new ProgressBar({
        container: $('progress_container'),
        startPercentage: 0,
        step: 0,
    });
    new MooPlay.Control.LoadProgress(progressbar, $('video'));
    
The *progress_container* element will be filled function of the video file load state

### MooPlay.Control.PlayProgress

    <video id="video" src="myvideo.ogv"></video>
    <div id="slider" style="width:400px;height:5px;background:#a0a0a0;">
        <div id="knob" style="width:5px;height:5px;background:#ffff80;"></div>
    </div>
    
    var slider = new Slider($('slider'), $('knob'));
    new MooPlay.Control.PlayProgress(slider, $('video'));
    
The *knob* position will be set function of the video progress in the playing.
The *slider* element can be used to navigate through the video : by clicking anywhere on the bar, or dragging the knob.


### MooPlay.Subtitle
    
    <video id="video" src="myvideo.ogv"></video>
    <div id="subtitles_container"></div>
    
    var subs_player = new MooPlay.Subtitle.Player($('video'), $('subtitles_container'));
    var loader = new MooPlay.Subtitle.Loader( 'mysubtitles.srt', {
        onComplete: function(subs_hash) {
            subs_player.loadSubtitles(subs_hash);
        }
    });

    
The subtitles are loaded through **MooPlay.Subtitle.Parser.SubRip** performing an ajax request. They will be then displayed in the *subtitles_container* element and synchronized with the current position of the video.

**MooPlay.Subtitle.Player** can have an options hash as the third. Through it, you can specifiy your own *onDisplay* and *onDispose* callbacks functions. When called, the both of them will received 3 arguments :

* *the element to be displayed*
* *the container* as specified at initialization
* *the overlapping level* : in case several subtitles should be displayed at the same time, each one has a different level associated as integer, beggining to 0 and going up according to the displaying order through time.



Any feedback ? Ideas about a feature ?
--------------------------------------

Please [fill the issue form on GitHub](http://github.com/challet/MooPlay/issues) or [send me message](http://github.com/inbox/new/challet)


    
