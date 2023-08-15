import React, { useEffect, useState } from 'react';
import './App.css';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList'

function App() {
  const [completedScreen, setCompletedScreen] = useState(false);
  const [tasks, setTasks] = useState([]);

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

    const editTask = (taskId, editedTitle, editedDescription) => {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: editedTitle, description: editedDescription }
          : task
      );
      setTasks(updatedTasks);
    };
  };

  return (
    <div className='App'>
      <h1>My Todos</h1>
      <div className='Todo-wrapper'>
        <TodoInput addTask={addTask} />
        <div className='btn-area'>
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
        <TodoList
          tasks={tasks}
          completedScreen={completedScreen}
          toggleTaskCompletion={toggleTaskCompletion}
          
        />
      </div>
    </div>
  );
}

export default App;
