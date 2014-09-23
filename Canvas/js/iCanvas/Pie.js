define(['iChart'], function(iChart) {
	"use strict";

	var Pie = iChart.extend({

		init: function(data, config, context) {
			if (arguments.length === 2) {
				context = config;
				config = {};
			}
			this._super(context);
			this.data = data;
			this.config = config;
			this.type = 'Pie';
			
		}

	});

	return Pie;

});