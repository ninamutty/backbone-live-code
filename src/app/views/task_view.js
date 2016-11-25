import Backbone from 'backbone';

var TaskView = Backbone.View.extend({
  // initialize() will be called automatically
  // when the view is first created.
  initialize: function(options) {
    // Because the template can be reused, it makes sense
    // to share one between all our views.
    this.template = options.template;

    // Listen to our model, and re-render whenever it
    // changes. Note the `.bind(this)`, which sets up the
    // callback to be called with the correct context,
    // i.e. the view.
    this.model.bind('change', this.render.bind(this));
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
    this.$el.html(this.template({task: this.model.attributes}));

    // Enable chained calls
    return this;
  },

  events: {
    "click .complete-button": "toggleComplete"
  },

  // This wrapper is a bit of a bummer, but it's a must.
  // Backbone view events must be handled by a function
  // in that view.
  toggleComplete: function() {
    this.model.toggleComplete();

    // Notice that we don't need to call render. By watching
    // the model for changes, we get this functionality for
    // free! Very nice when you've got many ways to mess
    // with a model.
  }
});

export default TaskView;
