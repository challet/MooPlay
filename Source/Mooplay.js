/*
---
description: Basic Mooplay object, useful but not really interresting

license: GNU GPL

authors:
- Clément Hallet

requires:
- core/1.2.4: [Core, Element, Element.Event, Element.Style, Class, Class.Extra.Events, Class.Extra.Options]

provides: 
- Mooplay
- Mooplay.Subtitle
- Mooplay.Subtitle.Parser
- Mooplay.Control
- Mooplay.Display

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
