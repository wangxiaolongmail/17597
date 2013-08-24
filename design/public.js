
	function showTooltips(){
		$('.bubbleInfo').each(function () {
			// options
			var distance = 10;
			var time = 250;
			var hideDelay = 1500;
			var hideDelayTimer = null;
			// tracker
			var beingShown = false;
			var shown = false;
			var trigger = $('.trigger', this);
			var popup = $('.popup', this).css('opacity', 0);
			// set the mouseover and mouseout on both element
			trigger.mouseover(function () {
			  // stops the hide event if we move from the trigger to the popup element
			  if (hideDelayTimer) clearTimeout(hideDelayTimer);
			  // don't trigger the animation again if we're being shown, or already visible
			  if (beingShown || shown) {
				return;
			  } else {
				beingShown = true;
				// reset position of popup box
				$(".popup").each(function(){
					$(this).css({display: 'none'});
				});
				popup.css({
				  top: -150,
				  left: 18,
				  display: 'block' // brings the popup back in to view
				})
				// (we're using chaining on the popup) now animate it's opacity and position
				.animate({
				  top: '-=' + distance + 'px',
				  opacity: 1
				}, time, 'swing', function() {
				  // once the animation is complete, set the tracker variables
				  beingShown = false;
				  shown = true;
				});
			  }
			}).mouseout(function () {
			  // reset the timer if we get fired again - avoids double animations
			  if (hideDelayTimer) clearTimeout(hideDelayTimer);
			  // store the timer so that it can be cleared in the mouseover if required
			  hideDelayTimer = setTimeout(function () {
				hideDelayTimer = null;
				popup.animate({
				  top: '-=' + distance + 'px',
				  opacity: 0
				}, time, 'swing', function () {
				  // once the animate is complete, set the tracker variables
				  shown = false;
				  // hide the popup entirely after the effect (opacity alone doesn't do the job)
				  popup.css('display', 'none');
				});
			  }, hideDelay);
			});
		  });
	}