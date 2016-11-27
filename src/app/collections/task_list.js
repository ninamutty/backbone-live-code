import _ from 'underscore';
import Backbone from 'backbone';
import 'backbone-localstorage';

import Task from 'app/models/task';

var TaskList = Backbone.Collection.extend({
  model: Task,
  localStorage: true
});

export default TaskList;
