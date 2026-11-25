
let tasks = JSON.parse(
    localStorage.getItem("studyTasks") || "[]"
);

function saveTasks() {
    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let subjectInput = document.getElementById("subjectInput");
    let dateInput = document.getElementById("dateInput");

    let taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        name: taskName,
        subject: subjectInput.value,
        date: dateInput.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    dateInput.value = "";
}

function displayTasks() {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty-message">No tasks added yet. Start planning!</p>';
    }

    tasks.forEach(function(task) {
        let item = document.createElement("div");
        item.className = "task-item";

        let info = document.createElement("div");
        info.className = "task-info";

        if (task.completed) {
            info.classList.add("completed");
        }

        let name = document.createElement("strong");
        name.textContent = task.name;

        let details = document.createElement("small");
        details.textContent =
            task.subject + " | " + (task.date || "No date");

        info.appendChild(name);
        info.appendChild(details);

        let actions = document.createElement("div");
        actions.className = "task-actions";

        let completeBtn = document.createElement("button");
        completeBtn.textContent =
            task.completed ? "Undo" : "Complete";

        completeBtn.onclick = function() {
            toggleTask(task.id);
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function() {
            deleteTask(task.id);
        };

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        item.appendChild(info);
        item.appendChild(actions);

        taskList.appendChild(item);
    });

    updateDashboard();
}

function toggleTask(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();
}

function updateDashboard() {
    let total = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    let pending = total - completed;

    let percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent =
        completed;

    document.getElementById("pendingTasks").textContent =
        pending;

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% Completed";
}

displayTasks();
