document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const editButtons = document.querySelectorAll('.edit-btn');

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const taskId = btn.getAttribute('data-id');
            await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
            window.location.reload();
        });
    });

    editButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = btn.getAttribute('data-id');
            // Logic for opening modal and handling edit
        });
    });
});
