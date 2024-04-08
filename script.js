window.addEventListener("load", function () {
  var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (taskText) {
    addTaskFromStorage(taskText);
  });
});

function addTaskFromStorage(taskText) {
  var li = document.createElement("li");
  li.textContent = taskText;

  var iconsDiv = document.createElement("div");

  var penIcon = document.createElement("i");
  penIcon.classList.add("fa-solid", "fa-pen-to-square", "small-icon");
  penIcon.addEventListener("click", function () {
    editTask(li);
  });

  var delIcon = document.createElement("i");
  delIcon.classList.add("fa-solid", "fa-trash", "small-icon");

  delIcon.addEventListener("click", function () {
    deleteTask(li);
  });

  iconsDiv.appendChild(penIcon);
  iconsDiv.appendChild(delIcon);

  li.appendChild(iconsDiv);

  var ul = document.querySelector(".todolist-section ul");
  ul.appendChild(li);
}

function addTask() {
  console.log("Adding");
  var taskInput = document.getElementById("todoAdd");
  var taskValue = taskInput.value;

  if (taskValue.trim() !== "") {
    addTaskFromStorage(taskValue);

    var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(taskValue);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    taskInput.value = "";
  } else {
    alert("Type to add task");
  }
}

function editTask(taskElement) {
  var inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = taskElement.textContent.trim();
  inputField.classList.add("edit-input");
  taskElement.textContent = "";
  taskElement.appendChild(inputField);

  inputField.focus();

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      var newText = inputField.value.trim();
      if (newText !== "") {
        taskElement.textContent = newText;

        var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        var index = Array.from(taskElement.parentNode.children).indexOf(
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
  var ul = document.querySelector(".todolist-section ul");
  ul.innerHTML = "";

  var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (taskText) {
    addTaskFromStorage(taskText);
  });
}

function deleteTask(taskElement) {
  var ul = taskElement.parentNode;
  var index = Array.from(ul.children).indexOf(taskElement);

  taskElement.remove();

  var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

document.getElementById("addTask").addEventListener("click", addTask);
