import Task from 'app/models/task';
import Backbone from 'backbone';

var TaskList = Backbone.Collection.extend({
  model: Task //the type of models this collection can hold (this can only hold tasks)
});


export default TaskList;
