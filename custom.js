$(document).ready(function() {

	var color = Chart.helpers.color;

	// Initiate the datatable    
    $('#entire-table').DataTable( {
        data: data,
        "columns": [
            { "data": "enlistment" },
            { "data": "ciResult" },
            { "data": "g1Review" },
            { "data": "uscis" }
        ]
    } );

    data = data.map(function(obj){
    	obj.g1Review = obj.g1Review.toLowerCase();
    	return obj
    })


	// Pie Chart
    var waiting = _.filter(data, ['g1Review', '']),
    	suitable = _.filter(data, ['g1Review', 'suitable']),
		unsuitable = _.filter(data, ['g1Review', 'unsuitable']),
    	pending = _.filter(data, ['g1Review', 'pending']);
    	nonApp = _.filter(data, ['g1Review', 'n/a']);

	var pieConfig = {
		type: 'pie',
		data: {
			datasets: [{
				data: [
					waiting.length,
					suitable.length,
					unsuitable.length,
					pending.length,
					nonApp.length,
				],
				backgroundColor: [
					window.chartColors.yellow,
					window.chartColors.green,
					window.chartColors.red,
					window.chartColors.orange,
					window.chartColors.blue,
				],
				label: 'Status Report'
			}],
			labels: [
				'Waiting',
				'Suitable',
				'Unsuitable',
				'Pending',
				'N/A',
			]
		},
		options: {
			responsive: true
		}
	};

	// Horizontal Bar

    var jan = _.filter(data, function(obj){
    	return moment(obj.uscis, 'M-D-YYYY').month() === 0;
    });
    var feb = _.filter(data, function(obj){
    	return moment(obj.uscis, 'M-D-YYYY').month() === 1;
    });
    var mar = _.filter(data, function(obj){
    	return moment(obj.uscis, 'M-D-YYYY').month() === 2;
    });
    var apr = _.filter(data, function(obj){
    	return moment(obj.uscis, 'M-D-YYYY').month() === 3;
    });
    var may = _.filter(data, function(obj){
    	return moment(obj.uscis, 'M-D-YYYY').month() === 4;
    });

	var horizontalBarChartData = {
		labels: ['January', 'February', 'March', 'April', 'May'],
		datasets: [{
			label: 'Dataset',
			backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
			borderColor: window.chartColors.red,
			borderWidth: 1,
			data: [
				jan.length,
				feb.length,
				mar.length,
				apr.length,
				may.length,
			]
		}]

	};


	var ctxPie = document.getElementById('chart-area').getContext('2d');
	var myPie = new Chart(ctxPie, pieConfig);

	var ctx = document.getElementById('canvas').getContext('2d');
	var myHorizontalBar = new Chart(ctx, {
		type: 'horizontalBar',
		data: horizontalBarChartData,
		options: {
			// Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide
			elements: {
				rectangle: {
					borderWidth: 2,
				}
			},
			responsive: true,
			legend: {
				position: 'right',
			},
			title: {
				display: true,
				text: 'USCIS Notified on Final Suitability by Month'
			}
		}
	});




});