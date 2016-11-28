
// The first letter is capitalized - creating a backbone view - pass it a single argument - similar to a class, but we're relying on the Backbone.View to setup the structure

var TaskView = Backbone.View.extend({

  // initialize takes in parameters (needs to be in here)
  initialize: function(options) {
    this.task = options.task;
    this.template = options.template;
  },


  // render is another backbone thing
  render: function() {
    var html = this.template({task: this.task})
    this.$el.html(html);

    // Enable chained calls
    return this;
  }
});


export default TaskView;
