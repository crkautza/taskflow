//Elements
let addInput = document.getElementById('addInput');
let createBtn = document.getElementById('createBtn');
let generalList = document.getElementById('generalList');

//Vars
let tasks = [];

//Event Listener
createBtn.addEventListener('click', createTask);

function createTask() {
    if (addInput.value) {
    let name = addInput.value;
    tasks.push(
        name
    );
    listTask(name);
    }
}

function listTask(name) {
    let input = document.createElement('input');
    let span = document.createElement('span');
    let removebutton = document.createElement('button');
    let editbutton = document.createElement('button');
    input.type = 'checkbox';
    input.className = 'checkbox';
    span.textContent = name;
    removebutton.textContent = 'Remover';
    removebutton.className = 'removeBtn';
    editbutton.textContent = 'Editar';
    editbutton.className = 'editBtn';
    tasks.forEach((value, index) => {
        let li = document.createElement('li');
        li.id = `id-${index}`;
        generalList.appendChild(li);
        let list = document.getElementById(`id-${index}`);
        list.appendChild(input);
        list.appendChild(span);
        list.appendChild(removebutton);
        list.appendChild(editbutton);
    });
}

function removeTask() {
    
}