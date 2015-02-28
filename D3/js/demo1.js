var svg = d3.select('#container')
	.append('svg')
	.attr('width', 600)
	.attr('height', 400);

var g = d3.select('svg')
	.append('g')
	.attr('transform', 'translate(50,50)');

d3.select('g')