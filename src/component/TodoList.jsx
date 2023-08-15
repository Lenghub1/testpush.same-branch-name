import React from 'react';

function TodoList({ tasks, completedScreen, toggleTaskCompletion, removeTask }) {
  return (
    <div className='todo-list'>
      {tasks
        .filter((task) => (completedScreen ? task.completed : !task.completed))
        .map((task) => (
          <div className='todo-list-item' key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className='btndc'>
              <button className='btnd' onClick={() => removeTask(task.id)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <button className='btnc' onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? 
                <i className="fa-solid fa-arrow-rotate-left"></i> : <i className="fa-solid fa-check"></i>}
              </button>
              <button className='btne' onClick={() => editTask(task.id)}>
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TodoList;
