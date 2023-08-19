import React, { useState } from 'react';
import './TodoList.css';

function TodoList({ tasks, completedScreen, toggleTaskCompletion, removeTask, updateTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false); // New state for popup
  const [showBackdrop, setShowBackdrop] = useState(false);

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setEditedTitle(taskToEdit.title);
      setEditedDescription(taskToEdit.description);
      setShowEditPopup(true); // Show the edit popup
      setShowBackdrop(true);
    }
  };

  const saveEditedTask = () => {
    if (editingTaskId !== null) {
      updateTask(editingTaskId, editedTitle, editedDescription);
      setEditingTaskId(null);
      setEditedTitle('');
      setEditedDescription('');
      setShowEditPopup(false); // Hide the edit popup after saving
      setShowBackdrop(false);
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditedTitle('');
    setEditedDescription('');
    setShowEditPopup(false); // Hide the edit popup on cancel
    setShowBackdrop(false);
  };

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
              <button className='btne' onClick={() => editTask(task.id)}>
                <i className='fa-solid fa-pen-to-square'></i>
                
              </button>
              <button className='btnd' onClick={() => removeTask(task.id)}>
                <i className='fa-solid fa-xmark'></i>
              </button>
              <button className='btnc' onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? (
                  <i className='fa-solid fa-arrow-rotate-left'></i>
                ) : (
                  <i className='fa-solid fa-check'></i>
                )}
              </button>
            </div>
          </div>
        ))}
      {showBackdrop && <div className='backdrop'></div>}

      {showEditPopup && (
        <div className='edit-popup'>
          <input
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type='text'
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={saveEditedTask}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default TodoList;

