let addNewTaskBtn = document.querySelectorAll('.add-item');

addNewTaskBtn.forEach(btn => {
    btn.addEventListener("click", showNewTaskPopup);
});

let closeBtn = document.querySelectorAll('.close-button');

closeBtn.forEach(btn => {
    btn.addEventListener("click", hideNewTaskPopup);
});

//Show/Hide New Task Popup Function
let addNewTaskPopup = document.getElementById('add-task-popup');

function showNewTaskPopup(){ 
addNewTaskPopup.classList.remove("hidden");
};

function hideNewTaskPopup(){ 
addNewTaskPopup.classList.add("hidden");
};


// Add Task form Popup Form
let newTask = document.getElementById('new-task');
let newTaskForm = document.getElementById('form-addtask');
let cardsContainer = document.getElementById('cards-container');

newTaskForm.addEventListener("submit", (e) => {
let code = ` <div draggable="true" class="card">
            <div class="card-header">
              <div class="card-icon"></div>
              <div class="card-label">Draft</div>
            </div>
            <div class="card-title">
              ${newTask.value}
            </div>
          </div> `

cardsContainer.innerHTML += code;

addingFlyingClass();
hideNewTaskPopup();
newTask.value = null;
e.preventDefault();
})

// Function of Adding Flying Class on DragStart/End Events
function addingFlyingClass(){
let tasks = document.querySelectorAll('.card')

tasks.forEach((e) => {
e.addEventListener("dragstart", () => {
e.classList.add("flying")
})

e.addEventListener("dragend", () => {
e.classList.remove("flying")
})
})
};


// Change Tasks status around the Board
addingFlyingClass();

let boards = document.querySelectorAll('.cards-container');

boards.forEach((e) => {

e.addEventListener("dragover", () => {
let addTask = document.querySelector('.flying')
e.appendChild(addTask);
})

})


//Add New Board

//Show/Hide New Board Popup Function
let addNewBoardPopup = document.getElementById('add-new-board-popup');

function showNewBoardPopup(){ 
addNewBoardPopup.classList.remove("hidden");
};

function hideNewBoardPopup(){ 
addNewBoardPopup.classList.add("hidden");
};

let addNewBoardBtn = document.getElementById('addNewBoard');
addNewBoardBtn.addEventListener("click", showNewBoardPopup);

let boardCloseBtn = document.getElementById('boardCloseBtn');
boardCloseBtn.addEventListener("click", hideNewBoardPopup);


// Add New Board form Popup Form
let newBoardName = document.getElementById('NewBoardName');
let newBoardDes = document.getElementById('NewBoardDes');
let newBoardForm = document.getElementById('newBoardForm');
let boardContainer = document.getElementById('board-container');

newBoardForm.addEventListener("submit", (e) => {
let code = ` <div class="column">
        <div class="column-header">
          <div class="status-indicator status-test"></div>
          <div>${newBoardName.value}</div>
          <div class="column-count"></div>
        </div>
        <div class="column-subtitle">${newBoardDes.value}</div>
        <div id="cards-container" class="cards-container">
        
        </div>

        <!-- Add New Task Button -->
        <div class="add-item">
          <span class="add-icon">+</span>
          <span>Add item</span>
        </div>
      </div>`

boardContainer.innerHTML += code;

boards.forEach((e) => {

e.addEventListener("dragover", () => {
let addTask = document.querySelector('.flying')
e.appendChild(addTask);
})

})

hideNewBoardPopup();
newBoardName.value = null;
newBoardDes.value = null;
e.preventDefault();
})