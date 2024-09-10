const API_URL = 'http://localhost:8080/tasks'; // Backend API URL

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    if (taskInput === '') return;

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskInput, completed: false })
    }).then(() => {
        document.getElementById("taskInput").value = ''; // Clear input
        loadTasks();
    });
}

function loadTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = ''; // Clear task list
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.name + (task.completed ? ' (Completed)' : '');
                taskList.appendChild(taskItem);
            });
        });
}

// Load tasks on page load
loadTasks();
