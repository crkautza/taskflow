//Elements
let addInput = document.getElementById('addInput');
let createBtn = document.getElementById('createBtn');
let generalList = document.getElementById('generalList');

//Vars
let tasks = {};
let i = 0;

//Event Listener
createBtn.addEventListener('click', createTask);

//functions
function createTask() {
    if (addInput.value) {
        let name = addInput.value;
        let key = `id-${i}`;
        tasks[key] = {name: name, concluded: false};
        listTask(name);
        i++;
    }
}

function listTask(text = null, id = null) {
    let input = document.createElement('input');
    let span = document.createElement('span');
    let removebutton = document.createElement('button');
    let editbutton = document.createElement('button');
    input.type = 'checkbox';
    input.className = 'checkbox';
    removebutton.textContent = 'Remover';
    removebutton.className = 'removeBtn';
    editbutton.textContent = 'Editar';
    editbutton.className = 'editBtn';
    let li = document.createElement('li');
    Object.keys(tasks).forEach(chave => {
        if(id == null){
            span.textContent = text;
            li.id = chave;
            generalList.appendChild(li);
            let list = document.getElementById(chave);
            let elements = [input, span, removebutton, editbutton];
            appendArray(list, elements);
        }
    })
    if(id != null){
        text = tasks[id].name;
        span.textContent = text;
        let list = document.getElementById(id);
        let elements = [input, span, removebutton, editbutton];
        appendArray(list, elements);
        input.addEventListener('change', (event) => {
            concluded(event, id)
        });
        removebutton.addEventListener('click', () => removeTask(id));
        editbutton.addEventListener('click', () => editTask(id));
    }else{
        input.addEventListener('change', (event) => {
            concluded(event, li.id)
        });
        removebutton.addEventListener('click', () => removeTask(li.id));
        editbutton.addEventListener('click', () => editTask(li.id));
    }
}

function removeTask(id) {
    let removeLi = document.getElementById(id);
    generalList.removeChild(removeLi);
    delete tasks[id];
}

function editTask(id){
    let li = document.getElementById(id);
    let span = li.children[1];
    let removeBtn = li.children[2];
    let editBtn = li.children[3];
    let input = document.createElement('input');
    let saveBtn = document.createElement('button');
    let cancelBtn = document.createElement('button');
    let removeElements = [span, removeBtn, editBtn];
    let elements = [input, saveBtn, cancelBtn];
    input.id = id;
    saveBtn.className = 'editBtn';
    saveBtn.textContent = 'Salvar';
    cancelBtn.className = 'editBtn';
    cancelBtn.textContent = 'Cancelar';
    removeArray(li, removeElements);
    appendArray(li, elements);
    saveBtn.addEventListener('click', () => salveTask(input.value, id));
    cancelBtn.addEventListener('click', () => cancel(span.value, id));
}

function salveTask(text, id){
    if(text){
        let li = document.getElementById(id);
        let checkbox = li.children[0];
        let input = li.children[1];
        let saveBtn = li.children[2];
        let cancelBtn = li.children[3];
        let removeElements = [checkbox, input, saveBtn, cancelBtn];
        removeArray(li, removeElements);
        tasks[id].name = text;
        listTask(text, id);
    }
}

function cancel(text, id){
    let li = document.getElementById(id);
    let checkbox = li.children[0];
    let input = li.children[1];
    let saveBtn = li.children[2];
    let cancelBtn = li.children[3];
    let removeElements = [checkbox, input, saveBtn, cancelBtn];
    removeArray(li, removeElements);
    listTask(text, id);
}

function concluded(event, id){
    if(event.target.checked == true){
        tasks[id].concluded = true;
    }else{
        tasks[id].concluded = false;
    }
}

function appendArray(where, array){
    array.forEach(value =>{
        where.appendChild(value);
    });
}

function removeArray(where, array){
    array.forEach(value =>{
        where.removeChild(value);
    });
}