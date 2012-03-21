/*
---
name: Fx.TextMorph.js
description: Creates a text with predetermined form.
authors: Nicolas de Marqué
requires:
    core/1.2.4:
provides: [TextMorph]
license: MIT-style license
version: 1.0.0
...
 */
 
var TextMorph = function(element, options){
	this.options= {
		draw : null,
		functions : null,
		functionRight : null,
		functionLeft : null,
		lineHeight : null,
		width : null,
		height : null,
		debug : false,
		backgroundcolor : null,
		first : true,
		shy : true
	};
	this.initialize = function(element, options){
		this.subject = this.subject || this;
		this.setOptions(options);
		this.element = element;		
		
		if (!this.options.width)
			this.options.width = $(this.element).width();
		if (!this.options.height)
			this.options.height = $(this.element).height();
		if (this.options.draw != null){
			this.options.functionRight = eval("this."+this.options.draw);
			this.options.functionLeft = eval("this."+this.options.draw);
		}
		if((typeof eval(this.options.functions))=="function"){
			this.options.functionRight=this.options.functions;
			this.options.functionLeft=this.options.functions;
		};		
		if ((typeof eval(this.options.functionRight))!="function")
				this.options.functionRight = this.circle;
		if ((typeof eval(this.options.functionLeft))!="function")
				this.options.functionLeft = this.circle;
 				
		if (!this.options.lineHeight)
			this.options.lineHeight = parseFloat($(this.element).css('line-height'), 10);

		this.width =this.options.width;
		this.height=this.options.height;
		this.functionRight = this.options.functionRight || this.circle;
		this.functionLeft  = this.options.functionLeft || this.circle;
		this.lineHeight = this.options.lineHeight;
		this.debug = this.options.debug;
		this.backgroundcolor = this.options.backgroundcolor;
		this.shy = this.options.shy;
		this.changeOrigin();
		this.placeContent();
		this.drawForm();
		//For chrome compatibility
		this.firstChild.previousSibling.parentNode.removeChild(this.firstChild.previousSibling)
	}
	this.changeOrigin = function() {
		$(this.element).css({'width': this.width + 'px'});
		$(this.element).css({'height': this.height + 'px'});
		$(this.element).css({'overflow': 'hidden'});
	};
	this.placeContent = function() {
		divfloat = $("<div></div>").css( {
			'float' : 'left'
		}).addClass("floatie");
		divclear = $("<div></div>").css( {
			'clear' : 'both'
		}).addClass("floatie");
		var div = $("<div></div>").css( {
			'margin-top':'-' + this.height + 'px'
		}).addClass("content");
		while (this.element.hasChildNodes()) {
			$(div).append(this.element.removeChild(this.element.firstChild));
		}
	//Todo: 
		/*	var elements = div.getElementsByTagName("*");
		for ( var i = 0; i < elements.length; i++) {
			this.simplyShy(elements.item(i));
		}
	*/	
		if(this.shy)this.simplyShy(div);
		this.firstChild = div;
		divfloat.append(div);
		$(this.element).append(divfloat);
		$(this.element).append(divclear);
	};
	this.drawForm = function() {
		var y = this.height;
		var inc=0;
		while (y > 0) {
			this.y=parseFloat(y, 10)
			var widthLeft = jQuery.map([this], this.functionLeft);
			var widthRight = jQuery.map([this],  this.functionRight);
			this.makeDivs(widthLeft, widthRight);
			y -= this.lineHeight;
			inc++;
		}
		;
	};
	this.makeDivs = function(widthLeft, widthRight) {
		var debugcolor="";
		if(this.debug)debugcolor="black";	
		if(this.backgroundcolor)debugcolor=this.backgroundcolor;	
		$(this.firstChild).before( $("<div></div>").css( {
			'background' : debugcolor, 											
			'float': 'left',
			'width' : widthLeft+"px",
			'height': this.lineHeight+"px"
		}).addClass("floatLeft"));
		$(this.firstChild).before( $("<div></div>").css( {
			'background' : debugcolor, 											
			'float':'right',
			'width': widthRight+"px",
			'height': this.lineHeight+"px"
		}).addClass("floatRight"));
		$(this.firstChild).before( $("<div></div>").css( {
			'clear':'both'
		}));
	};
	this.pregReplace = function(pattern, replacement, subject, limit) {
		// parameter limit is optional (default value is -1)
		// paramater pattern is a string type
		// ex: pregReplace("/Hello/i","Hi",strtoreplace)
		if (typeof limit == "undefined")
			limit = -1;
		if (subject.match(eval(pattern))) {
			if (limit == -1) { // no limit
				return subject.replace(eval(pattern + "g"), replacement);
			} else {
				for (x = 0; x < limit; x++) {
					subject = subject.replace(eval(pattern), replacement);
				}
				return subject;
			}
		} else {
			return subject;
		}
	};
	this.diamond = function(obj){
		
		var y=(obj.height-obj.y)/obj.height
		if(obj.y>obj.height/2)
			return obj.width/2-y*obj.width
		else
			return y*obj.width-obj.width/2
	};
	this.trapeze = function(obj){
		var y=(obj.height-obj.y)/obj.height
		return (1-y)*obj.width/4;
	};
	this.trianglebottom = function(obj){
		var y=(obj.height-obj.y)/obj.height
		return y*obj.width/2;
	};
	this.triangletop = function(obj){
		var y=(obj.height-obj.y)/obj.height
		return (1-y)*obj.width/2;
	};	
	this.fir = function(obj) {
		var y = (obj.y - obj.height) * -1;
		var coeff = obj.height * 10 / 100;
		var etape = y % coeff;
		if (y >= 0 && y < 10 / 100 * obj.height) {
			return 50 / 100 * obj.width - (y) * (y) / 2 / (coeff);
		}
		if (y >= 10 / 100 * obj.height && y < 20 / 100 * obj.height) {
			return 47 / 100 * obj.width - (y - 10 / 100 * obj.width)
					* (y - 10 / 100 * obj.width) / (coeff);
		}
		if (y >= 10 / 100 * obj.height && y < 35 / 100 * obj.height) {
			return 40 / 100 * obj.width - (y - 20 / 100 * obj.width)
					* (y - 20 / 100 * obj.width) / (coeff * 2);
		}
		if (y >= 35 / 100 * obj.height && y < 55 / 100 * obj.height) {
			return 35 / 100 * obj.width - (y - 35 / 100 * obj.width)
					* (y - 35 / 100 * obj.width) / (coeff * 2);
		}
		if (y >= 55 / 100 * obj.height && y < 80 / 100 * obj.height) {
			return 30 / 100 * obj.width - (y - 50 / 100 * obj.width)
					* (y - 50 / 100 * obj.width) / (coeff * 2.7);
		}
		if (y >= 80 / 100 * obj.height) {
			return 40 / 100 * obj.width;
		}
	}
	this.circle = function(obj) {
		//alert("circle"+y)
		var r = Math.min(obj.height, obj.width) / 2;
		var cx = obj.width / 2;
		var cy = obj.height / 2;
		if(obj.y>=(cy+r) || obj.y<(cy-r))return obj.width/2;
		var result = Math.abs(Math.round(cx
				- Math.sqrt(
							Math.abs(
									 Math.pow(r, 2) - Math.pow(obj.y - cy, 2)
									 )
							)
				));
		return result;
		// return (x - a)² + (y - b)² = r²
	}
	this.simplyShy = function(element) {
		var replacements = "$1\u00ad$2";
		var patterns = "/\([aeiéèäâêïöouyAEIOUY][bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]\)\([bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]\)/";
		element.text(this.pregReplace(patterns, replacements, element
				.text()));
		patterns = "/\([aeiéèäâêïöouyAEIOUY]\)\([bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ][aeiéèäâêïöouyAEIOUY]\)/";
		element.text(this.pregReplace(patterns, replacements, element
				.text()));
		patterns = "/\([aeiéèäâêïöouyAEIOUY]\)\([aeiéèäâêïöouyAEIOUY]\)/";
		element.text(this.pregReplace(patterns, replacements, element
				.text()));
	};
	this.initialize(element, options);
}

TextMorph.prototype.setOptions = function(options){
	for (var option in options){
		if(typeof options[option]!="function"){
			eval ("this.options."+option+" = '"+options[option]+"'");
		}else{
			if(option=="functionLeft")
				this.options.functionLeft=options[option]
			if(option=="functionRight")
				this.options.functionRight=options[option]
			if(option=="functions")
				this.options.functions=options[option]
		}
	}
};
