window.addEventListener("load", function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (taskText) {
    addTaskFromStorage(taskText);
  });
});

function addTaskFromStorage(taskText) {
  let li = document.createElement("li");
  li.textContent = taskText;

  let iconsDiv = document.createElement("div");

  let penIcon = document.createElement("i");
  penIcon.classList.add("fa-solid", "fa-pen-to-square", "small-icon");
  penIcon.addEventListener("click", function () {
    editTask(li);
  });

  let delIcon = document.createElement("i");
  delIcon.classList.add("fa-solid", "fa-trash", "small-icon");

  delIcon.addEventListener("click", function () {
    deleteTask(li);
  });

  iconsDiv.appendChild(penIcon);
  iconsDiv.appendChild(delIcon);

  li.appendChild(iconsDiv);

  let ul = document.querySelector(".todolist-section ul");
  ul.appendChild(li);
}

function addTask() {
  console.log("Adding");
  let taskInput = document.getElementById("todoAdd");
  let taskValue = taskInput.value;

  if (taskValue.trim() !== "") {
    addTaskFromStorage(taskValue);

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(taskValue);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    taskInput.value = "";
  } else {
    alert("Type to add task");
  }
}

function editTask(taskElement) {
  let inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = taskElement.textContent.trim();
  inputField.classList.add("edit-input");
  taskElement.textContent = "";
  taskElement.appendChild(inputField);

  inputField.focus();

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let newText = inputField.value.trim();
      if (newText !== "") {
        taskElement.textContent = newText;

        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let index = Array.from(taskElement.parentNode.children).indexOf(
          taskElement
        );
        savedTasks[index] = newText;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        refreshTaskList();
      }
    }
  });
}

function refreshTaskList() {
  let ul = document.querySelector(".todolist-section ul");
  ul.innerHTML = "";

  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (taskText) {
    addTaskFromStorage(taskText);
  });
}

function deleteTask(taskElement) {
  let ul = taskElement.parentNode;
  let index = Array.from(ul.children).indexOf(taskElement);

  taskElement.remove();

  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

document.getElementById("addTask").addEventListener("click", addTask);
