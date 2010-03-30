/*
---

script: moogressBar.js
version: 0.5.1
description: with moogressBar you can easily create a progress bar powered by mooTools
license: MIT-style
authors:
- Christopher Beloch
- Arian Stolwijk (code improvements 0.2 -> 0.3)

requires: 
  core:1.2.4: '*'

provides: [Moogressbar]

...
*/

var MoogressBar = new Class({

	Implements: [Options, Events],
	
	options: {
		bgImage: 'blue.gif',  // What is the background-image?
		percentage: 0,  // Start at which percentage?
		height: 10,  // Height of the bar
		hide: true, // Hide the bar on 100%?
		fx: { // The effects for the scroll, set to null or false if you don't want this effect
			unit: '%',
			duration: 'normal',
			property: 'width'
		} /*,
		onChange: $empty,
		onFinish: $empty
		*/
	},
	
	initialize: function(parent,options){
		this.setOptions(options);
		this.parent = document.id(parent)
			.setStyle('z-index',999);
		
		// Set the current percentage
		this.current = this.options.percentage;
		
		// Draw bar
		this.bar = new Element('div', {
			'styles': $merge({
				display: 'block',
				width: this.options.percentage + '%',
				height: this.options.height
				/*
				// Border Radius deactivated, because Firefox is causing drawing problems
				'border-radius': '5px',
				'-webkit-border-radius': '5px',
				'-moz-border-radius': '5px'*/
			}, /^#\d{3,6}$/.test(this.options.bgStyle) ? {
			    'background-color' : this.options.bgStyle
			} : {
			    'background-image': 'url(' + this.options.bgStyle + ')',
			})
		}).inject(parent);
		
		// Will it be Animated?
		if(this.options.fx)
			this.fx = new Fx.Tween(this.bar, this.options.fx);
	},
	
	// function to modify the percentage status
	setPercentage: function(percentage){
		
		if(this.fx){
			// Fire the events when the fx is complete
			this.fx.addEvent('complete',function(){
				if(percentage >= 100){
					this.fireEvent('finish');
					
					// hide bar
					if(this.options.hide){
						this.parent.tween('opacity', 0).tween('width', 0).tween('height', 0);
						this.fx.set('opacity', 0);
					}
				}
				this.fireEvent('change',percentage);
			}.bind(this));
		}else{
			// Fire the events immediately when there's no fx
			this.fireEvent('change',percentage);
			if(percentage >= 100){
				this.fireEvent('finish');
				
				if(this.options.hide){
					this.parent.setStyle('display', 'none');
				}
			}
		}

		// Change the percentage bar
		if(this.fx) {
			this.fx.cancel().start(this.bar.getStyle('width').toInt(), percentage);
		} else {
			this.bar.setStyle('width', percentage + '%');
		}

		// Change the current percentage
		this.current = percentage;
	},
	
	getPercentage: function(){
		return this.current;
	},
	
	toElement: function(){
		return this.parent;
	},

	increasePercentage: function(percentage) {
		this.setPercentage(this.current + percentage);
	}
});
