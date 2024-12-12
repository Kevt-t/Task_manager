document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-task-form');
  const taskList = document.getElementById('task-list');

  // Add a new task
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = form.title.value.trim();
    const description = form.description.value.trim();

    if (!title) {
      alert('Title is required');
      return;
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();

      // Add new task to the list
      const taskItem = document.createElement('li');
      taskItem.className = 'list-group-item';
      taskItem.innerHTML = `
        ${newTask.title}: ${newTask.description}
        <button class="edit-btn btn btn-primary btn-sm" data-id="${newTask.id}">Edit</button>
        <button class="delete-btn btn btn-danger btn-sm" data-id="${newTask.id}">Delete</button>
      `;
      taskList.appendChild(taskItem);

      form.reset();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  });

  // Handle clicks for delete and edit buttons
  document.addEventListener('click', async (event) => {
    const target = event.target;

    // Delete task
    if (target.classList.contains('delete-btn')) {
      const taskId = target.dataset.id;

      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        // Remove task from the DOM
        target.parentElement.remove();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }

    // Edit task
    if (target.classList.contains('edit-btn')) {
      const taskId = target.dataset.id;

      const newTitle = prompt('Enter new title:');
      const newDescription = prompt('Enter new description:');

      if (newTitle && newDescription) {
        try {
          const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
          });

          if (!response.ok) {
            throw new Error('Failed to update task');
          }

          const updatedTask = await response.json();

          // Update the task in the DOM
          const taskItem = target.parentElement;
          taskItem.innerHTML = `
            ${updatedTask.title}: ${updatedTask.description}
            <button class="edit-btn btn btn-primary btn-sm" data-id="${updatedTask.id}">Edit</button>
            <button class="delete-btn btn btn-danger btn-sm" data-id="${updatedTask.id}">Delete</button>
          `;
        } catch (error) {
          console.error('Error updating task:', error);
        }
      }
    }
  });
});
