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

$(document).ready(function() {
  // Compile a template for our tasks.
  // The template only needs to be generated once,
  // but the source lives in the document.
  var taskTemplate = _.template($('#task-template').html());

  // Loop through our sample data
  taskData.forEach(function(task) {
    // Use our template to build some HTML
    var taskView = new TaskView({
      task: task,
      template: taskTemplate
    });

    // Cause the task to render
    taskView.render();

    // Add that HTML to our task list
    $('#task-list').append(taskView.$el);
  });
});
