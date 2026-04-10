import { useState, useEffect } from 'react';
import './App.css';

// const API_URL = 'http://localhost:5000/tasks';
const API_URL='https://task-manager-three-henna.vercel.app/tasks';

function App() {
  const [tasks, setTasks] = useState([]); 
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (err) {
      setError('Error adding task');
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t));
    } catch (err) {
      setError('Error updating task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Error deleting task');
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <form className="form" onSubmit={addTask}>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter a task..." 
        />
        <button className="add-btn" type="submit">Add Task</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'done' : ''}`}>
            <span 
              className={`task-text ${task.completed ? 'completed' : ''}`}
              onClick={() => toggleComplete(task.id, task.completed)}
            >
              {task.title}
            </span>
            <button className="del-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;