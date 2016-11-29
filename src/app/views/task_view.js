
// The first letter is capitalized - creating a backbone view - pass it a single argument - similar to a class, but we're relying on the Backbone.View to setup the structure

var TaskView = Backbone.View.extend({

  // initialize takes in parameters (needs to be in here)
  initialize: function(options) {
    // this.task = options.task;
    this.template = options.template;
    this.listenTo(this.model, 'change', this.render); // A backbone thing
  },


  // render is another backbone thing
  render: function() {
    // reconnects the DOM event handlers
    this.delegateEvents();

    var html = this.template({task: this.model.toJSON()}) // OR this.model.attributes  ==>> generally want to avoid .attributes because then you're bypassing any validations or any events - also gives direct access to change the attributes - it's more hacker-y
    this.$el.html(html);

    // Enable chained calls
    return this;
  },

  events: {
    'click .complete-button': 'completeHandler', //can only call our own methods (in the view)
    'click .delete-button': 'deleteTask'
  },

  deleteTask: function() {
    this.model.destroy();
  },

  completeHandler: function() {
    // console.log("Handler run!");
    this.model.toggleComplete();
    //this.render(); //this isn't bad but better to have the model tell the view when something's changed so it can change it - in initialize
  }
});


export default TaskView;
