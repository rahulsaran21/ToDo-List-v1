// getting all required elements
const inputf = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todo = document.querySelector(".todolist");
const deleteAll = document.querySelector(".footer button");

// onkeyup event
inputf.onkeyup = function() {
    let userData = inputf.value; // getting user entered value

    if(userData.trim() != 0){ // if the user value isn't only spaces
        addBtn.classList.add("active"); // active the add button
    }else{
        addBtn.classList.remove("active"); //  unactive the add button
    }
}

showTask(); // calling showTask function

inputf.addEventListener("keyup", e => { // when user press ENTER button it triggers
    e.preventDefault();
    if(e.keyCode == 13){
        console.log("key");
        addBtn.click();
        addBtn.onclick = function () { // when user click on plus icon button it triggers
            let userData = inputf.value; // getting input field value
            let getData = localStorage.getItem("New ToDo"); // getting localstorage
        
            if(getData == null){ // if localstorage has no data
                listArr = []; // create a blank array
            }else{
                listArr = JSON.parse(getData);  //  transforming String to JSON Object
            }
        
            const pendingNumber = document.querySelector(".pendingNumber");
            pendingNumber.textContent = listArr.length ; // passing the array length in pendingtask
            listArr.push(userData); // pushing or adding new value in array
            localStorage.setItem("New ToDo", JSON.stringify(listArr)); // transforming js object into a json string
            showTask(); // calling showTask function
            addBtn.classList.remove("active"); // unactive the add button once the task added
        }
    }
})

function showTask() {
    let getData = localStorage.getItem("New ToDo");

    if(getData == null){ 
        listArr = [];
    }else{
        listArr = JSON.parse(getData);  // String to JSON Object
    }

    if(listArr.length > 0){ // if array length is greater than 0
        deleteAll.classList.add("active"); // active the delete button
    }else{
        deleteAll.classList.remove("active"); // unactive the delete button
    }

    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length ;
    let newList = '';
    listArr.forEach((element, index) => {
        newList += `<li> ${element} <span onclick = "deleteToDo(${index})"><i class="fa-solid fa-trash"></i></span></li>`;
    });

    todo.innerHTML = newList; // adding new li tag inside ul tag
    inputf.value = ""; // once task added leave the input field blank

}

//  delete task function
function deleteToDo(index) {
    let getData = localStorage.getItem("New ToDo");
    listArr = JSON.parse(getData);  // String to JSON Object
    listArr.splice(index, 1); // delete or remove the li
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTask(); // call the showTasks function
}

//  delete all tasks function

deleteAll.onclick = function deleteAllToDo(){
    listArr = []; // empty the array
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTask(); // call the showTasks function
}