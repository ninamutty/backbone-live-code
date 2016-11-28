import $ from 'jquery';    // Letting us use jquery within this document
import Backbone from 'backbone'; // importing backbone
import _ from 'underscore'; // underscore library - works a lot like erb
import TaskView from 'app/views/task_view';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Store a the full list of tasks
    this.taskData = options.taskData;

    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // Create a TaskView for each task
    this.cardList = [];
    this.taskData.forEach(function(task) {
      var card = new TaskView({
        task: task,
        template: this.taskTemplate
      });
      this.cardList.push(card);
    }, this);

    // Keep track of our form input fields
    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };
  },


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
  },

  events: {
    // format is ====>  "event css-selector": 'functionName'
    'submit .new-task': 'createTask', // Want this to be sumbit and reference the form so we can access the input information 
    'click .clear-button': 'clearInput'
  },

  clearInput: function(event) {
    this.input.title.val('');
    this.input.description.val('');
  },

  createTask: function(event) {
    // event.preventDefault();
    // console.log("createTask called");

    // Normally a form submission will refresh the page.
    // Suppress that behavior.
    event.preventDefault();

    // Get the input data from the form and turn it into a task
    var task = this.getInput();

    // Add the new task to our list of tasks
    this.taskData.push(task);

    // Create a card for the new task, and add it to our card list
    var card = new TaskView({
      task: task,
      template: this.taskTemplate
    });
    this.cardList.push(card);

    // Re-render the whole list, now including the new card
    this.render();

    // Clear the input form so the user can add another task
    this.clearInput();
  },

  // Build a task from the data entered in the .new-task form
  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  }
});

export default TaskListView;
