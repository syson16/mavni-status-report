import moment from 'moment';

import $ from 'jquery';
import dt from 'datatables';

import 'datatables.net-plugins/sorting/datetime-moment.js';

import Chart from 'chart.js';
import _ from 'lodash';

const data = require('./json/oct.json');

$(document).ready(function() {


    // DATATABLES

	$.fn.dataTable.moment('M/D/YY');
    
    // Initiate the datatable    
    $('#entire-table').DataTable( {
        data: data,
        "columns": [
            { "data": "receipt1" },
            // { "data": "interview1" },
            // { "data": "decision1" },
            // { "data": "receipt2" },
            // { "data": "interview2" },
            // { "data": "decision2" },
            // { "data": "decision4" },
            { "data": "completedInterview" },
            { "data": "enlistment" },
            { "data": "CIscreeningResults" },
            { "data": "mssd" },
            { "data": "USCISnotifiedDate" },
            { "data": "suitability" },
            { "data": "dischargeDate" },
            { "data": "dischargeRevoked" }
        ]
    } );


    // CHART.JS

    var color = Chart.helpers.color;

    // Horizontal Bar

    var jan = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 0;
    });
    var feb = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 1;
    });
    var mar = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 2;
    });
    var apr = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 3;
    });
    var may = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 4;
    });
    var june = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 5;
    });
    var july = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 6;
    });
    var aug = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 7;
    });
    var sep = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 8;
    });
    var oct = _.filter(data, function(obj){
        return moment(obj.mssd, 'M/D/YY').month() === 9;
    });
    
    var mssdWaiting = _.filter(data, function(obj){
        return obj.mssd === '';
    });
    var mssdPending = _.filter(data, function(obj){
        return obj.mssd === 'Pending';
    });

    $('#mssd-waiting').html(mssdWaiting.length);
    $('#mssd-pending').html(mssdPending.length);

    var horizontalBarChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
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
                june.length,
                july.length,
                aug.length,
                sep.length,
                oct.length,
            ]
        }]

    };

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
                text: '# of MSSD Completed by Month'
            }
        }
    });

});