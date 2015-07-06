function dataSeries(func, start, end) {
		var res = [];
		for (var i = start; i < end; i++) {
			res.push([i, func(i)]);
		}
		return res;		 
	}

function makeDS (argument) {
	var ds = [];
	for (var i = 0; i < 25; i++) {
		ds.push({
			label: 'Test' + i,
			data: dataSeries(function(c, j) { return c * 220 + j * 10;}.bind(null, i), 0, 500)
		});

	}
	return ds;
}

function makeChart (selector, data) {
	var ph = $(selector);
	$(ph.parent()).resizable({
		maxWidth: 900,
		maxHeight: 500,
		minWidth: 450,
		minHeight: 250
	});

	$.plot(ph, data, 
	{
		legend: {
			show: true,
			noColumns: 2,
			margin: [0, 0]
		},
		zoom: {
			interactive: true
		},
		pan: {
			interactive: true
		},
		grid: {
			hoverable: true
		}

	});		

	ph.bind("plothover", function (event, pos, item) {
		if (item) {
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);

				$("#tooltip").html(item.series.label + " of " + x + " = " + y)
					.css({top: item.pageY+5, left: item.pageX+5})
					.fadeIn(200);
			} else {
				$("#tooltip").hide();
			}
	});	
}

$(function() {
	
	$("<div id='tooltip'></div>").css({
		position: "absolute",
		display: "none",
		border: "1px solid #fdd",
		padding: "2px",
		"background-color": "#fee",
		opacity: 0.80
	}).appendTo("body");

	
});