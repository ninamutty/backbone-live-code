import $ from 'jquery';    // Letting us use jquery within this document
import Backbone from 'backbone'; // importing backbone
import _ from 'underscore'; // underscore library - works a lot like erb

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
  }, {
    title: 'Get Groceries',
    description: 'I want cheese'
  }
]; // Creating an array of objects to start with (we don't have a database)






// The first letter is capitalized - creating a backbone view - pass it a single argument - similar to a class, but we're relying on the Backbone.View to setup the structure
var TaskView = Backbone.View.extend({

  // initialize takes in parameters (needs to be in here)
  initialize: function(options) {
    this.task = options.task;
    this.template = options.template;
  },


  // render is another backbone thing
  render: function() {
    var html = '<li class="task">';
    html += '<h2>' + this.task.title + '</h2>';
    html += '<p>' + this.task.description + '</p>';
    html += '</li>';
    this.$el.html(html);


    // Enable chained calls
    return this;
  }
});



// view instances are created by using the keyword 'new'
// var card = new TaskView();



$(document).ready(function() {
  var taskTemplate = _.template($('#task-template').html()); //creating a task template and passing it the jquery object
  // var generatedHTML = taskTemplate({task: taskData[0]}); /// One task

  var taskListElement = $('.task-list');
  var cardList = [];
  taskData.forEach(function(task) {
    var card = new TaskView({
      task: task,
      template: taskTemplate
    });
    cardList.push(card);
    taskListElement.append(card.render().$el);
  });
});





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
