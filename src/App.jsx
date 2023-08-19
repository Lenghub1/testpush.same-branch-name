import React, { useEffect, useState } from 'react';
import './App.css';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';

function App() {
  const [completedScreen, setCompletedScreen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // Filter tasks based on the search query
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.id.toString().includes(searchQuery)
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const addTask = (title, description) => {
    const newTask = { id: Date.now(), title, description, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const updateTask = (taskId, newTitle, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='App'>
      <h1>My Todos</h1>
      <div className='Todo-wrapper'>
        <TodoInput addTask={addTask} />
        <div className='btn-area'>
          <div className='btn'>
            <button
              className={`secondarybtn ${completedScreen === false && 'active'}`}
              onClick={() => setCompletedScreen(false)}
           >
             Todo
           </button>
           <button
             className={`secondarybtn ${completedScreen === true && 'active'}`}
             onClick={() => setCompletedScreen(true)}
           >
             Completed
            </button>
          </div>
          <div className='search-container'>
          <input
            type='text'
            placeholder='Search Title'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button><i class="fa-solid fa-magnifying-glass"></i> </button>
        </div>
        </div>
        
        <TodoList
          tasks={filteredTasks}
          completedScreen={completedScreen}
          toggleTaskCompletion={toggleTaskCompletion}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

export default App;
