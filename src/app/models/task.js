import Backbone from 'backbone';
//task.js

var Task = Backbone.Model.extend({
  defaults: {
    title: 'Stand In Title',
    description: 'PLaceholder Description',
    complete: false // Not totally necessary because in JS undefined is falsey
  },

  initialize: function(options) {
    console.log(">>>> Task Created with: " + this.get("title")); // .get just gets one attribute (where .toJSON() gets all the attributes in json format) - also: this.set("description", "JavaScript is AWESOME") **** handy for an optional part of roladex if you want to an update value *** also unset which makes it undefined
  }

});



export default Task;
