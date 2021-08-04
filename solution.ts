
let tempTask:String = "";
const todoSave:HTMLInputElement = document.querySelector("#todo-save");
const todoDelAll:HTMLInputElement = document.querySelector("#todo-delall");
const todoDelCom:HTMLInputElement = document.querySelector("#todo-delcom");
let todoListEl:HTMLInputElement = document.querySelector("#todo-list");

class Task{
    myInput:String
    completed: Boolean
    constructor (myInput,completed){
        this.myInput = myInput
        this.completed =completed
    }
} 

const getLocalStorage = ():any => {
    let arrayTasks
    if( localStorage.getItem("task"))
    arrayTasks= JSON.parse(localStorage.getItem("task"))
     else  arrayTasks =[];
    return [...arrayTasks];
  };

let allTask = getLocalStorage();

todoSave.onclick = ():void => {

    let inputNow:HTMLLIElement = document.querySelector("#todo-item");
    let taskNow:any= inputNow.value

    if(taskNow!==""){
        let newTask:Object = new Task (taskNow, false)
        allTask.push(newTask);
        localStorage.setItem("task", JSON.stringify(allTask));
        newTaskList();
      };
    }

let newTaskList = ():void => {

let todoList = "";
todoListEl.innerHTML = "";


  for (let item = 0; item < allTask.length; item++) {

    todoList += `<div class="todo-row">`

        if (!allTask[item].completed)
            todoList += `<p class="todo-item">${allTask[item].myInput}</p>`;
        else
            todoList += ` <p class="todo-item done">${allTask[item].myInput}</p>`;

        todoList+=`  <button class="todo-ok" onclick = isCompleted(${item}) >v</button>  </div>`
    }
    todoListEl.innerHTML = todoList;
  }


todoDelCom.onclick=():void => {
    
let i =  allTask.length-1
   
    for (i;i >=0; i--) {
        if (allTask[i].completed){
            allTask.pop();
        }
    }
    localStorage.setItem("task", JSON.stringify(allTask));
    newTaskList()
}

todoDelAll.onclick=():void => {

    localStorage.clear()
    todoListEl.innerHTML = "";
    allTask=[]
    newTaskList();
}


const isCompleted=(item:number):void => {

    if (allTask[item].completed)
          allTask[item].completed=false
    else 
      allTask[item].completed=true
    
  localStorage.setItem("task", JSON.stringify(allTask));
  newTaskList();
};

window.onload= ():void => {
    newTaskList()
}


