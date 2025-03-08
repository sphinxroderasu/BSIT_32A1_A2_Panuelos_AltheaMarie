document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span class="task-text">${task}</span>
                <div>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-warning edit-button">Edit</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
            taskInput.value = '';
            saveTasks();
        }
    }

    taskList.addEventListener('click', (e) => {
        const listItem = e.target.closest('li');
        if (e.target.classList.contains('delete-button')) {
            taskList.removeChild(listItem);
            saveTasks();
        }

        if (e.target.classList.contains('done-button')) {
            const taskText = listItem.querySelector('.task-text');
            taskText.classList.toggle('text-decoration-line-through');
            e.target.textContent = taskText.classList.contains('text-decoration-line-through') ? 'Undo' : 'Done';
            saveTasks();
        }

        if (e.target.classList.contains('edit-button')) {
            const taskText = listItem.querySelector('.task-text');
            const newTask = prompt('Edit Task:', taskText.textContent);
            if (newTask && newTask.trim() !== '') {
                taskText.textContent = newTask;
                saveTasks();
            }
        }
    });

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                done: item.querySelector('.task-text').classList.contains('text-decoration-line-through')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span class="task-text ${task.done ? 'text-decoration-line-through' : ''}">${task.text}</span>
                <div>
                    <button class="btn btn-sm btn-success done-button">${task.done ? 'Undo' : 'Done'}</button>
                    <button class="btn btn-sm btn-warning edit-button">Edit</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
    }
});
