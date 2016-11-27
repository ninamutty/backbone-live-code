import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Task from 'app/models/task';
// import TaskList from 'app/models/task_list';
import TaskView from 'app/views/task_view';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Note that we do not need to save el or model. Because
    // these are backbone things, it copies them for us.

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // Keep track of our form input fields
    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };

    // Create a TaskView for each task
    this.taskViews = [];
    this.model.forEach(function(task) {
      var taskView = new TaskView({
        model: task,
        template: this.taskTemplate
      });
      this.taskViews.push(taskView);
    }, this);

    // Whenever the model changes, we should re-render
    // Since our model is a collection, a change means a task
    // was added to or removed from the list.
    this.listenTo(this.model, 'update', this.render);
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

    // Create a new model from the form data
    var task = new Task(this.getInput());

    // Create a view around the task and add it to our list
    var taskView = new TaskView({
      model: task,
      template: this.taskTemplate
    });
    this.taskViews.push(taskView);

    // Add the task itself to the collection. This will trigger
    // the collection's change event, which will call render
    // for us (remember that we set this up in initialize).
    this.model.add(task);

    // We could have said something like
    //   var task = this.model.add(this.getInput());
    //   var taskView = new TaskView({
    //     model: task,
    //     template: this.template
    //   });
    // However, the collection's change event triggers as soon
    // as the model is added, and our render function requires
    // that we have the view constructed first.

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
