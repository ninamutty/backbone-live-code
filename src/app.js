import $ from 'jquery';
import _ from 'underscore';

var taskData = [
  {
    title: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon'
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer'
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???'
  }
];

$(document).ready(function() {
  // Compile a template for our tasks.
  // The template only needs to be generated once,
  // but the source lives in the document.
  var taskTemplate = _.template($('#task-template').html());

  // Loop through our sample data
  taskData.forEach(function(task) {
    // Use our template to build some HTML
    var entry = taskTemplate({task: task});

    // Add that HTML to our task list
    $('#task-list').append($(entry));
  });
});
