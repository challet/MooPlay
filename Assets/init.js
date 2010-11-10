document.addEvent('domready', function() {
    
    // init the play / pause button
    new MooPlay.Control.PlayPause($('video'), $('playpause'));

    // init the time containers (current and remaining)
    new MooPlay.Control.TimeDisplay($('video'), $('current_time_container'), {pattern: '{h}:{m}:{s}', current: true});
    new MooPlay.Control.TimeDisplay($('video'), $('remaining_time_container'), {pattern: '{h}:{m}:{s}', current: false});

    // use a mootools slider to manage the volume
    var slider_volume = new Slider($('slider_volume'), $('knob_volume'), {steps: 100});
    var volume_ctrl = new MooPlay.Control.Volume($('video'), slider_volume);
    $('video').addEvent('volumechange', function(event) {
        var volume = event.target.muted ? 0 : event.target.volume;
        $('full_volume').setStyle('width', String(volume * 100) + '%');
    });
    new MooPlay.Control.Mute($('video'), $('mute'));
    
    // use a Mootools slider to manage the play progress status
    var slider_progress = new Slider($('play_slider'), $('knob_slider'), {steps: 400});
    new MooPlay.Control.PlayProgress($('video'), slider_progress);
    
    var time_tooltip = new MooPlay.Control.TimeDisplay($('video'), $('time_tooltip'), { pattern: '{h}:{m}', auto_update: false});
    
    new MooPlay.Control.FullScreen($('player'), $('fullscreen'));
    
    $('play_slider').addEvents({
        'mousemove':  function(event) {
            // make tooltip to appear
            var position = event.page[slider_progress.axis] - slider_progress.element.getPosition()[slider_progress.axis] - slider_progress.half;
    		position = position.limit(-slider_progress.options.offset, slider_progress.full -slider_progress.options.offset);
            time_tooltip.update(1000 * $('video').duration * slider_progress.toStep(position) / slider_progress.steps);
            $('time_tooltip').setStyle('left', (String(Math.round(position - 9)) + 'px'));
        },
        'mouseenter': function() {
            $('time_tooltip').setStyle('display', 'block');
        },
        'mouseleave': function() {
            $('time_tooltip').setStyle('display', 'none');
        }
    });
    
    var progressbar = new ProgressBar({
        container: $('load'),
        startPercentage: 0,
        step: 0,
    });
    new MooPlay.Control.LoadProgress($('video'), progressbar);
        
    $('playpause').addEvent('mousemove', function() {
        if(!$('playpause').hasClass('paused') && !$('controls').hasClass('displayed')) {
            $('controls').addClass('displayed');
            $('controls').removeClass.delay(5000,$('controls'),'displayed');
        }
    });
    $('playpause').addEvent('mouseleave', function() {
        if(!$('playpause').hasClass('paused')) {
            $('controls').removeClass('displayed');
        }
    });
    
    var reader = new MooPlay.Subtitle.Player($('video'), $('subtitle'), {
        onDisplay: function(element, container, overlapping) {
            element.addClass('overlapping' + String(overlapping));
            element.setStyles({
                'left': container.offsetWidth
            });
            element.inject(container, 'bottom');
            var effect = new Fx.Morph(element, {
                fps: 30,
                link: 'cancel',
                duration: 150
            });
            effect.start({
                'left': 0
            });

        },
        onDispose: function(element, container, overlapping) {
            element.setStyles({
                'margin-left': 0
            });
            var effect = new Fx.Morph(element, {
                fps: 30,
                link: 'cancel',
                duration: 80,
                onComplete: function() {
                    element.dispose();
                    element.removeClass('overlapping' + String(overlapping));
                }
            });
            effect.start({
                'left': -container.offsetWidth
            });
        }
    });
    
    var mySelect = new MavSelectBox({
        elem: $('subtitles_select'),
        selectboxClass: 'subtitles_select',
        selectmenuClass: 'options',
        optionClass: '',
        fxProperty: 'height',
        fxFrom: 0,
        fxTo: 115,
        showStyles: true
    });

    mySelect.addEvent('select', function() {
        var value = $('subtitles_select').value;
        if(value != '') {
            var loader = new MooPlay.Subtitle.Loader( value, {
                onComplete: function(subs_hash) {
                    reader.loadSubtitles(subs_hash);
                }
            });
        } else {
            reader.unLoad();
        }
        
    });

    var controls_fx = new Fx.Tween($('controls'), {property: 'opacity', link: 'ignore', duration: 300});
    var timer_hide = null;
    var visible = false;
    function pannel_show() {
        $clear(timer_hide);
        timer_hide = window.setTimeout(pannel_hide, 5000);
        if(!visible) {
            controls_fx.cancel();
            visible = true;
            $('player').setStyle('cursor', 'default');
            controls_fx.start(1);
        }
        
    }
    function pannel_hide() {
        if(visible) {
            controls_fx.cancel();
            visible = false;
            $('player').setStyle('cursor', 'none');
            controls_fx.start(0);
        }
    }
    $('player').addEvents({
        'mousemove': pannel_show,
        'click': pannel_show,
        'mouseleave': pannel_hide
    });
    
    
});