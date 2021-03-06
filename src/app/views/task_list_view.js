import $ from 'jquery';    // Letting us use jquery within this document
import Backbone from 'backbone'; // importing backbone
import _ from 'underscore'; // underscore library - works a lot like erb

import Task from 'app/models/task';
import TaskView from 'app/views/task_view';
import TaskList from 'app/collections/task_list';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Store a the full list of tasks
    // this.taskData = options.taskData; //// DON'T NEED THIS NO MORE

    this.modelList = [];

    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // Create a TaskView for each task
    this.cardList = [];

    this.model.forEach(function(task) {
      this.addTask(task);
    }, this);

    // Keep track of our form input fields
    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };

    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.model, 'add', this.addTask); //this gives a new view to go along with the new model
    this.listenTo(this.model, 'remove', this.removeTask);
  }, // end initialize


  render: function() {
    // Make sure the list in the DOM is empty
    // before we start appending items
    this.listElement.empty();

    // Loop through the data assigned to this view
    this.cardList.forEach(function(card) {
      // Cause the task to render
      card.render();

      // Add that HTML to our task list
      this.listElement.append(card.$el);
    }, this);

    return this; // enable chained calls
  }, // end render

  events: {
    // format is ====>  "event css-selector": 'functionName'
    'submit .new-task': 'createTask', // Want this to be sumbit and reference the form so we can access the input information
    'click .clear-button': 'clearInput'
  }, // end events

  clearInput: function(event) {
    this.input.title.val('');
    this.input.description.val('');
  }, // end clearInput

  createTask: function(event) {
    // Normally a form submission will refresh the page.
    // Suppress that behavior.
    event.preventDefault();

    // Get the input data from the form and turn it into a task
    var task = new Task(this.getInput());

    // Add the new task to our list of tasks
    this.model.add(task);

    // Clear the input form so the user can add another task
    this.clearInput();
  }, // end clearInput

  removeTask: function(model) {
    var filteredList = [];
    for(var i = 0; i < this.cardList.length; i++) {
      if (this.cardList[i].model == model) {
        console.log("found the bugger");
      } else {
        filteredList.push(this.cardList[i]);
      }
    }
    this.cardList = filteredList;
  },

  // Build a task from the data entered in the .new-task form
  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  }, // end getInput

  addTask: function(task) {
    var card = new TaskView({
      model: task,
      template: this.taskTemplate
    });
    this.cardList.push(card);
  }
});

export default TaskListView;
