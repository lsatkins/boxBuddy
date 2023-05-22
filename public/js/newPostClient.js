let exerciseInput = document.getElementById('exercise');
let list = document.getElementById('list');
let allExercises = list.getElementsByClassName('exercises');
let idHolder = document.querySelector('.idHolder');

function search_exercise() {
    list.style.display = 'inline';
    let input = document.getElementById('exercise').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('exercises');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";         
        }
    }
}

exerciseInput.addEventListener('keyup', search_exercise);

list.addEventListener('click', (e) => {

    let exercise = e.target;
    let exerciseID = exercise.id;
    let exerciseName = exercise.innerText;
    exerciseInput.value = exerciseName;
    idHolder.value = exerciseID;

    list.style.display = 'none';

})