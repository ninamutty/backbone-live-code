import $ from 'jquery';    // Letting us use jquery within this document
import Backbone from 'backbone'; // importing backbone
import _ from 'underscore'; // underscore library - works a lot like erb
import TaskListView from 'app/views/task_list_view';
import TaskList from 'app/collections/task_list';


var taskData = [
  {
    title: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon',
    complete: true
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer'
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???'
  }, {
    title: 'Get Groceries',
    description: 'I want cheese'
  }
]; // Creating an array of objects to start with (we don't have a database)


$(document).ready(function() {
  var taskList = new TaskList(taskData);

  var application = new TaskListView({
    el: $('#application'),
    model: taskList
  });
  application.render();
});









////////// Pre-Application-View ////////////

// $(document).ready(function() {
//   var taskTemplate = _.template($('#task-template').html()); //creating a task template and passing it the jquery object
//   // var generatedHTML = taskTemplate({task: taskData[0]}); /// One task
//
//   var taskListElement = $('.task-list');
//   var cardList = [];
//   taskData.forEach(function(task) {
//     var card = new TaskView({
//       task: task,
//       template: taskTemplate
//     });
//     cardList.push(card);
//     taskListElement.append(card.render().$el);
//   });
// });





//////////// Pre-Template ////////////
// $(document).ready(function() {
//   var taskListElement = $('.task-list'); // Setting a new variable to the js object (the ul we set)
//   var cardList = []
//   taskData.forEach(function(task) {
//       var card = new TaskView({task: task});
//       cardList.push(card);
//       taskListElement.append(card.render().$el); // appending the list with the new card view
//   });
// });
