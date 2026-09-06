let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        
        if (typeof task === "string") {
            task = { text: task, date: "", completed: false };
        }
        
        li.textContent = task.text;
        
        if (task.completed) {
            li.classList.add("completed");
        }
        
        const dateSpan = document.createElement("span");
        dateSpan.textContent = task.date;
        dateSpan.className = "date";
        li.appendChild(dateSpan);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "حذف";
        deleteBtn.className = "delete-btn";
        
        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        });
        
        li.appendChild(deleteBtn);
        
        li.addEventListener("click", function() {
            task.completed = !task.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            li.classList.toggle("completed");
        });
        
        list.appendChild(li);
    });
}

document.getElementById("add-btn").addEventListener("click", function() {
    const input = document.getElementById("todo-input");
    const todoText = input.value;
    
    if (todoText !== "") {
        const taskObj = {
            text: todoText,
            date: new Date().toLocaleDateString('fa-IR'),
            completed: false
        };
        
        tasks.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showTasks();
        input.value = "";
    }
});

showTasks();

