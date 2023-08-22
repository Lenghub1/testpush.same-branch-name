import React, { useEffect, useState } from 'react';
import './App.css';
import TodoInput from './component/TodoInput/TodoInput';
import TodoList from './component/TodoList/TodoList';

function App() {
  const [completedScreen, setCompletedScreen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  useEffect(() => {
    localStorage.setItem('ITEMS' , JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (title, description) => {
    const newTask = { id: Date.now(), title, description, completed: false };
    setTasks([...tasks, newTask]);
  };
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
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
        <div className='container-todo-list'>
          <div className='btn-area'>
            <div className='btn'>
              <button
                className={`secondarybtn ${completedScreen === false ? 'active' : ''}`}
                onClick={() => setCompletedScreen(false)}
              >
                Todo
              </button>
              <button
                className={`secondarybtn ${completedScreen === true ? 'active' : ''}`}
                onClick={() => setCompletedScreen(true)}
              >
                Completed
              </button>
              
            </div>
          </div>
          <TodoList
            tasks={tasks}
            removeTask={removeTask}
            completedScreen={completedScreen}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTask={updateTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;