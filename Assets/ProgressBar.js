/*
---
description:     ProgressBar

authors:
  - David Walsh (http://davidwalsh.name)

license:
  - MIT-style license

requires:
  core/1.2.1:   '*'
  more/1.2.1:   'Fx.*'

provides:
  - ProgressBar
...
*/
var ProgressBar = new Class({

	//implements
	Implements: [Events, Options],

	//options
	options: {
		container: document.body,
		boxID:'progress-bar-box-id',
		percentageID:'progress-bar-percentage-id',
		displayID:'progress-bar-display-id',
		startPercentage: 0,
		displayText: false,
		speed:10,
		step:1,
		allowMore: false,
		onComplete: $empty,
		onChange: $empty
	},

	//initialization
	initialize: function(options) {
		//set options
		this.setOptions(options);
		//quick container
		this.options.container = document.id(this.options.container);
		//create elements
		this.createElements();
	},

	//creates the box and percentage elements
	createElements: function() {
		var box = new Element('div', { 
			id:this.options.boxID 
		});
		var perc = new Element('div', { 
			id:this.options.percentageID, 
			'style':'width:0px;' 
		});
		perc.inject(box);
		box.inject(this.options.container);
		if(this.options.displayText) { 
			var text = new Element('div', { 
				id:this.options.displayID 
			});
			text.inject(this.options.container);
		}
		this.set(this.options.startPercentage);
	},

	//calculates width in pixels from percentage
	calculate: function(percentage) {
		return (document.id(this.options.boxID).getStyle('width').replace('px','') * (percentage / 100)).toInt();
	},

	//animates the change in percentage
	animate: function(go) {
		var run = false;
		var self = this;
		if(!self.options.allowMore && go > 100) { 
			go = 100; 
		}
		self.to = go.toInt();
		document.id(self.options.percentageID).set('morph', { 
			duration: this.options.speed,
			link:'cancel',
			onComplete: function() {
				self.fireEvent('change',[self.to]);
				if(go >= 100) {
					self.fireEvent('complete',[self.to]);
				}
			}
		}).morph({
			width:self.calculate(go)
		});
		if(self.options.displayText) { 
			document.id(self.options.displayID).set('text', self.to + '%'); 
		}
	},

	//sets the percentage from its current state to desired percentage
	set: function(to) {
		this.animate(to);
	},

	//steps a pre-determined percentage
	step: function() {
		this.set(this.to + this.options.step);
	}

});