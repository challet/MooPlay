/**
 * @project MavSelectBox (Customizable Select boxes)
 * @author Dustin Hansen
 * @version 0.5.5
 * @url http://fuzecore.com, http://maveno.us
 * @license MIT Style License
 * 
 * @contributions
 * : Container additions for using selectbox in animations and ie scrolling bug fixes
 * : fixed multiselect bug, yayyy! ^_^
 * : Quentin Ambard - http://www.quentin.avricot.com
 */

var MavSelectBox = new Class({
	Implements: [Options, Events],

	options: {
		allowSplit: true,							// depricate for .filter()
		altClass: 'select-box-alt',
		alternate: false,
		alternateOdd: false,
		attachResize: true,
		container: null,
		disableClass: 'disabled',
		elem: null,
		filter: null,
		fxOptions: {},
		fxProperty: 'opacity',
		fxFrom: 0, // when appears
		fxTo: 1, // when appears
		groupClass: 'select-box-options-group',
		maxShow: null,
		minShow: 3,
		optionClass: 'select-box-opt',
		selectboxClass: 'select-box',
		selectClass: 'selected',
		selectmenuClass: 'select-box-options',
		separator: '--',							// depricate for .filter()
		showStyles: false,
		size: 1,
		template: '<span>%s</span>',
		tmplt_regex: null,
		useFx: true,

		onHide: $empty(),
		onOver: $empty(),
		onSelect: $empty(),
		onShow: $empty()
	},
	//Modification
	isCrolling: false,
	//<--Modification
	container: null,
	element: null,
	focused: null,
	length: 0,
	selected: null,
	selectedIndex: 0,
	showing: false,
	textSearch: '',
	version: '0.5.5',

	initialize: function(_options) {
		this.boundShow = this.show.bind(this);
		this.boundKey_option = this.key_option.bind(this);
		this.boundHide = this.hide.bind(this);
		
		var opts = ($type(_options) != 'object' ? {'elem':_options} : _options);
		if (!$defined(opts.elem)) return;

		this.setOptions(opts);

		if (this.options.filter) {
			this.filter = this.options.filter;
		}

		this.element = $(this.options.elem);
		this.elementCopy = this.element.clone().set({
			'id':this.element.get('id'),
			'name':this.element.get('name')
		});

		if (!$defined(this.options.container) || (this.container = $(this.options.container)) == null) {
			this.container = null;
		}

		this.optClass = 'li[class*=' + this.options.optionClass + ']';

		this.create_select();
		if (this.options.attachResize) { window.addEvent('resize', function() { if (this.showing) { this.show(); } }.bind(this)); }
		
	},

	destroy: function(_revert) {
		if (_revert) {
			if (this.selected && $defined(this.selected.retrieve('value'))) {
				$each(this.elementCopy.options, function(_elem) {
					if (_elem.value == this.selected.retrieve('value')) { _elem.selected = true; }
				}, this);
			}

			this.elementCopy.replaces($(this.element.get('id')));
		}

		this.remove_events();
		this.elementSelect.destroy();
	},

	ieFocus: function() {
		this.isCrolling = true;
	},

	create_select: function() {
		var wh = this.element.getSize();
		this.eid = this.element.get('id');

		// create the select element
		this.elementSelect  = new Element('div', {
			'class': this.options.selectboxClass, 
			'styles': { 'width': wh.x, 'height': wh.y }
		}).inject(this.element, 'after');
		
		// create display element for selectbox
		this.elementDisplay = new Element('a', {'href':'#'}).inject(this.elementSelect, 'top');
		if (this.elementCopy.get('tabindex') != 0) {
			this.elementDisplay.set('tabindex', this.elementCopy.get('tabindex'));
		}

		this.elementDisplay.setStyles({'height': (wh.y-5), 'line-height': (wh.y-5)});
		this.add_events();

		// create the options element
		this.elementOptions = new Element('ul', {
			//'styles': { 'width': wh.x },
			//'opacity': (this.options.useFx ? 0 : 1),
			'class': this.options.selectmenuClass
		}).inject(this.elementSelect);

		if (Browser.Engine.trident) {
			this.boundIeFocus = this.ieFocus.bind(this);
			this.elementOptions.addEvent('mousedown', this.boundIeFocus);
		}

		// create the fx object if useFx is set
		this.fx = this.options.useFx ? new Fx.Tween(this.elementOptions, $merge({
			'duration': 150, 
			'link': 'cancel'
		}, this.options.fxOptions)) : null;

		// loop thru existing options and recreate
		$each(this.element.getChildren(), this.create_option.bind(this));

		// set alternating
		if (this.options.alternate) {
			this.elementOptions.getElements(this.optClass + ':' + (this.options.alternateOdd ? 'odd': 'even')).addClass(this.options.altClass);
		}

		// set default selected option and dislpay value
		(this.selected = this.elementOptions.getElement('li.' + this.options.selectClass)).removeClass(this.options.selectClass);
		this.selectedIndex = this.selected.retrieve('idx');

		this.elementDisplay.set({
			'html': this.selected.get('html'),
			'class': (this.options.showStyles ? this.selected.get('class') : ''),
			'style': (this.options.showStyles ? this.selected.get('style') : '')
		});

		// store option menu coords info
		this.elementOptions.store('coords', this.elementOptions.getCoordinates()).setStyles({'visibility':'','display':'none'});

		// replace select element with hidden input by same id/name
		this.element = new Element('input', {
			'type': 'hidden',
			'value': this.element.get('value'),
			'id': this.element.get('id'),
			'name': this.element.get('name')
		}).replaces(this.element).set('id', this.eid);
	},

	create_option: function(_opt, _idx, _group) {
		// get option information
		var val = _opt.get('value'), selected = !!(_opt.selected);
		var text = (_opt.get('label') ? _opt.get('label') : (_opt.get('text') || '&nbsp;'));

		// determine class for option
		var opt_class = (_opt.get('tag')=='optgroup'?' optgroup unselectable':' ' + this.options.optionClass) + (selected&&!_opt.disabled?' '+this.options.selectClass:'') +
						(_opt.disabled?' '+this.options.disableClass:'');

		// create li replacement for select option
		var new_option = new Element('li', {
			'id': this.eid + '_opt' + _idx,
			'html': this.filter(text, this.options.tmplt_regex, this.options.template),
			'style': _opt.get('style'),
			'class': _opt.get('class') + opt_class
		}).store('value', _opt.get('value'))
		  .store('idx', (_opt.get('tag')!='optgroup'?(++this.length):''))
		  .addEvents({
			'mouseover': this.over.bind(this),
			'mousedown': this.select.bind(this)
		}).inject(($(_group) || this.elementOptions));

		new_option.store('coords', new_option.getCoordinates());
		
		if (_opt.get('tag') == 'optgroup') {
			var optgroup = new Element('ul', {'class': this.options.groupClass}).inject(new_option);
			$each(_opt.getChildren(), function(_sopt, _sidx) {
				this.create_option(_sopt, (_idx + '' + _sidx), optgroup);
			}, this);
		}

		// THIS TO BE REPLACED WITH this.filter()
		// if option.text matches this.options.separator split and go left / right with text
		if (this.options.allowSplit && text.match(new RegExp(this.options.separator))) {
			text = text.split(this.options.separator);
			this.elementOptions.lastChild.set('html', '<span><span class="goleft">' + text[0].trim() + '</span><span class="goright">' + text[1].trim() + '</span><br style="clear:both" /></span>');
		}
	},
	
	filter: function(_str, _regx, _tmplt) {
		return _tmplt.replace(/\%s/i, _str);
	},

	inject: function(_option, _where) {
		
	},
	
	dispose: function(_elem) {
		
	},

	add_events: function() {
		this.elementDisplay.addEvents({
			'click': this.boundShow,
			'keydown': this.boundKey_option,
			'blur': this.boundHide
		});
	},

	remove_events: function() {
		this.elementOptions.removeEvent(this.boundIeFocus);
		this.elementDisplay.removeEvents({
			'click': this.boundShow,
			'keydown': this.boundKey_option,
			'blur': this.boundHide
		});
	},

	key_option: function(e) {
		e = new Event(e);
		if (e.key != 'tab') {
			e.stop();
			switch(e.key) {
				case 'esc':
					this.hide();
					break;

				case 'enter':
					this.select(this.selected);
				case 'tab':
					this.hide();
					break;
				
				case 'up': case 'down':
					if (e.alt) { this.show(); }
					this.select(e.key);
					break;
				
				case 'shift': case 'control': case 'alt':
					break;

				default:
					this.search(e.key);
			}
		}
	},

	search: function(_key, _retrying) {
		this.textSearch += _key;
		var option_elems = this.get_options(), str_found=false, elem = false;
		// var option_elems = this.get_options('li[text^=' + this.textSearch +']'), str_found=false, elem = false;

		for(var i=0; i<option_elems.length; i++) {
			var elem = option_elems[i]
			if ((elem.get('text')).match(new RegExp('^' + this.textSearch, 'i'))) {
				if (this.selected != elem) { this.select(elem); }
				str_found = true;
				break;
			}
		}

		if (str_found === false) {
			this.textSearch = '';
			if (!_retrying) { this.search(_key, true); }
		}
	},

	get_options: function(_selector) {
		return this.elementOptions.getElements((_selector || this.optClass));
	},

	// is there a better way to do this?
	determine: function(_elem) {
		var elem = ($type(_elem) == 'element' ? (_elem.get('tag') != 'li' ? _elem.getParent('li') : _elem) : this.get_options());

		if ($type(_elem) != 'element') {
			var fromIdx = ((this.focused && this.focused != this.selected) ? this.focused : this.selected).retrieve('idx');

			elem = elem.filter(function(_el) {
						return (!$(_el).hasClass(this.options.disableClass) && 
								((_elem == 'up' && $(_el).retrieve('idx') < fromIdx ) ||
								 (_elem == 'down' && $(_el).retrieve('idx') > fromIdx)));
			}, this);

			elem = elem[0] ? (_elem == 'up' ? elem.reverse() : elem)[0] : elem;
		}

		return elem;
	},

	over: function(e) {
		e = new Event(e);
		var elem = ($(e.target).get('tag') != 'li' ? $(e.target).getParent('li') : $(e.target));

		if (!elem.hasClass(this.options.disableClass) && !elem.hasClass('unselectable')) {
			if ($type(this.focused) == 'element') { this.focused.removeClass(this.options.selectClass); }
			(this.focused = elem).addClass(this.options.selectClass);
			this.fireEvent('over');
		}
	},

	select: function(_elem) {
		var elem = ($type(_elem) == 'event' ? new Event(_elem).target : _elem);
		elem = this.determine(elem);
		
		if (elem && !elem.hasClass(this.options.disableClass) && !elem.hasClass('unselectable')) {
			if (this.focused) { this.focused.removeClass(this.options.selectClass); }
			if (this.showing === true) {
				(this.focused = this.selected = elem).addClass(this.options.selectClass);
				this.scroll();
			} else {
				this.selected = elem;
			}

			this.element.set('value', this.selected.retrieve('value'));
			this.selectedIndex = this.selected.retrieve('idx');

			this.elementDisplay.set({
				'html': this.selected.get('html'),
				'class': (this.options.showStyles ? this.selected.get('class') : '')
			}).removeClass(this.options.selectClass).removeClass(this.options.altClass);

			this.fireEvent('select', this.selected);

			if (Browser.Engine.trident) {
				this.isCrolling = false;
				this.hide();	
			}
		}
	},

	scroll: function() {
		var sElem = this.elementOptions.getCoordinates();
		var selElem = this.selected.getCoordinates();
		var elScrollTop = this.elementOptions.scrollTop;

		if ((elScrollTop + sElem.height) < (selElem.top - sElem.top + 5)) {
			this.elementOptions.scrollTop = (selElem.top - sElem.top - sElem.height + selElem.height);
		}
		else if ((selElem.top - sElem.top + selElem.height) < (elScrollTop + 5)) {
			this.elementOptions.scrollTop = (selElem.top - sElem.top);
		}
	},

	show: function(e) {
	    e.preventDefault();
	    
	    if(this.showing) {
	        return this.hide();
	    }
	    
		var coords = this.elementOptions.retrieve('coords');
		var sElem = this.elementSelect.getCoordinates(), sElem_top = (sElem.top + sElem.height);

		if (this.container) {
			sElem_top -= this.container.getStyle('top');
			sElem.left -= this.container.getStyle('left');
		}

		var h = ((window.getSize().y + window.getScroll().y) - sElem_top);
		var height = (coords.height >= h ? 0 : ''), showing = 0;

		if (coords.height >= h) {
			$each(this.get_options(), function(_elem) {
				var eH = _elem.retrieve('coords').height;
				if (height < h && (height + eH) < h) { height += eH; showing++; }
			}, this);

			if (showing < this.options.minShow) {
				height = (sElem.top < coords.height ? sElem.top - 10 : coords.height);
				sElem_top = sElem.top - height - 1;
			}
		}

		this.elementOptions.setStyles({
			'display': '' 
		});
		this.scroll();

		this.showing = true;
		this.focused = this.selected;
		this.focused.addClass(this.options.selectClass);
		this.fireEvent('show');

		if (this.options.useFx) { this.fx.start(this.options.fxProperty, this.options.fxFrom, this.options.fxTo); }
		
		// fixes chrome/safari focus bug
		this.elementDisplay.focus();
	},

	hide: function(e) {
		if (this.isCrolling) {
			this.isCrolling = false;
			this.elementDisplay.focus();
		}
		else if (this.showing) {
			if (this.options.useFx) {
				this.fx.start(this.options.fxProperty, this.options.fxTo, this.options.fxFrom).chain(function() {
					this.elementOptions.scrollTop = 0;
					this.elementOptions.setStyle('display', 'none');

					if (this.focused) {
						this.focused.removeClass(this.options.selectClass);
					}
					this.showing = this.focused = false;
				}.bind(this));
			} else {
				this.elementOptions.setStyle('display', 'none');

				if (this.focused) {
					this.focused.removeClass(this.options.selectClass);
				}
				this.showing = this.focused = false;
			}

			this.fireEvent('hide');
		}

		this.textSearch = '';
	}
});
