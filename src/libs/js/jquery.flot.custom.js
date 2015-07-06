(function ($) {
	var txt = ["test1", "tescvzc2", "sdfadf 3"];

	var options = {
		legendFontSize: 16,
		legendLineHeight: 10,
		legendMarkerSize: 15,
		legendPadding: {
			left: 20,
			top: 10,
			rigth: 10,
			bottom: 10
		}
	};

	function init(plot) {
		
		plot.filteredData = {};

		plot.legendOffset = null;

		plot.hooks.processOptions.push(function(plot, options) {
			console.log(options);
			if (!options.canvasLegend) return;


			plot.hooks.bindEvents.push(function (plot, eventHolder) {
				//TODO: delete
				// var overlayCanvas = $(plot.getCanvas()).parent().find('.flot-overlay');

				var draggable = false;
				eventHolder.get(0).style.cursor = 'wait';
				eventHolder.bind("dragstart", function() {
					draggable = true;
				});
				eventHolder.bind("dragend", function() {
					draggable = false;
				});

				eventHolder.mousemove(function(e) {	

					var index = getHoveredIndex(options, e);
					var len = plot.getData().length;

					var inside = e.offsetX > plot.xpos && e.offsetX < plot.xpos + options.legendMarkerSize;

					if (index >= len || index == -1) {
						inside = false;
					} 

					if (!inside) {

						this.style.cursor = draggable? 'move': 'default';
						return;
					}
					this.style.cursor = 'pointer';

					// console.log("( " + e.offsetX + ", " + e.offsetY + ")" );
					// this.style.cursor = (e.offsetX > xpos && e.offsetX < xpos + options.legendMarkerSize + 5)? 'pointer': 'default';
				});

				eventHolder.click(function (e) {

					var index = getHoveredIndex(options, e);
					var data = plot.getData();

					var xpos = plot.getCanvas().width - plot.legendOffset + options.legendPadding.left;
					var horizontalInside = e.offsetX > plot.xpos && e.offsetX < plot.xpos + options.legendMarkerSize;

					if (index == -1 || index >= data.length || !horizontalInside) return;
					
					if (index in plot.filteredData) {
						data[index].data = plot.filteredData[index];
						delete plot.filteredData[index];
					} else {
						plot.filteredData[index] = data[index].data;
						data[index].data = [];
					}
					
					plot.setData(data);
					plot.draw();
					// $.plot(plot.getPlaceholder(), plot.getData() ,plot.getOptions())

				});

				// end TODO
			});

			options.legend.show = false;
			plot.hooks.draw.push(function(plot, ctx) {

				

			var options = plot.getOptions();

			//Calculate offset first time
			if (plot.legendOffset == null) {

				var labels = plot.getData().map(function(d) { return d.label || '';});

				ctx.save();
				ctx.font = options.legendFontSize + 'px Arial';
				
				var sizes = labels.map(function(item) {
					 var tmp = ctx.measureText(item);
					 return [tmp.width, options.legendFontSize];
				});

				ctx.restore();
				var legendSize = sizes.reduce(function(next, acc) {
					return [Math.max(acc[0], next[0]), acc[1] + next[1]];
				}, [0, 0]);

				legendSize[0] += options.legendPadding.left + options.legendPadding.rigth + options.legendMarkerSize + 5;
				legendSize[1] += options.legendLineHeight * (sizes.length - 1) + options.legendPadding.top + options.legendPadding.bottom;
				plot.legendOffset = legendSize[0];
				plot.draw();
				return;
			}

			//Draw legend
			drawLegend(plot, ctx);

		});

		plot.hooks.processOffset.push(function(plot, offset) {
			if (plot.legendOffset != null) {
				offset.right = plot.legendOffset;
			}
		});

		});
	
		window.getIndex = getIndex.bind(null, options);
		window.getYPos = getYPos.bind(null, options);
		
	}


	function  getHoveredIndex (options, e) {
		var index = options.legendMarkerSize; + options.legendPadding.top;
		
		var low = Math.trunc(getIndex(options, e.offsetY));
		var high =  low + 1;
		// console.log(low + ":" + high);
		var lowPos = getYPos(options, low);
		var highPos = getYPos(options, high);

		// var index =  e.offsetY > lowPos && e.offsetY < (lowPos + options.legendMarkerSize) ? low: 
		// 	((e.offsetY > highPos && e.offsetY < (highPos + options.legendMarkerSize)) ? high: -1);

		var index = -1;

		if (e.offsetY > lowPos - options.legendMarkerSize && e.offsetY < lowPos ) {
			index = low;
		} else  {
			if (e.offsetY < highPos && e.offsetY > (highPos - options.legendMarkerSize)) {
				index = high;
			} 
				
		}

		return index;
	}

	function drawLegend(plot, ctx) {

		var options = plot.getOptions();

		var overlayCanvas = $(plot.getCanvas()).parent().find('.flot-overlay');

		var xpos = plot.getCanvas().width - plot.legendOffset + options.legendPadding.left;
		plot.xpos = xpos;

		ctx.save();
		ctx.font = options.legendFontSize + 'px Arial';

		// overlayCanvas.mousemove(function(e) {
		// 	if (e.offsetX < plot.width()) {
		// 		this.style.cursor = 'default';
		// 		e.preventDefault();
		// 		return;
		// 	}
		// 	this.style.cursor = 'pointer';
		// 	// console.log("( " + e.offsetX + ", " + e.offsetY + ")" );
		// 	// this.style.cursor = (e.offsetX > xpos && e.offsetX < xpos + options.legendMarkerSize + 5)? 'pointer': 'default';
		// });


		plot.getData().forEach(function(d, i) {			

			var ypos =  getYPos(options, i);//options.legendFontSize + options.legendPadding.top + i * (options.legendFontSize + options.legendLineHeight);
			if (i in plot.filteredData)
				ctx.fillStyle = 'gray';
			else 
				ctx.fillStyle =  d.color;

			drawLabelMarker(plot, ctx, xpos , ypos);
			ctx.fillStyle = 'black';
			ctx.fillText(d.label || '', xpos + (options.legendMarkerSize + 5), ypos);
			
			

		});
		ctx.restore();
	}

	function getYPos (options, i) {
		return options.legendFontSize + options.legendPadding.top + i * (options.legendFontSize + options.legendLineHeight);
	}

	function getIndex (options, ypos) {
		return (ypos - options.legendFontSize - options.legendPadding.top) / (options.legendFontSize + options.legendLineHeight);
	}
	function drawLabelMarker(plot, ctx, x, y) {
		var options = plot.getOptions();
		var size = options.legendMarkerSize;
		ctx.fillRect(x, y - (options.legendFontSize / 2)  - (size / 2), size, size);
		ctx.strokeRect(x, y - (options.legendFontSize / 2)  - (size / 2), size, size);

	}
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'custom',
        version: '2.0'
    });

    

})(jQuery);