MooPlay
=======


MooPlay gives some tools on top of an html5 video markup. You can build your own player with :

* a play / pause control
* buttons to move inside the video (rewind and fast forward)
* an interactive play progress slider
* a load progress bar
* a volume slider and a mute button
* subtitles loaded through an ajax request and synchronized with the video. Supported formats are SubRip (.srt) and SubViewer (.sub)
* displays current or remaining time
  
The video element methods can be called by other scripts, MooPlay objects will adapt themself to any state changes.

More functionnalities will be available.

![Screenshot](http://img441.imageshack.us/img441/2513/image4vc.png)


### Demo

A demo page is available at [http://mooplay.challet.eu/](http://mooplay.challet.eu/) : not a pretty design, but all the features are viewable. You should use an html5 browser supporting ogg codecs.

### Unit Tests

About [a hundred tests are running](http://mooplay.challet.eu/Specs/?specs=master) on each new step, to make sure all the functionnalities are still available.

### Any feedback or ideas about a feature ?

Please [fill the issue form on GitHub](http://github.com/challet/MooPlay/issues) or [send me message](http://github.com/inbox/new/challet)


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

When the *playpause* element receive clicks, the playing stat is toggled.
It's css classes match the current state of the *video* element, accordingly to the *options*.

### MooPlay.Control.FastMove

    <video id="video" src="myvideo.ogv"></video>
    <a id="fastrewindbutton" href="#">fast rewind</a>
    <a id="fastforwardbutton" href="#">fast forward</a>
    
    new MooPlay.Control.FastMove($('fastforwardbutton'), $('video'), {speed_factor: 6});
    new MooPlay.Control.FastMove($('fastrewindbutton'), $('video'), {speed_factor: -4});
    
The *element* passed as the first argument is a control to move in the *video* element (second argument) when it's clicked.
*speed_factor* is passed as an option to specify the behavior, for example 6 would fast forward while -4 would rewind.

### MooPlay.Control.TimeDisplay

    <span id="current_time_container"></span>
    <span id="remaining_time_container"></span>
    
    new MooPlay.Control.TimeDisplay($('video'), $('current_time_container'), {pattern: '{h}:{m}:{s}', current: true});
    new MooPlay.Control.TimeDisplay($('video'), $('remaining_time_container'), {pattern: '{h}:{m}:{s}', current: false});

The *element* will display the current time or the remaining time of the *video* according to :

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
    new MooPlay.Control.LoadProgress($('video'), progressbar);
    
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

### MooPlay.Control.Mute

    <video id="video" src="myvideo.ogv"></video>
    <a id="mute" href="#">mute</a>
    
    new MooPlay.Control.Mute($('mute'), $('video'));
    
The *mute* element will toggle the mute state of the *video* throucg user clicks.


### MooPlay.Control.Volume

    <video id="video" src="myvideo.ogv"></video>
    <div id="slider_volume" style="width:100px;height:5px;background:#a0a0a0;">
        <div id="knob_volume" style="width:5px;height:5px;background:#ff4040;"></div>
    </div>
    
    var slider_volume = new Slider($('slider_volume'), $('knob_volume'), {steps: 100});
    new MooPlay.Control.Volume(slider_volume, $('video'));
    
The user can set the volume of the *video* through the *slider*.


### MooPlay.Control.TimeDisplay

    <span id="current_time_container">00:00:00</span>
    <span id="remaining_time_container">00:00:00</span>
    
    new MooPlay.Control.TimeDisplay($('video'), $('current_time_container'), {pattern: '{h}:{m}:{s}', current: true});
    new MooPlay.Control.TimeDisplay($('video'), $('remaining_time_container'), {pattern: '{h}:{m}:{s}', current: false});
    
The *container* element will display the current time of the *video*, or it's remaining time (depending of the *current* option).
The displaying format can be setted through the *pattern* option. See the [Mootools String.substitute method](http://mootools.net/docs/core/Native/String#String:substitute) about how it works.

### MooPlay.Subtitle
    
    <video id="video" src="myvideo.ogv"></video>
    <div id="subtitles_container"></div>
    
    var subs_player = new MooPlay.Subtitle.Player($('video'), $('subtitles_container'));
    var loader = new MooPlay.Subtitle.Loader( 'mysubtitles.srt', {
        onComplete: function(subs_hash) {
            subs_player.loadSubtitles(subs_hash);
        }
    });

    
The subtitles are loaded through **MooPlay.Subtitle.Loader** performing an ajax request. They will be then displayed in the *subtitles_container* element and synchronized with the current position of the *video* element.

**MooPlay.Subtitle.Player** can have an options hash as the third. Through it, you can specifiy your own *onDisplay* and *onDispose* callbacks functions. When called, the both of them will received 3 arguments :

* *the element to be displayed*
* *the container* as specified at initialization
* *the overlapping level* : in case several subtitles should be displayed at the same time, each one has a different level associated as integer, beggining to 0 and going up according to the displaying order through time.

