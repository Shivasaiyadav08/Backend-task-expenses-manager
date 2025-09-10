import Task from '../models/Task.js';


//Client Request ---> [protect middleware] ---> [Task controller] ---> Response





// Get all tasks
export const getTasks = async (req, res) => {
  // find use to get all the tasks of the user
  //user: req.user._id → links task to the logged-in user.
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Add a new task
export const addTask = async (req, res) => {
  // taking title and des
  const { title, description } = req.body;
  // creating the task and adding to the requested user tasks
  const task = await Task.create({ user: req.user._id, title, description });
  res.status(201).json(task);
};

// Update a task
export const updateTask = async (req, res) => {
  // finding the particular task of the user with id
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
   
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  // saving the tasks
  await task.save();
  res.json(task);
};

// Delete a task
export const deleteTask = async (req, res) => {
  // finding and deleting the task of that user
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.json({ message: 'Task deleted' });
};
