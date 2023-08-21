import React, { useState } from 'react';
import './TodoInput.css';
function TodoInput({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (title && description) {
      addTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className='todo-input'>
      <div className='todo-input-item'>
        <form action="on"></form>
        <label className='td'>Title</label>
        <input
          type='text'
          placeholder='What task?'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='todo-input-item'>
        <label className='td'>Description</label>
        <input
          type='text'
          placeholder='What do u want to do?'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='todo-input-item'>
        <button type='button' onClick={handleAddTask} className='primarybtn'>
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoInput;
