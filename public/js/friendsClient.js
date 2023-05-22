let userInput = document.getElementById('user');
let list = document.getElementById('list');
let allUsers = list.getElementsByClassName('users');
let idHolder = document.querySelector('.idHolder');

function search_exercise() {
    list.style.display = 'inline';
    let input = document.getElementById('user').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('users');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";         
        }
    }
}

userInput.addEventListener('keyup', search_exercise);

list.addEventListener('click', (e) => {

    let user = e.target;
    console.log(user);
    let friendID = user.id;
    let userName = user.innerText;
    userInput.value = userName;
    idHolder.value = friendID;

    list.style.display = 'none';

})