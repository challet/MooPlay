MooPlay
=======


MooPlay give some tools in top of a video html markup. With it you can have :

* a play / pause control
* a progress bar
* subtitles synchronized with the video
 
The video element can be used by other scripts, MooPlay will adapt to state changes.
 
More functionnalities will be available.

![Screenshot](http://url_to_project_screenshot)

How to use
----------

### MooPlay.Control.PlayPause
    
    <a href="#" id='playpause'>play / pause</a>
    <video id="video" src="http://myvideo.ogv"></video>

    new Video.Control.PlayPause($('playpause'), $('video'), {
        paused_state_class: 'paused',
        over_state_class: 'over',
        click_state_class: 'clicked'
    })

When the 'playpause' receive clicks, it will toggle the player state.
Then, it will have its css class changed, accordingly to the ones specified in the options


### MooPlay.Control.Progress

### MooPlay.Subtitle


