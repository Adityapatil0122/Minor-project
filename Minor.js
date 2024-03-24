// script.js
document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function(task, index) {
            const li = document.createElement("li");
            li.textContent = task.name;
            if (task.completed) {
                li.classList.add("completed");
            }
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.addEventListener("click", function() {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", function() {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            li.appendChild(completeBtn);
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", function() {
        const taskName = taskInput.value.trim();
        if (taskName !== "") {
            tasks.push({ name: taskName, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    });

    renderTasks();
});