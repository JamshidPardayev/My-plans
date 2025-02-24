let addPlan = document.getElementById("addPlan");
let inpPlan = document.getElementById("inpPlan");
let forTitle = document.getElementById("forTitle");


let formTitle = document.getElementById("formTitle")
let myPlans = document.getElementById("myPlans")
let addToList = document.getElementById("addToList")
let form = document.querySelector("form");
let h2 = document.querySelector("h2");
let users = [];
let currentIndex = null;

addPlan.addEventListener("click", function(){
    if(formTitle.classList.toggle("active")){
        addPlan.textContent = "Close Plan"
        h2.style.marginTop = "20px"
    }
    else{
        addPlan.textContent = "Add Plan";
        h2.style.marginTop = "-150px"
    }
});

form.addEventListener("submit", function(event){
    // event.preventDefault();
    check();
});


function check(){
    if(inpPlan.value.trim() != ""){
        create();
    }
}
function create(){
    if(currentIndex !== null){
        users[currentIndex] = {
            plan: inpPlan.value,
        };
        currentIndex = null;
    }
    else{
        users.push({
            plan: inpPlan.value,
        })
    }
    localStorage.setItem("usersKey", JSON.stringify(users));
    read();
}
(function () {
    users = JSON.parse(localStorage.getItem('usersKey'))
      ? JSON.parse(localStorage.getItem('usersKey'))
      : []
    read()
})();

function closeOpen(index){
    users[index].completed = !users[index].completed;
    localStorage.setItem("usersKey", JSON.stringify(users));
    read();
}
function deletePlan(index) {
    users.splice(index, 1);
    localStorage.setItem("usersKey", JSON.stringify(users));
    read();
}
function read() {
    myPlans.innerHTML = "";
    const today = new Date().toLocaleDateString();
    users.map((user, index) => {
        myPlans.innerHTML += `
        <div class="plan" style="background-color: ${user.completed ? 'green' : 'red'};">
            <div class="planTop">
                <p>${index + 1}</p>
                <p onclick="deletePlan(${index})" class='bx bx-x-circle'</p>
            </div>
            <h3>${user.plan}</h3>
            <p>${user.completed ? 'Vazifa bajarilgan!' : 'Bu vazifani qildizmi?'}</p>
            <p>${today}</p>
            <i onclick="closeOpen(${index})" class='bx ${user.completed ? 'bx-x' : 'bx-check'} check ${user.completed ? 'block' : 'hidden'}' id="checkIcon"></i>
        </div>
        `;
    });
}