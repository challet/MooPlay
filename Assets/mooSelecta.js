/*
---
description: mooSelecta, select element styling replacement

license:
  MIT-style

authors:
- Dimitar Christoff

requires:
  core/1.2.4: '*'

provides: [Element]

...
*/

var mooSelecta = new Class({

    version: 1.2,

    updated: "29/03/2010 15:47:49",


    Implements: [Options,Events],

    // default options
    // don't change these here but on the instance (unless you want to)
    options: {
        selector: "selecta",                            // class / selector for selects to convert
        triggerClass: "selectaTrigger",                 // class of the replacement div
        triggerPadding: 30+5,                           // compensate for left/right padding of text
        triggerBeforeImage: "",                         // advanced styling of trigger like a round image
        triggerBeforeImageWidth: 0,                     // need to compensate width
        triggerBeforeImageHeight: 0,                    // and know height.
        wrapperClass: "selectaWrapper",                 // popup wrapper class
        wrapperWidthAdjustment: 0,                      // you can add or substract to width if not matching, use +/- value
        wrapperShadow: "shadowy",                       // extra class applied to wrapper, like one with box-shadow
        wrapperHeight: 0,                               // maximum allowed height for dropdown before it scrolls
        optionClass: "selectaOption",                   // base class of indivdual options
        optionClassSelected: "selectaOptionSelected",   // pre-selected value class
        optionClassOver: "selectaOptionOver",           // onmouseover option class
        allowTextSelect: false,                         // experimental to stop accdiental text selection
        // these are keycodes that correspond to alpha numerics on most ISO keyboards for index lookups of options
        allowedKeyboardCodes: [48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],
        useClickListener: true                          // binds click events to check for clicks away from dropdown.
    },

    Binds: ["_bindClickListener"],

    // internal hashed collection of managed selects
    selects: {},

    // hash that references options per select for keycode lookups
    optionList: {},

    // false or contains a pointer to the last select that has opened the menu
    focused: false,

    initialize: function(options) {
        // start everything.
        this.setOptions(options);

        // locate and apply selects to all required ones.
        var selects = $$('select.'+this.options.selector);

        if (!selects.length)
            return "nothing to do, selector came up empty!";

        selects.each(this.replaceSelect.bind(this));

        // convert object to hash
        this.selects = new Hash(this.selects);

        // bind mouseclicks and keytyping
        this.bindListeners();
    },

    replaceSelect: function(el) {
        // public method that replaces selects
        var el = document.id(el); // adds uid.

        if (!el) return;

        // gets existing element's width to use
        var width = el.getSize().x;

        // default selected to go into wrapper
        var selectedOption = el.getElements("option").filter(function(op) {
            return op.getProperty("selected");
        });

        // clean up old instances.
        if (el.retrieve("triggerElement"))
            el.retrieve("triggerElement").dispose();
        if (el.retrieve("wrapper"))
            el.retrieve("wrapper").dispose();


        // build the top visible element
        el.store("triggerElement", new Element("div", {
            "class": this.options.triggerClass,
            styles: {
                width: width - this.options.triggerPadding
            }
        }).inject(el, "after").addClass("cur")); // cur is a class that changes cursor to a clicky one.

        // re-adjust width after the trigger has been done so wrapper can match it.
        width = el.retrieve("triggerElement").getSize().x - 2 - this.options.triggerBeforeImageWidth + this.options.wrapperWidthAdjustment;

        // build the menu wrapper

        // if we have an image to pre-pend, add it.
        if (this.options.triggerBeforeImage.length) {
            new Element("div", {
                styles: {
                    float: "left",
                    position: (Browser.Engine.trident4) ? "absolute" : "relative",
                    background: "url("+this.options.triggerBeforeImage+") no-repeat",
                    width: this.options.triggerBeforeImageWidth,
                    height: this.options.triggerBeforeImageHeight
                }
            }).inject(el.retrieve("triggerElement"), "before");
        }

        // create the options wrapper
        el.store("wrapper", new Element("div", {
            "class": this.options.wrapperClass,
            styles: {
                width: width,
                zIndex: 10000
            }
        }).inject(el.retrieve("triggerElement"), "after").addClass(this.options.wrapperShadow));

        // now hide the original selects off-screen
        // this is so the tab indexing and by-label focus works and hands us back contol.
        el.set({
            styles: {
                position: "absolute",
                top: -100
            },
            events: {
                focus: function() {
                    if (this.focused)
                        this._hideOptions();

                    this.focused = el;
                    this._toggleOptions(el);

                }.bind(this),
                blur: function(e) {
                    if (this.focused == el)
                        this._toggleOptions(el);
                }.bind(this)
            }
        });

        // handle labels so they don't interfere by launching a semi-full event.
        var lbl = document.getElement("label[for="+el.get("id")+"]");
        if (el.get("id") && lbl) {
            lbl.addEvent("click", function(e) {
                new Event(e).stop();
                el.fireEvent("focus");
            });
        }


        // get all options and port them to wrapper
        el.getElements('option').each(function(option) {
            var selected = false;
            if (option.getProperty("selected")) {
                el.retrieve("triggerElement").set("html", option.get("text"));
                selected = true;
            }
            this._addOption(option, el, selected);
        }, this);

        // figure out height of wrapper and reduce if needed
        if (this.options.wrapperHeight) { // if greater than 0 care about this
            var height = el.retrieve("wrapper").getSize().y;
            if (height > this.options.wrapperHeight) {
                el.retrieve("wrapper").setStyles({
                    height: this.options.wrapperHeight
                });
            }
        }

        // hide the menu by default.
        el.retrieve("wrapper").setStyle("display", "none");

        // attach a click event to trigger element
        el.retrieve("triggerElement").addEvents({
            click: function(e) {
                new Event(e).stop();
                // toggler, click on opened closes it.
                el.fireEvent((this.focused == el) ? "blur" : "focus");
            }.bind(this)
        });

        // export the managed select to the hash
        if (el.uid && el)
            this.selects[el.uid] = el;

    }, // end .replaceSelect();

    bindListeners: function() {
        // setup valrious click / key events

        if (this.options.useClickListener)
            document.addEvent("click", this._bindClickListener);

        document.addEvents({
            // keyboard listener
            keydown: function(e) {
                var e = new Event(e);

                // if no menu is currently open, don't do anything.
                if (!this.focused)
                    return;

                switch(e.code) {
                    case 40: // down arrow option navigation
                        new Event(e).stop();
                        // ops should really be cached outside here
                        var ops = this.focused.retrieve("wrapper").getElements("div."+this.options.optionClass), done = false;

                        ops.each(function(el, i) {
                            if (ops.length-1 == i || done)
                                return;

                            if (el.hasClass(this.options.optionClassSelected)) {
                                ops.removeClass(this.options.optionClassOver);
                                ops[i+1].addClass(this.options.optionClassSelected).addClass(this.options.optionClassOver);
                                el.removeClass(this.options.optionClassSelected);
                                done = true;
                            }
                        }, this);


                    break;
                    case 38: // up arrow option navigation
                        new Event(e).stop();
                        var ops = this.focused.retrieve("wrapper").getElements("div."+this.options.optionClass), done = false;

                        ops.each(function(el, i) {
                            if (done)
                                return;

                            if (el.hasClass(this.options.optionClassSelected)) {
                                if (i > 0) {
                                    ops.removeClass(this.options.optionClassOver);
                                    ops[i-1].addClass(this.options.optionClassSelected).addClass(this.options.optionClassOver);
                                    el.removeClass(this.options.optionClassSelected);
                                }
                                done = true;
                            }
                        }, this);


                    break;
                    case 13: // enter
                        new Event(e).stop();
                        this.focused.retrieve("wrapper").getElements("div."+this.options.optionClassSelected).fireEvent("click");
                    break;
                    case 9: // tabbed out, blur auto...
                        this._hideOptions(this.focused);
                    break;
                    case 34:
                    case 35:
                        // go to last option via pgdn or end
                        new Event(e).stop();
                        var old = this.focused;
                        this.focused.retrieve("wrapper").getElements("div."+this.options.optionClass).getLast().fireEvent("click");
                        old.fireEvent("focus");

                    break;
                    case 33:
                    case 36:
                        // go to first option via pgup or home
                        new Event(e).stop();
                        var old = this.focused;
                        this.focused.retrieve("wrapper").getElement("div."+this.options.optionClass).fireEvent("click");
                        old.fireEvent("focus");

                    break;
                    default:
                        // the "other" keys.

                        var old = this.focused, ops = this.focused.retrieve("wrapper").getElements("div."+this.options.optionClass);

                        // is is alpha numeric allowed?
                        if (this.options.allowedKeyboardCodes.contains(e.code)) {
                            // loop through current option texts array cache for matches
                            var matchingKeys = [];
                            var selected = false;

                            var applicable = this.optionList["k"+this.focused.uid].filter(function(el, index) {
                                if (ops[index].hasClass(this.options.optionClassSelected)) selected = index;
                                var match = el.indexOf(e.key) == 0;
                                if (match)
                                    matchingKeys.push(index);
                                return match;
                            }, this);

                            if (applicable.length) {
                                if (!matchingKeys.contains(selected)) {
                                    selected = matchingKeys[0];
                                }
                                else {
                                    if (ops[selected+1] && matchingKeys.contains(selected+1)) {
                                        selected++;
                                    }
                                    else {
                                        selected = matchingKeys[0];
                                    }

                                }

                                ops[selected].fireEvent("click");
                                old.fireEvent("focus");
                                done = true;
                            }
                        }
                        else {
                            // do nothing or disable comment to see other keys you may like to bind.
                            // console.log(e.code, e.key);
                        }
                    break;
                }
            }.bind(this)
        });
    }, // end .bindListeners()

    _bindClickListener: function(e) {
        // listens for client clicks away from triggers and closes like real selects do when user loses interest
        var e = new Event(e);

        // using a collection which saves a click on an element that's not extended with .hasClass
        if ($$(e.target).hasClass(this.options.triggerClass).contains(false)) {
            this._hideOptions();
        }
    },

    _addOption: function(option, el, selected) {
        // internal method called by replaceSelect that adds each option as a div within the wrapper
        var text = option.get("text").trim();
        if (!text.length)
            text = "&nbsp;";

        // store options relevant to element uid.
        var oldList = this.optionList["k" + el.uid] || [];
        oldList.push(text.toLowerCase());
        var tempObj = {};
        tempObj["k" + el.uid] = oldList;
        $extend(this.optionList, tempObj);
        // end store

        var opDiv = new Element("div", {
            "class": this.options.optionClass,
            html: text,
            events: {
                mouseenter: function() {
                    opDiv.addClass(this.options.optionClassOver);
                }.bind(this),
                mouseleave: function() {
                    opDiv.removeClass(this.options.optionClassOver);
                }.bind(this),
                click: function(e) {
                    if (e && e.type && e.stop)
                        e.stop();

                    // menu stuff visual
                    el.retrieve("wrapper").getChildren().removeClass(this.options.optionClassSelected);
                    opDiv.addClass(this.options.optionClassSelected);
                    el.retrieve("triggerElement").set("html", opDiv.get("text"));

                    // now handle change in the real select
                    el.set("value", opDiv.retrieve("value")).fireEvent("change", e);
                    this._toggleOptions(el);
                }.bind(this)
            }
        }).store("value", option.get("value")).inject(el.retrieve("wrapper")).addClass("cur");

        if (selected)
            opDiv.addClass(this.options.optionClassSelected);

    },

    _toggleOptions: function(el) {
        // toggles visibility on click
        var vis = el.retrieve("wrapper").getStyle("display");
        el.retrieve("wrapper").setStyle("display", (vis == "none") ? "block" : "none").getChildren().removeClass(this.options.optionClassOver);
        this.focused = (vis != "none") ? false : el;

        // scroll to selected from .toElement in core but w/o a fx.slide instance
        var parent = el.retrieve("wrapper").getPosition(this.options.overflown);
		var target = el.retrieve("wrapper").getElement("div." + this.options.optionClassSelected).getPosition(this.options.overflown);
        el.retrieve("wrapper").scrollTo(target.x - parent.x, target.y - parent.y);
        this._clearSelection();
    },

    _hideOptions: function() {
        // private called on cleanup / away click
        this.selects.getValues().each(function(el) {
            if (el.retrieve("wrapper").getStyle("display") != "none")
                el.fireEvent("blur");
            el.retrieve("wrapper").setStyle("display", "none");
            el.focused = false;
        });
    },

    _clearSelection: function() {
        // removes document selection
        if (this.options.allowTextSelect || Browser.Engine.trident4) // not sure how IE6 does this
            return;

        if (document.selection && document.selection.empty) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }
}); // endClass
