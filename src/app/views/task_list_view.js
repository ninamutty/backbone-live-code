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

export default TaskListView;
