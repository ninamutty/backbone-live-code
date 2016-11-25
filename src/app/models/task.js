import Backbone from 'backbone';

var Task = Backbone.Model.extend({
  defaults: {
    title: "Unknown Task",
    description: "placeholder description",
    complete: false
  },

  // If this task is incomplete, mark it complete. If it's
  // complete, mark it incomplete.
  // Just like in Ruby, the Model is a great place to stuff
  // all your complex business logic.
  toggleComplete: function() {
    var newStatus = !this.get('complete');
    this.set('complete', newStatus);
  }
});

export default Task;
