const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let timerName = "focus-timer";
let timer = document.getElementById(timerName);

let timeLeft = 1500;
let interval;

let isRunning = false;
let isStopped = true;

document.addEventListener("DOMContentLoaded", () => {
    const focusSection = document.getElementById("focus");
    const shortBreakSection = document.getElementById("short-break");
    const longBreakSection = document.getElementById("long-break");

    const focusTimer = "focus-timer";
    const sBreakTimer = "sBreak-timer";
    const lBreakTimer = "lBreak-timer";
    

    const focusLink = document.querySelector('a[href="#focus"]');
    const shortBreakLink = document.querySelector('a[href="#short-break"]');
    const longBreakLink = document.querySelector('a[href="#long-break"]');
    
    // Hide all sections initially
    const hideAllSections = () => {
      focusSection.style.display = "none";
      shortBreakSection.style.display = "none";
      longBreakSection.style.display = "none";
    };
  
    // Show a specific section
    const showSection = (section, activeTimer) => {
      hideAllSections();
      section.style.display = "block";
      timerName = activeTimer;

      timer = document.getElementById(timerName);

      if( timerName == "focus-timer" )
      {
        timeLeft = 1500;
      }
      else if( timerName == "sBreak-timer" ){
        timeLeft = 300;
      }
      else if( timerName == "lBreak-timer" ){
        timeLeft = 900;
      }
    };
  
    // Event listeners for navigation links
    focusLink.addEventListener("click", () => showSection(focusSection, focusTimer));
    shortBreakLink.addEventListener("click", () => showSection(shortBreakSection, sBreakTimer));
    longBreakLink.addEventListener("click", () => showSection(longBreakSection, lBreakTimer));
  
    // Show the focus section by default on page load
    showSection(focusSection, focusTimer);
});

const updateTimer = () => {
    const minutes = Math.floor( timeLeft / 60 );
    const seconds = timeLeft % 60;

    if( timerName == "focus-timer" )
        {
          timer.innerHTML = `${minutes.toString().padStart(2, "0")}
                              : 
                              ${seconds.toString().padStart(2, "0")}`;
        }
    else if( timerName == "sBreak-timer" )
        {
            document.getElementById("sBreak-timer").innerHTML = `${minutes.toString().padStart(2, "0")}
                                                                  : 
                                                                  ${seconds.toString().padStart(2, 0)}`;
        }
    else if( timerName == "lBreak-timer" )
        {
            document.getElementById("lBreak-timer").innerHTML = `${minutes.toString().padStart(2, "0")}
                                                                  : 
                                                                  ${seconds.toString().padStart(2, 0)}`;
        }
}

const startTimer = () => {
    if ( isRunning ) 
      {
        return;
      }

    isRunning = true;
    isStopped = false;
    interval = setInterval( () => {
        timeLeft--;
        updateTimer();

        if( timeLeft == 0 )
        {
            clearInterval(interval);
            alert("Time's Up! Well Done.");
            timeLeft = 1500;
            updateTimer();
        }
    } , 1000 );
};

const stopTimer = () => {
  clearInterval(interval);
  isRunning = false;
  isStopped = true;
}

const resetTimer = () => {
    clearInterval(interval);
    isRunning = false;
    isStopped = true;

    if( timerName == "focus-timer" )
        {
          timeLeft = 1500;
        }
    else if( timerName == "sBreak-timer" )
        {
          timeLeft = 300;
        }
    else if( timerName == "lBreak-timer" )
        {
          timeLeft = 900;
        }

    updateTimer();
}


startBtn.addEventListener( "click", startTimer );
stopBtn.addEventListener( "click", stopTimer );
resetBtn.addEventListener( "click", resetTimer );

// Add Task 

function openPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = "flex";
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = "none";
}

function validateForm(event) {

  event.preventDefault();
  
  // Get references to the input elements
  const taskName = document.getElementById("task-name");
  const nPomodoros = document.getElementById("pomodoro-number");
  const notes = document.getElementById("notes");

  // Create the new task HTML, using the values from the inputs
  const newTask = `
    <div class="task">
      <p>
        <strong>Task:</strong> ${taskName.value} <br>
        <strong>Pomodoros:</strong> ${nPomodoros.value} <br>
        <strong>Notes:</strong> ${notes.value}
      </p>
      <button class="delete-btn">🗑️</button>
    </div>
  `;

  // Find the task-added element
  const taskAddedElement = document.getElementById("task-added");

  if (taskAddedElement) {
    // If task-added exists, append the new task
    taskAddedElement.innerHTML += newTask;
  } else {
    // If task-added doesn't exist, create the element and add the new task
    const taskZone = document.getElementById("task-zone");
    const newTaskContainer = document.createElement("div");
    newTaskContainer.id = "task-added";
    newTaskContainer.innerHTML = newTask;
    taskZone.insertBefore(newTaskContainer, taskZone.secondChild); // Or append to a specific container
  }

  // Clear form inputs
  taskName.value = "";
  nPomodoros.value = "1";
  notes.value = "";

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Find the parent task and remove it
      const taskElement = button.closest(".task");
      taskElement.remove();
    });
  });

  closePopup();
}




