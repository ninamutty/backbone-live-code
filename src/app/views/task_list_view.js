import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import TaskView from 'app/views/task_view';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Store a reference to the full list of tasks
    this.taskData = options.taskData;

    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Note that we do not need to save el. Because el
    // is a backbone thing, it copies it for us.

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // Keep track of our form input fields
    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };

    // Create a TaskView for each task
    this.taskViews = [];
    this.taskData.forEach(function(task) {
      var taskView = new TaskView({
        task: task,
        template: this.taskTemplate
      });
      this.taskViews.push(taskView);
    }, this);
  },

  render: function() {
    // Make sure the list in the DOM is empty
    // before we start appending items
    this.listElement.empty();

    // Loop through the data assigned to this view
    this.taskViews.forEach(function(taskView) {
      // Cause the task to render
      taskView.render();

      // Add that HTML to our task list
      this.listElement.append(taskView.$el);
    }, this);
  },

  events: {
    // Submit events are triggered by forms when the
    // submit button is clicked or the enter key pressed
    'submit .new-task': 'addTask',
    'click .clear-button': 'clearInput'
  },

  // Event handler for adding a new task
  // Note: backbone event handlers are bound to the view,
  // so unlike what we did last week `this` refers to the
  // view, not the element that triggered the event.
  // To get the triggering element, use `event.target`
  addTask: function(event) {
    // Normally a form submission will refresh the page.
    // Suppress that behavior.
    event.preventDefault();

    // Consume the form data
    var task = this.getInput();

    // Add the new task to our raw data
    this.taskData.push(task);

    // Build a view for our new task
    var taskView = new TaskView({
      task: task,
      template: this.taskTemplate
    });
    this.taskViews.push(taskView);

    // Since the list has changed, we'll need to re-render
    this.render();

    // With the new task safely added to the list, we can
    // clear out the input form, to make it easy to add
    // even more tasks
    this.clearInput();
  },

  // Build a task from the data entered in the .new-task form
  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  },

  // Clear the .new-task form
  clearInput: function() {
    this.input.title.val('');
    this.input.description.val('');
  }
});

export default TaskListView;
