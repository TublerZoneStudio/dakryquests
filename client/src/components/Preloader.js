import React from 'react'
import $ from 'jquery'

export const Preloader = () => {
	
	$(document).ready(function() {
 
		setTimeout(function(){
			$('body').addClass('loaded');
			$('.loader').addClass('loaded-logo');
		}, 3000);
	 
	});
	
	return(
		<div id="loader-wrapper">
			<div id="loader"><h1>DQ</h1></div>
		 
			<div className="loader-section section-left"></div>
			<div className="loader-section section-right"></div>
		 
		</div>
	)
}