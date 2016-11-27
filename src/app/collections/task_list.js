import Backbone from 'backbone';

import Task from 'app/models/task';

var TaskList = Backbone.Collection.extend({
  model: Task
});

export default TaskList;
