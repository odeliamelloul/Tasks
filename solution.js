var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var tempTask = "";
var todoSave = document.querySelector("#todo-save");
var todoDelAll = document.querySelector("#todo-delall");
var todoDelCom = document.querySelector("#todo-delcom");
var todoListEl = document.querySelector("#todo-list");
var Task = /** @class */ (function () {
    function Task(myInput, completed) {
        this.myInput = myInput;
        this.completed = completed;
    }
    return Task;
}());
var getLocalStorage = function () {
    var arrayTasks;
    if (localStorage.getItem("task"))
        arrayTasks = JSON.parse(localStorage.getItem("task"));
    else
        arrayTasks = [];
    return __spreadArray([], arrayTasks);
};
var allTask = getLocalStorage();
todoSave.onclick = function () {
    var inputNow = document.querySelector("#todo-item");
    var taskNow = inputNow.value;
    if (taskNow !== "") {
        var newTask = new Task(taskNow, false);
        allTask.push(newTask);
        localStorage.setItem("task", JSON.stringify(allTask));
        newTaskList();
    }
    ;
};
var newTaskList = function () {
    var todoList = "";
    todoListEl.innerHTML = "";
    for (var item = 0; item < allTask.length; item++) {
        todoList += "<div class=\"todo-row\">";
        if (!allTask[item].completed)
            todoList += "<p class=\"todo-item\">" + allTask[item].myInput + "</p>";
        else
            todoList += " <p class=\"todo-item done\">" + allTask[item].myInput + "</p>";
        todoList += "  <button class=\"todo-ok\" onclick = isCompleted(" + item + ") >v</button>  </div>";
    }
    todoListEl.innerHTML = todoList;
};
todoDelCom.onclick = function () {
    var i = allTask.length - 1;
    for (i; i >= 0; i--) {
        if (allTask[i].completed) {
            allTask.pop();
        }
    }
    localStorage.setItem("task", JSON.stringify(allTask));
    newTaskList();
};
todoDelAll.onclick = function () {
    localStorage.clear();
    todoListEl.innerHTML = "";
    allTask = [];
    newTaskList();
};
var isCompleted = function (item) {
    if (allTask[item].completed)
        allTask[item].completed = false;
    else
        allTask[item].completed = true;
    localStorage.setItem("task", JSON.stringify(allTask));
    newTaskList();
};
window.onload = function () {
    newTaskList();
};
