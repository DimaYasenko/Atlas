(function ($) {
	var options = {

	};
	
	function init(plot) {
		debugger;
		plot.hooks.drawOverlay.push(function(plot, ctx) {
			console.log(ctx);
			ctx.save();
			ctx.fillStyle = 'black';
			ctx.fillText('Hello world', 100, 100);
			ctx.restore();

		});
	}

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'custom',
        version: '2.0'
    });

})(jQuery);