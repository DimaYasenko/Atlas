'use strict';

import React from 'react/addons';
import {FlatButton, Paper, Toolbar, ToolbarGroup, 
		ToolbarTitle, FontIcon, RaisedButton, IconButton,
		DropDownMenu, ActionGrade} from 'material-ui';

// var $ = require('jquery');
// require("script!./jquery.flot.min.js");

require('styles/AtlasPivot.css');


$(function() {
	
	$("<div id='tooltip'></div>").css({
		position: "absolute",
		display: "none",
		overflow: 'visible',
		border: "1px solid #fdd",
		padding: "2px",
		"background-color": "#fee",
		opacity: 0.80
	}).appendTo("body");

	
});


var LineChart = React.createClass({
	getInitialState: function() {
		return {
			isFull: false
		};
	},
 	getDefaultProps: function() {
	    return {
	      width: 400,
	      height: 400,
	      title: 'Title',
	      xLabel: 'x',
	      yLabel: 'y'
	    };
	},

	componentDidMount: function() {
		var placeholder = this.getDOMNode(this.refs.root);

		// Событие об изменениии режима
		placeholder.addEventListener("webkitfullscreenchange", this.OnFullscreenChange);
		placeholder.addEventListener("mozfullscreenchange",    this.OnFullscreenChange);
		placeholder.addEventListener("fullscreenchange",       this.OnFullscreenChange);
		this.redrawPlot();
	},
	componentWillUnmount: function() {
	    // Clean up work here.
  	},
	render: function() {
		var filterOptions = [
		  { payload: '1', text: 'All Broadcasts' },
		  { payload: '2', text: 'All Voice' },
		  { payload: '3', text: 'All Text' },
		  { payload: '4', text: 'Complete Voice' },
		  { payload: '5', text: 'Complete Text' },
		  { payload: '6', text: 'Active Voice' },
		  { payload: '7', text: 'Active Text' },
		];


	    return (
	    	<Paper zDepth={3} ref="root"  style={{ width: this.props.width, height: this.props.height}}>
		    	<Toolbar>
					<ToolbarGroup key={0} float="left">
					    <ToolbarTitle text={this.props.title}/>
					     
					    <FontIcon className="mui-icon-sort" />
				    </ToolbarGroup>

				    <ToolbarGroup key={1} float="right">
					    					    
					    <FontIcon className="material-icons" onClick={this.onClick}>
					    	<i className="material-icons">aspect_ratio</i>
					    </FontIcon >

					    <FontIcon className="material-icons" onClick={this.onSaveImage}>
					    	<i className="material-icons">photo_camera</i>
					    </FontIcon >


						    <FontIcon onClick={this.onChangeFullState} className="material-icons">
						    	<i className="material-icons">{this.state.isFull? 'fullscreen_exit': 'fullscreen'}</i>
						    </FontIcon >

					     
				    </ToolbarGroup>
		    	</Toolbar>
	    	
    			<div ref="test" style={{  height: "calc(100% - 100px)"}}></div>
	    	</Paper>

	    );
	},
	redrawPlot: function() {
		var placeholder = this.getDOMNode(this.refs.root).children[1];
			  
	    this.plot = $.plot(placeholder, this.props.data ||  [[[0, 0], [100, 100]]], 
		{
			canvasLegend: true,
			axisLabels: {
	            show: true	            
	        },
	         xaxes: [{
	            axisLabel: this.props.xLabel,
	            axisLabelUseCanvas: true
	        }],
	        yaxes: [{
	        	axisLabel: this.props.yLabel,
	            axisLabelUseCanvas: true	        	
	        }],
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

		$(placeholder).bind("plothover", function (event, pos, item) {
			if (item) {
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);

					$("#tooltip").html("(" + x + ", " + y + ")")
						.css({top: item.pageY + 5, left: item.pageX + 5})
						.fadeIn(200);
				} else {
					$("#tooltip")
					.hide();
				}
		});	

	},
	onClick: function() {
		this.redrawPlot();
	},
	OnFullscreenChange: function() {
		// alert('Done');
		var placeholder = this.getDOMNode(this.refs.root);		

		var fullscreenElement = 
			document.fullscreenElement || 
			document.mozFullscreenElement || 
			document.webkitFullscreenElement;
			var fullscreenEnabled = 
			document.fullscreenEnabled || 
			document.mozFullscreenEnabled || 
			document.webkitFullscreenEnabled;

		if (!fullscreenEnabled) {
			alert('Sorry, you should allow fullscreen mode');
			return;
		}

		var isExpanded = fullscreenElement == placeholder;
		var isCollapsed = !fullscreenElement;
		if (isCollapsed) {
			//Do some magic to allow see tooltips in normal mode
			$("#tooltip")
				.css({
					position: 'absolute'
				})
				.appendTo('body');
				this.setState({ isFull: false});
				
			// setTimeout(function() {
			// 	this.setState({ isFull: false});

			// }.bind(this), 1000)
				
		} else if (isExpanded) {
			//Do some magic to allow see tooltips in fullscreen mode
			$("#tooltip")
				.css({
					position: 'fixed'
				})
				.appendTo(placeholder);
				this.setState({ isFull: true});

				// setTimeout(function () {
				// 	this.setState({ isFull: true});
					
				// }.bind(this), 1000);

		}

	},
	onChangeFullState: function() {
		var placeholder = this.getDOMNode(this.refs.root);		

		if (this.state.isFull) {

			// //Do some magic to allow see tooltips in normal mode
			// $("#tooltip")
			// 	.css({
			// 		position: 'absolute'
			// 	})
			// 	.appendTo('body');

			cancelFullscreen(placeholder);
		} else {

			// //Do some magic to allow see tooltips in fullscreen mode
			// $("#tooltip")
			// 	.css({
			// 		position: 'fixed'
			// 	})
			// 	.appendTo(placeholder);
			launchFullScreen(placeholder);
		}
		// this.setState({isFull: !this.state.isFull});
	},
	onSaveImage: function() {
		var placeholder = this.getDOMNode(this.refs.root).children[1];
			  
	    var plot = this.plot;
		// deleteStaleCanvasImage(plot, mergedCanvas);
        mergedCanvas = mergeCanvases(plot);
        var img = createImageFromCanvas(mergedCanvas, plot, plot.getOptions().imageFormat);
        var url = img.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
		window.open(url);
        // For ubuntu chrome:
        // setTimeout(function () { deleteStaleCanvasImage(plot, mergedCanvas); }, 500);
	}

});


var onfullscreenchange =  function(e){
	var fullscreenElement = 
	document.fullscreenElement || 
	document.mozFullscreenElement || 
	document.webkitFullscreenElement;
	var fullscreenEnabled = 
	document.fullscreenEnabled || 
	document.mozFullscreenEnabled || 
	document.webkitFullscreenEnabled;
	console.log( 'fullscreenEnabled = ' + fullscreenEnabled, ',  fullscreenElement = ', fullscreenElement, ',  e = ', e);
}






//Запустить отображение в полноэкранном режиме
function launchFullScreen(element) {
	if(element.requestFullScreen) {
		element.requestFullScreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}
// Выход из полноэкранного режима
function cancelFullscreen() {
	if(document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}


var imageCreated = null;
var mergedCanvas = null;
var theClasses = null;

function deleteStaleCanvasImage(plot, mergedCanvas) {
        //$(plot.getCanvas()).parent().find("img." + plot.getOptions().imageClassName).unbind("mouseup", onMouseUp).remove();
        $(imageCreated).unbind("mouseup", onMouseUp).remove();
        if (!!mergedCanvas) {
            $(mergedCanvas).remove();
        }
        $(".mergedCanvas").remove();
}
    
function mergeCanvases(plot) {
        
        var theMergedCanvas = plot.getCanvas();

        if (!!theClasses) {
            theMergedCanvas = new theClasses.Canvas("mergedCanvas", plot.getPlaceholder());
            var mergedContext = theMergedCanvas.context;
            var plotCanvas = plot.getCanvas();
            
            theMergedCanvas.element.height = plotCanvas.height;
            theMergedCanvas.element.width = plotCanvas.width;
            
            mergedContext.restore();

            $(theMergedCanvas).css({
                "visibility": "hidden",
                "z-index": "-100",
                "position": "absolute"
            });

            var $canvases = $(plot.getPlaceholder()).find("canvas").not('.mergedCanvas');
            $canvases.each(function(index, canvas) {
                mergedContext.drawImage(canvas, 0, 0);
            });

            return theMergedCanvas.element;
        }

        return theMergedCanvas;
}

function createImageFromCanvas(canvas, plot, format) {
    if (!canvas) {
        canvas = plot.getCanvas();
    }
    
    var img = null;
    switch (format.toLowerCase()) {
        case "png":
            img = Canvas2Image.saveAsPNG(canvas, format);
            break;
        case "bmp":
            img = Canvas2Image.saveAsBMP(canvas, format);
            break;
        case "jpeg":
            img = Canvas2Image.saveAsJPEG(canvas, format);
            break;
        default:
            break;
    }

    if (!img) {
        img = Canvas2Image.saveAsPNG(canvas, "png");
    }

    if (!img) {
        img = Canvas2Image.saveAsPNG(canvas, "bmp");
    }

    if (!img) {
        img = Canvas2Image.saveAsJPEG(canvas, "jpeg");
    }

    if (!img) {
        alert(plot.getOptions().notSupportMessage || "Oh Sorry, but this browser is not capable of creating image files, please use PRINT SCREEN key instead!");
        return false;
    }

    // $(img).attr("class", plot.getOptions().imageClassName);
    // $(img).css({ "border": $(canvas).css("border"), "z-index": "9999", "position": "absolute" });
    // $(img).insertBefore($(canvas));
    // $(img).mouseup(plot, onMouseUp);

    imageCreated = img;
    return img;
}

module.exports = LineChart;