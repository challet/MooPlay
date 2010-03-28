MooPlay
=======


MooPlay give some tools in top of a video html markup. With it you can have :
 * a play / pause control *
 * a progress bar *
 * synchronized with the video subtitles *
 
The video element can be used by other scripts, MooPlay will adapt to state changes.
 
More functionnalities will be available.

![Screenshot](http://url_to_project_screenshot)

How to use
----------

### MooPlay.Control.PlayPause

    new Video.Control.PlayPause($('element'), $('video'), {
        paused_state_class: 'paused',
        over_state_class: 'over',
        click_state_class: 'clicked'
    })
    
* element * is the one controlling-by-blick play / pause actions, it can be an anchor element :
    
    <a href="#" id='element'>play / pause</a>
    
* video * is the video element

When the player state change, your element will have its css class changed, accordingly to the ones specified in the options

### MooPlay.Control.Progress

### MooPlay.Subtitle


