const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const pendingTasks = document.getElementById('pendingTasks');
const completedTasks = document.getElementById('completedTasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

function addTask() 
{
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = 
    {
        text: taskText,
        timestamp: new Date().toLocaleString(),
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
    taskInput.value = ''; 
}

function renderTasks() 
{
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        if (task.completed) {
            completedTasks.appendChild(taskElement);
        } else {
            pendingTasks.appendChild(taskElement);
        }
    });
}

function createTaskElement(task, index) 
{
    const li = document.createElement('li');
    li.classList.toggle('complete', task.completed);

    li.innerHTML = `
        <span>${task.text} <small>(${task.timestamp})</small></span>
        <div>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        </div>
    `;

    return li;
}

function toggleComplete(index) 
{
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) 
{
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function editTask(index) 
{
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== '') 
        {
        tasks[index].text = newText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        }
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => 
    {
        if (e.key === 'Enter') addTask();
    }
);
