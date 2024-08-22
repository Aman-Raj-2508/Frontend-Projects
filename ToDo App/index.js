console.log("WElcome to my todo app");

let todos = [];//for storing todos

let todoDataSection = document.getElementById("todo-data");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");

todoInputBar.addEventListener("keyup", function toggleSaveButton() {
    let todotext = todoInputBar.value;
    if (todotext.length == 0) {
        if (saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");
    }
    else if (saveButton.classList.contains("disabled")) {
        saveButton.classList.remove("disabled");
    }
})
saveButton.addEventListener("click", function getTextAndAddTodo() {
    let todotext = todoInputBar.value;//gets the input that one write in input bar
    if (todotext.length == 0) return;
    todos.push(todotext);
    addTodo(todotext, todos.length);
    todoInputBar.value = '';
})

function addTodo(todoData, todoCount) {
    let rowDiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    let hr = document.createElement("hr");

    //adding classes  
    rowDiv.classList.add("row")
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn", "btn-danger");
    finishedButton.classList.add("btn", "btn-success");

    //Adding the text based information
    todoNumber.textContent = `${todoCount}.`;
    todoDetail.textContent = todoData;//sets the todo text sent from the input element
    todoStatus.textContent = "In progress";
    deleteButton.textContent = "Delete";
    finishedButton.textContent = "Finished";

    //Appending the children
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);
    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);
    rowDiv.appendChild(todoItem);
    todoDataSection.appendChild(rowDiv);
}





























// Just for reference
// let getTodosButton = document.getElementById('get-todos');//stores object
// getTodosButton.addEventListener("click", () => {
//     console.log("clicked");
// });

//More event examples
// getTodosButton.addEventListener("mouseover", () => {
//     console.log("clicked wow");
// });
// getTodosButton.addEventListener("mouseout", () => {
//     console.log("out of btn");
// })

//Shorthand for eventListener
// getTodosButton.onclick = () => {
//     console.log("Clicked wow")
// }

// function clickbtn() {
//     console.log("clicked now")
// }