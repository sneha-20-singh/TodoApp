//document.addEventListener("DOMContentLoaded", () => {
//this line ensures that the script runs only after when entire html content of the webpage is loaded
const input = document.getElementById("task-input");
const btn = document.getElementById("addbtn");
const taskList = document.getElementById("task-list");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");
const progressFill = document.getElementById("progress-fill");
const img = document.querySelector(".emptyimg");
const msg = document.getElementById("progress-title");
const theme = document.getElementById("theme");
const body = document.querySelector("body");

// ================function upadte progress bar ==================
function updateProgress() {
  const totalTasks = taskList.querySelectorAll("li").length;
  const completedTasks = taskList.querySelectorAll("li.completed").length;

  //update counts

  totalCount.textContent = totalTasks;
  completedCount.textContent = completedTasks;

  // calculate percentage

  const percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  //update message
  if (percent == 0) {
    msg.innerText = "No task done yet";
  } else if (percent < 100) {
    msg.innerText = "Keep it up";
  } else {
    msg.innerText = "All Done";
  }

  //update bar width
  progressFill.style.width = percent + "%";
}

theme.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    theme.textContent = "☀️";
  } else {
    theme.textContent = "🌙";
  }
});
const checksEmptyState = () => {
  img.style.display = taskList.children.length === 0 ? "block" : "none";
};

//saved data
function saveData() {
  localStorage.setItem("savedData", taskList.innerHTML);
}

function attachTaskEvents(li) {
  const checkbox = li.querySelector(".checkbox");
  const editbtn = li.querySelector(".edit-btn");
  const del = li.querySelector(".delete-btn");
  //checkbox
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.classList.add("completed");
      saveData();
    } else {
      li.classList.remove("completed");
      saveData();
    }

    updateProgress();
  });

  //edit button
  editbtn.addEventListener("click", () => {
    const span = li.querySelector("span");
    const newText = prompt("edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveData();
    }
  });

  //delete button
  del.addEventListener("click", () => {
    li.remove();
    updateProgress();
    checksEmptyState();
    saveData();
  });
}
function showTask() {
  const saved = localStorage.getItem("savedData");
  if (saved) {
    taskList.innerHTML = saved;
    taskList.querySelectorAll("li").forEach((li) => {
      const checkbox = li.querySelector(".checkbox");
      if (li.classList.contains("completed")) {
        checkbox.checked = true;
      }
      attachTaskEvents(li);
    });
    updateProgress();
    checksEmptyState();
  } else {
    checksEmptyState();
  }
}
//function add task

btn.addEventListener("click", (event) => {
  event.preventDefault();
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("write something in the input box!");
    return;
  }

  const li = document.createElement("li");

  const left = document.createElement("div");
  left.classList.add("taskLeft");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  const span = document.createElement("span");
  span.textContent = taskText;

  //append
  left.appendChild(checkbox);
  left.appendChild(span);
  li.appendChild(left);

  const editbtn = document.createElement("button");
  editbtn.textContent = "✏️";
  editbtn.classList.add("edit-btn");

  const del = document.createElement("button");
  del.textContent = "X";
  del.classList.add("delete-btn");
  //append
  li.appendChild(editbtn);
  li.appendChild(del);
  taskList.appendChild(li);

  attachTaskEvents(li);
  saveData();
  updateProgress();
  checksEmptyState();
  //clear input
  input.value = "";
});
showTask();
//});
