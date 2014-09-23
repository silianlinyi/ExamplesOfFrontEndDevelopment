require.config({
	baseUrl: "js/",
	paths: {
		"iCanvas": "iCanvas/iCanvas",
		"iChart": "iCanvas/iChart",
		"Pie": "iCanvas/Pie"
	}
});

require([
	'Pie'
], function(Pie) {

	var pieData = [{
		value: 30,
		color: "#F38630"
	}, {
		value: 50,
		color: "#E0E4CC"
	}, {
		value: 100,
		color: "#69D2E7"
	}];

	var ctx = document.getElementById("chart-area").getContext("2d");
	window.myPie = new Pie(pieData, ctx);

});