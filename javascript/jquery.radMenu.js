/*
 * jQuery radial menu -- Lucas Flatter, using Jonah Fox's path animation code
 * version 0.0.1
 */
/*
	$('.radialMenu').makeRadial(50,150); 
*/

(function( $ ){

$.fn.makeRadial = function(itemSize, radius) {
	
	var $menuItem = this.find('li'); 
	
	var size = itemSize; 
	var BorderRadius = size/2; 
	
	this.css('position','relative'); 
	$($menuItem).css('list-style-type', 'none')
				.css('display', 'block')
				  .css('width', ""+size)
				  .css('height', ""+size)
				  .css('border-radius',""+BorderRadius+"px")
				  .css('position','absolute')
				  .css('left','0px')
				  .css('top','0px'); 
	
	var i = 0; 
	$.each($($menuItem), function() {
	
		$(this).addClass('menuItem'); 
		
		if(i > 0)
		{
			$(this).css('top' ,'0px');
		}
		else
		{
			$(this).css('z-index','200')
				   .addClass('headItem');
				   
		}
		i++; 
	}); 
	
	$.each($('.menuItem a'), function() {
		$(this).css('position','absolute'); 
		$(this).css('top',''+ BorderRadius -$(this).height()/2 + 'px'); 
		$(this).css('left',''+ BorderRadius - $(this).width()/2 + 'px');  
	}); 
	
	
	var angle = (360/ (i-1)); 
	i = 0; 
	var clicked = false; 
	$('.headItem a').click(function(event){
		
		event.preventDefault(); 
		$.each($('.menuItem'), function(event) {
			if(!$(this).hasClass('headItem') && !clicked)
				{
				var bezier_params = {
					start: { 
					  x: 0, 
					  y: 0, 
					  angle: 300
					},  
					end: { 
					  x: radius * Math.cos(i *angle*(Math.PI /180)),
					  y: radius * Math.sin(i*angle*(Math.PI /180)), 
					  angle: -550, 
					  length: 0.55
					}
				 }
				
				$(this).animate({path : new $.path.bezier(bezier_params)},500);
				i++; 
			}
			
			else if(!$(this).hasClass('headItem') && clicked)
			{
				var bezier_params = {
					start: { 
					  x: radius * Math.cos(i *angle*(Math.PI /180)),
					  y: radius * Math.sin(i*angle*(Math.PI /180)), 
					  angle: 800
					},  
					end: { 
					  x: 0,
					  y: 0, 
					  angle: -550, 
					  length: 0.55
					}
				 }
				
				$(this).animate({path : new $.path.bezier(bezier_params)},500);
				i++; 
			}
			
		});
		
		if(clicked){clicked = false; }
		else clicked = true; 
	}); 
	i= 0; 
	
	};
})(jQuery); 