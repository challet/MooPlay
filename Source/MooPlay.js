/*
---
description: Base MooPlay object, useful but not really interesting

license: GNU GPL

authors:
- Clément Hallet

requires:
- core/1.2.4: [Core, Element, Element.Event, Element.Style, Class, Class.Extra.Events, Class.Extra.Options]

provides: 
- MooPlay
- MooPlay.Subtitle
- MooPlay.Subtitle.Parser
- MooPlay.Control
- MooPlay.Display

...
*/


Element.NativeEvents = $merge(Element.NativeEvents, {
    loadstart: 2,
    progress: 2,
    suspend: 2,
    abort: 2,
    error: 2,
    emptied: 2,
    stalled: 2,
    play: 2,
    pause: 2,
    loadedmetadata: 2,
    loadeddata: 2,
    waiting: 2,
    playing: 2,
    canplay: 2,
    canplaythrough: 2,
    seeking: 2,
    seeked: 2,
    timeupdate: 2,
    ended: 2,
    ratechange: 2,
    durationchange: 2,
    volumechange: 2
});

var MooPlay = {
    Subtitle: {
        Parser: {}
    },
    Control: {},
    Display: {}
};
