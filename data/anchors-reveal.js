'use strict';

/**
 * Important notice : this code should be able to run  in any recent and decent browser.
 * I coded it as strictly independant from Firefox, so you can re-use it
 */

var prefix = 'dascritch---anchors-reveal';
function reBuild() {
	var layout = document.createElement('div');
	layout.id = prefix;
	layout.style = 'position : absolute;'+
			'top : 0px;'+
			'left : 0px;'+
			'margin : 0px;'+
			'padding : 0px;'+
			'border : none;'+
			'width : '+document.body.scrollWidth+'px;'+
			'height : '+document.body.scrollHeight+'px;'+
			'overflow : hidden;'+
			'z-index : 50;'+
			'pointer-events : none;';
  	document.body.appendChild(layout);
  	var style = document.createElement('style');
  	style.scoped = true;
	style.appendChild( document.createTextNode(
			'a  {'+
				'position : absolute ;'+
				'font-family : sans-serif ;'+
				'font-size : 14px ;'+
				'font-weight : bold;'+
				'background : yellow ;'+
				'color : black;'+
				'padding : 4px ;'+
				'border : 1px black solid ;'+
				'opacity : 0.7 ;'+
				'pointer-events : auto;'+
			'}'+
			'a:hover {'+
				'opacity : 1 ;'+
				'color : black;'+
			'}'));
	layout.appendChild(style);

	layout = document.getElementById(prefix);
	var has = false;
	var valid_id = /^[a-zA-Z0-9\-\_]+$/;
	[].forEach.call(document.querySelectorAll('[id]'),
	    function(el) {
	    	if (
	    			(el.id.indexOf(prefix)!==0) // not generated by the addon ?
	    			&& ( valid_id.test(el.id) ) // not malicious ?
	    			&& (!el.hidden) && (el.style.display !== 'none') // visible ?
	    			&& ( (el.clientWidth != 0) && (el.clientHeight != 0 ) ) // really visible ?
	    		) {
				var rect = el.getBoundingClientRect();
				var x = rect.left + window.scrollX;
				var y = rect.top + window.scrollY;
				var tag = document.createElement('a');
				tag.href = '#'+el.id;
				tag.style.left = x+'px';
				tag.style.top = y+'px';
				tag.appendChild( document.createTextNode('#'+el.id) );
	        	layout.appendChild(tag);
	        	has = true;
	        }
		}
	);
	if (!has) {
		window.alert('Unnamed puppy : Not a single ID element in this page. Bad dog, no biscuit.');
	}
}

function destroy() {
	document.body.removeChild(document.getElementById(prefix));
}

if (document.getElementById(prefix) === null) {
	reBuild();
} else {
	destroy();
}

window.addEventListener( 'resize', destroy ,false);