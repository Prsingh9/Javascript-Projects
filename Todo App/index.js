const addTaskBtn = document.getElementById("addTask"); //catching html element button
const btnText = addTaskBtn.innerText; //btnText=Add Task
const tasknameTextField = document.getElementById("taskname");
const recordsDisplay = document.getElementById("records");

let taskArray = []; //we are making an array to store all task entered by users
let edit_id = null; //iniatially we are naking edit_id to null
let objStr = localStorage.getItem("tasks"); //this will get the data from local storage after refreshing the page in the form of string
// console.log(objStr);
//objStr=null

if (objStr != null) {
  //if the data recieved from the local storage is not null then only convert the data into object and store in the array otherwise whole array while become null and we can't push any values into null
  taskArray = JSON.parse(objStr); //JSON.parse will convert string into object
  // console.log(taskArray);
  //taskArray=null
}

DisplayInfo(); //display the data when the page is laoded first or refresed

addTaskBtn.onclick = () => {
  //onclikcing the button we should get the value from input field
  const task = tasknameTextField.value;

  if (task !== "") {
    if (edit_id != null) {
      //if id is not null
      //edit
      taskArray.splice(edit_id, 1, { task: task }); //delete the element with edit_id and replace with new value
      edit_id = null; //we are making it null again because we want to now add new data after finishing editing
      addTaskBtn.innerText = btnText;
    } else {
      //insert
      taskArray.push({ task: task }); //null.push      //here we are adding new task in form of objects
      // console.log(taskArray);
    }
  }

  SaveInfo(taskArray); //after the user has pressed the button we want to save that task array to local storage
  tasknameTextField.value = "";
  DisplayInfo(); //display the data after each click of button
};

// addTaskBtn.addEventListener('click',function(){
//     const task=tasknameTextField.value;
// })

function SaveInfo(taskArray) {
  let str = JSON.stringify(taskArray); //converting taskArray elements which are objects into strings
  localStorage.setItem("tasks", str); //storing the taskArray as an value inside local storage
}

function DisplayInfo(tasksToShow) {
  //tasksToShow is used to get new array as input for filteration
  let statement = ""; //create empty string

  const tasksToDisplay = tasksToShow || taskArray; //if no argument is passed , use taskArray to display all tasks
  //if we are passing argument in DisplayInfo that means tasksToShow is not empty so use the same arary
  tasksToDisplay.forEach((Usertask, i) => {
    //dynamic display
    statement += `<tr>               
        <th scope="row">${i + 1}</th>
        <td class="${Usertask.completed ? "completed-task" : ""}" >${
      Usertask.task
    }</td>
        <td>
          <i class="btn text-white fa fa-edit btn-info " onclick='EditInfo(${i})'></i>
          <i class="btn text-white fa fa-trash btn-danger mx-2" onclick='DeleteInfo(${i})'></i>
          <i class="btn text-white fa fa-check-circle btn-success" onclick='MarkCompleted(${i})'></i>
          </td>
      </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

function EditInfo(id) {
  //id=0
  edit_id = id; //edit_id=0
  tasknameTextField.value = taskArray[id].task; //taskArray[0].task
  addTaskBtn.innerText = "Save Changes";
}

function DeleteInfo(id) {
  //id=0

  taskArray.splice(id, 1); // id is the starting position from where element will get deleted
  // 1 means we want to delete only one element
  SaveInfo(taskArray); //save the new array after removing element
  DisplayInfo(); //display the data
}

function MarkCompleted(id) {
  //id=0
  // alert(id);
  taskArray[id].completed = true; //mark the task as completed
  SaveInfo(taskArray); //save the updated task Array to local Storage
  DisplayInfo(); //refresh the display
}

//add event listener for filter button
const btnFil = document.getElementById("filterDropdown");

document.getElementById("allTasks").addEventListener("click", function () {
  DisplayInfo();
  btnFil.innerText = document.getElementById("allTasks").innerText;
});

document
  .getElementById("inProgressTasks")
  .addEventListener("click", function () {
    //filter is an array method which is used to filter the element from original array based on some condition and returns a new array
    const inProgressTasksArray = taskArray.filter((task) => !task.completed);
    DisplayInfo(inProgressTasksArray); //inProgressTasks is new array created after filteration which has all the task not completed
    btnFil.innerText = document.getElementById("inProgressTasks").innerText;
  });

document
  .getElementById("completedTasks")
  .addEventListener("click", function () {
    const completedArray = taskArray.filter((task) => task.completed);
    DisplayInfo(completedArray);
    btnFil.innerText = document.getElementById("completedTasks").innerText;
  });

//SEARCH
const allTr = document.querySelectorAll("#records tr"); // select all the tr present inside records

//get text data from search
const searchInputField = document.querySelector("#search");

searchInputField.addEventListener("input", function (e) {
  // e is event object
  // console.log(e.target.value.toLowerCase());//toLowerCase() makes letters to lowercase

  const searchString = e.target.value.toLowerCase(); //getting the value user is typing inside search field

  recordsDisplay.innerHTML = ""; //making the display blank

  allTr.forEach((tr) => {
    //allTr is a nodelist and tr is value of tr element in each iteration
    // console.log("execting");
    const td_in_tr = tr.querySelectorAll("td"); //here we are getting td from tr

    // console.log(td_in_tr);

    //if is for checking
    if (td_in_tr[0].innerText.toLowerCase().indexOf(searchString) > -1) {
      //indexOf returns the index of found element and if not found it retuns -1
      recordsDisplay.appendChild(tr); // td_in_tr[0] means select 1st td
    }
  });

  if (recordsDisplay.innerHTML == "") {
    //if still no records found display no records found
    recordsDisplay.innerHTML = "no records found";
  }
});
