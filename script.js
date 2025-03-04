// Initialize event listeners
function initializeEventListeners() {
  document
    .querySelectorAll(".add-item")
    .forEach((btn) => btn.addEventListener("click", showNewTaskPopup));
  document
    .querySelectorAll(".close-button")
    .forEach((btn) => btn.addEventListener("click", hideNewTaskPopup));
  document
    .getElementById("addNewBoard")
    .addEventListener("click", showNewBoardPopup);
  document
    .getElementById("boardCloseBtn")
    .addEventListener("click", hideNewBoardPopup);

  // Prevent empty task submission
  document
    .getElementById("form-addtask")
    .addEventListener("submit", function (e) {
      let taskInput = document.getElementById("new-task");

      if (taskInput.value.trim() === "") {
        e.preventDefault(); // Prevent form submission
        hideNewTaskPopup();
      } else {
        addNewTask(e);
      }
    });

  // Prevent Empty Board Submission
  document.getElementById("newBoardForm").addEventListener("submit", (e) => {
    let newBoardName = document.getElementById("NewBoardName");
    let newBoardDes = document.getElementById("NewBoardDes");

    if (newBoardName.value.trim() === "") {
      e.preventDefault();
      newBoardDes.value = "";
      hideNewBoardPopup();
    } else {
      addNewBoard(e);
    }
  });
}

// //hide/show edit or delete icons on card hover
function showOnHover() {
  let icons = document.querySelectorAll(".icons");

  // Loop through each icons container and attach hover event listeners
  icons.forEach((e) => {
    let card = e.closest(".card");

    card.addEventListener("mouseenter", () => {
      e.classList.remove("hidden");
    });

    card.addEventListener("mouseleave", () => {
      e.classList.add("hidden");
    });
  });
}

//Remove Task Function
function removeTask() {
  showOnHover();
  let removeIcon = document.querySelectorAll(".remove");

  removeIcon.forEach((e) => {
    let card = e.closest(".card");

    e.addEventListener("click", () => {
      card.remove();
    });
  });
}

// Show/Hide Popups
function showPopup(element) {
  element.classList.remove("hidden");
}

function hidePopup(element) {
  element.classList.add("hidden");
}

function showNewTaskPopup() {
  showPopup(document.getElementById("add-task-popup"));
}

function hideNewTaskPopup() {
  hidePopup(document.getElementById("add-task-popup"));
}

function showNewBoardPopup() {
  showPopup(document.getElementById("add-new-board-popup"));
}

function hideNewBoardPopup() {
  hidePopup(document.getElementById("add-new-board-popup"));
}

// Add New Task
function addNewTask(event) {
  event.preventDefault();

  let newTask = document.getElementById("new-task");
  let cardsContainer = document.getElementById("cards-container");

  let taskElement = document.createElement("div");
  taskElement.innerHTML = `
        <div draggable="true" class="card">
          <div class="card-header-parent">
            <div class="card-header">
              <div class="card-icon color-gray"></div>
              <div class="card-label">Draft</div>
            </div>
            <div class="card-header icons hidden">
              <i class="ri-edit-line edit"></i>
              <i class="ri-delete-bin-line remove"></i>
            </div>
          </div>
          <div class="card-title">
            <p>${newTask.value}</p>
          </div>
        </div>
      </div>
    `;

  cardsContainer.appendChild(taskElement);

  addDragEvents(taskElement);
  removeTask();
  showOnHover();
  hideNewTaskPopup();
  newTask.value = "";
}

// Add Drag & Drop Functionality
function addDragEvents(task) {
  task.addEventListener("dragstart", () => task.classList.add("flying"));
  task.addEventListener("dragend", () => task.classList.remove("flying"));
}

// Initialize Drag & Drop for existing cards
function initializeDragAndDrop() {
  document.querySelectorAll(".card").forEach(addDragEvents);
  document.querySelectorAll(".cards-container").forEach((board) => {
    board.addEventListener("dragover", (event) => {
      event.preventDefault();
      let movingTask = document.querySelector(".flying");
      if (movingTask) board.appendChild(movingTask);
    });
  });
}

// Add New Board
function addNewBoard(event) {
  event.preventDefault();

  let newBoardName = document.getElementById("NewBoardName");
  let newBoardDes = document.getElementById("NewBoardDes");
  let boardContainer = document.getElementById("board-container");

  let boardElement = document.createElement("div");
  boardElement.classList.add("column");
  boardElement.innerHTML = `
        <div class="column-header-parent">
        <div class="column-header"><div class="status-indicator color-gray"></div>
        <div>${newBoardName.value}</div>
        <div class="column-count"></div></div>
        <div class="column-header boardIcons">
          <i class="ri-edit-line editBoard"></i>
          <i class="ri-delete-bin-line removeBoard"></i>
        </div>
      </div>
        <div class="column-subtitle">${newBoardDes.value}</div>
        <div class="cards-container"></div>
        <div class="add-item"><span class="add-icon">+</span> <span>Add item</span></div>
    `;

  boardContainer.appendChild(boardElement);
  initializeDragAndDrop();
  initializeEventListeners();
  hideNewBoardPopup();
  newBoardName.value = "";
  newBoardDes.value = "";
}

// Initialize All Functions
removeTask();
showOnHover();
initializeEventListeners();
initializeDragAndDrop();
