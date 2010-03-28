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

*/


Element.NativeEvents = $merge(Element.NativeEvents, {
    timeupdate: 2,
    play: 2,
    pause: 2
});

var MooPlay = {
    Subtitle: {
        Parser: {}
    },
    Control: {},
    Display: {}
};
