const startBtn = document.getElementById("btn1");

let pomodoroIndex = document.getElementById("pomodoroIndex");
let restIndex = document.getElementById("restIndex");
let longRestIndex = document.getElementById("longrestIndex");

let pomodoroTime = 25 * 60; // 25 minutes in seconds
let restTime = 5 * 60; // 5 minutes in seconds
let intervals = []; // Array to store interval IDs

// Function to update the timer display
function updateTimer(seconds) {
  let minutes = Math.floor(seconds / 60);
  let sec = seconds % 60;
  document.getElementById("clock").textContent = `${minutes}:${
    sec < 10 ? "0" + sec : sec
  }`;
}

// Function to start Pomodoro timer
function startPomodoro() {
  let timer = setInterval(() => {
    pomodoroTime--;
    updateTimer(pomodoroTime);
    if (pomodoroTime <= 0) {
      clearInterval(timer);
      pomodoroIndex.textContent = Number(pomodoroIndex.textContent) + 1;
      startRest();
    }
  }, 1000);
  intervals.push(timer);
}

// Function to start rest timer
function startRest() {
  let timer = setInterval(() => {
    restTime--;
    updateTimer(restTime);
    if (restTime <= 0) {
      clearInterval(timer);
      restIndex.textContent = Number(restIndex.textContent) + 1;
    }
  }, 1000);
  intervals.push(timer);
}

startBtn.addEventListener("click", () => {
  pomodoroTime = 25 * 60; // Reset Pomodoro time
  restTime = 5 * 60; // Reset rest time
  intervals.forEach(clearInterval); // Clear any existing intervals
  intervals = []; // Reset intervals array
  startPomodoro();
});

//
//
//

const stopBtn = document.getElementById("stopBtn");

stopBtn.addEventListener("click", stopTimer);

// Function to stop the timer
function stopTimer() {
  intervals.forEach((interval) => clearInterval(interval));
  // Reset timer values
  pomodoroTime = 0;
  restTime = 0;
  // Update timer display
  updateTimer(0);
}
//
//
document.addEventListener("DOMContentLoaded", function () {
  let saveBtn = document.getElementById("saveBtn");
  let resetBtn = document.getElementById("resetBtn");
  let container = document.getElementById("output1");
  let indexLabel = document.getElementById("index1");
  let practiceIndex = document.getElementById("practiceIndex");

  function tasks() {
    saveBtn.addEventListener("click", function () {
      let tasksVar = document.getElementById("tasksInput").value;

      // Create checkbox input
      let checkboxInput = document.createElement("input");
      checkboxInput.setAttribute("type", "checkbox");
      checkboxInput.classList.add("checkbox-item");

      // Create list item for task
      let listItem = document.createElement("li");
      listItem.textContent = tasksVar;

      // Append checkbox and list item to container
      container.appendChild(checkboxInput);
      container.appendChild(listItem);

      // Event listener to toggle line-through style
      checkboxInput.addEventListener("change", function () {
        if (checkboxInput.checked) {
          listItem.style.textDecoration = "line-through";
        } else {
          listItem.style.textDecoration = "none";
        }

        // Update tasks index
        indexLabel.textContent = parseInt(indexLabel.textContent) + 1;
      });
    });
  }

  function clearTask() {
    resetBtn.addEventListener("click", function () {
      container.innerHTML = "";
      indexLabel.textContent = "0"; // Reset tasks index
    });
  }

  tasks();
  clearTask();
});
