const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// Root route taaki deployment URL pe "Cannot GET /" na aaye
app.get('/', (req, res) => {
  res.status(200).send('Task Manager API is running smoothly!');
});
// In-memory storage for scope control 
// let tasks = [
//   { id: "1", title: "Setup Project", completed: true, createdAt: new Date().toISOString() }
// ];
let tasks = [];
// GET /tasks - Return all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id - Update task status
app.patch('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  task.completed = req.body.completed !== undefined ? req.body.completed : !task.completed;
  res.json(task);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));