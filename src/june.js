import moment from 'moment';

import $ from 'jquery';
import dt from 'datatables';

import 'datatables.net-plugins/sorting/datetime-moment.js';


const data = require('./json/june.json');

$(document).ready(function() {

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
            { "data": "USCISnotifiedDate" }
        ]
    } );

});