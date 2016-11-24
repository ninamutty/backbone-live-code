import $ from 'jquery';

var taskData = [
  {
    title: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon',
    assignedTo: ['Kari', 'Charles']
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer',
    assignedTo: ['Dan', 'Jamie', 'Chris']
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???',
    assignedTo: ['Crystal']
  }
];

$(document).ready(function() {
  $('#test-area').append($('<p>Hello World!</p>'));
});
