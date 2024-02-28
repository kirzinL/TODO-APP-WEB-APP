import {initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase,ref,push,remove,onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://todo-list-6d255-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const todo = ref(database,"task")
const playeExp = ref(database,"PlayerExp")





let playerLevel = 1;
let paraEl = document.getElementById("para-el")
let inputEl = document.getElementById("input-val")
let btnEl = document.getElementById("btn-val")
let playerInfo = document.getElementById("player")

btnEl.addEventListener("click", function(){
   let Inputval = inputEl.value
    push(todo, Inputval)
    clearInput()
    
})


onValue(todo, function(snapshot){

   

if(snapshot.exists()){
    let todoItem = Object.entries(snapshot.val())
    clearTodo()
    for(let i = 0; i < todoItem.length; i++){
        let TodoArr = todoItem[i]
        // let TodoVal = TodoArr[1]
        // let TodoKey = TodoArr[0]
        Displaytask(TodoArr)

     }
}else{
    NothingTodo()
}


   
        
    
})





function NothingTodo(){
    paraEl.innerHTML = " Nothing Here... Add Some Task Dude"
}

function clearTodo(){
    paraEl.textContent = " "
}
function clearInput(){
    inputEl.value = " "
}

function Displaytask(display) {
    let TodoVal = display[1];
    let TodoKey = display[0];

    let card= document.createElement("card");
    card.classList.add("card");

    card.textContent= TodoVal; // Set text content before appending button

    let btnDone = document.createElement("button");
    btnDone.innerHTML= `Task Done <img  src="https://cdn-icons-png.flaticon.com/128/1055/1055183.png" width=12px>`;
    btnDone.classList.add("btn-done");





    card.append(btnDone);

    btnDone.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `task/${TodoKey}`);
        remove(exactLocationOfItemInDB);
       
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Sipag mo naman",
            showConfirmButton: false,
            timer: 1500
          });
        levelUp()
    });

    paraEl.appendChild(card);
}

function levelUp() {
    
    let levelexp = Math.floor(Math.random() * 10) + 1;

    let totalLevel = playerLevel + levelexp;

    playerLevel += levelexp; 

playerLevel; 
  
playerInfo.innerText = "Daily Power Level: "
    playerInfo.innerText += totalLevel
    console.log("total level: " + totalLevel);
}

