import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

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

var TaskView = Backbone.View.extend({
  // initialize() will be called automatically
  // when the view is first created.
  initialize: function(options) {
    // Because the template can be reused, it makes sense
    // to share one between all our views.
    this.template = options.template;

    // For now this view is wrapped around a regular old
    // JavaScript object.
    this.task = options.task;
  },

  // render() should be in charge of changing the
  // HTML managed by this view.
  // For now we'll be calling it manually, but later
  // we'll set up Backbone to call it for us.
  //
  // Note that when the element managed by the view
  // has been attached to the DOM, if we change the
  // view's data the page will update as soon as we
  // call render() again.
  render: function() {
    // Use the task template to build some HTML, and
    // add it to our DOM object
    this.$el.html(this.template({task: this.task}));

    // Enable chained calls
    return this;
  }
});

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
  }
});

$(document).ready(function() {
  var taskListView = new TaskListView({
    el: $('#application'),
    taskData: taskData
  });
  taskListView.render();
});
