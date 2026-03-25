//Elements
let addInput = document.getElementById('addInput');
let createBtn = document.getElementById('createBtn');
let filterBtn = document.getElementById('filterBtn');
let allBtn = document.getElementById('allBtn');
let activeBtn = document.getElementById('activeBtn');
let concludedBtn = document.getElementById('concludedBtn');
let generalList = document.getElementById('generalList');

//Vars
let tasks = {};
let i = 0;
let iFilter = 0;
let Btn = 0;

//Event Listener
createBtn.addEventListener('click', createTask);
filterBtn.addEventListener('click', () => filterAnimation(allBtn, activeBtn, concludedBtn));
allBtn.addEventListener('click', allFilter);
activeBtn.addEventListener('click', activeFilter);
concludedBtn.addEventListener('click', concludedFilter);

getState();

//functions
function createTask() {
    if (addInput.value) {
        filterBtn.disabled = false;
        let name = addInput.value;
        let id = `id-${i}`;
        tasks[id] = {name: name, element: null, concluded: false};
        listTask(name, false, id);
        i++;
        setState();
        decidefilter();
        count();
    }
}

function listTask(text = null, editMode = false, id = null) {
    let {input, span, removebutton, editbutton, li} = createElements();
    if(editMode == false){
        span.textContent = text;
        li.id = id;
        generalList.appendChild(li);
        let list = document.getElementById(id);
        let elements = [input, span, removebutton, editbutton];
        appendArray(list, elements);
        tasks[id].element = list;
        input.addEventListener('change', (event) => {
            concluded(event, li.id, span, editbutton)
        });
        if(tasks[id].concluded == true){
            input.checked = true;
            span.className = 'concluded';
            editbutton.disabled = true;
        }
        removebutton.addEventListener('click', () => removeTask(li.id));
        editbutton.addEventListener('click', () => editTask(li.id));
    }else{
        text = tasks[id].name;
        span.textContent = text;
        let list = document.getElementById(id);
        let elements = [input, span, removebutton, editbutton];
        appendArray(list, elements);
        input.addEventListener('change', (event) => {
            concluded(event, id, span, editbutton)
        });
        removebutton.addEventListener('click', () => removeTask(id));
        editbutton.addEventListener('click', () => editTask(id));
    }
}

function renderAllTasks() {
    for (const key in tasks) {
        listTask(tasks[key].name, false, key);
    }
}

function removeTask(id) {
    let removeLi = document.getElementById(id);
    generalList.removeChild(removeLi);
    delete tasks[id];
    setState();
    decidefilter();
    count();
}

function editTask(id){
    let li = document.getElementById(id);
    let checkbox = li.children[0]
    let span = li.children[1];
    let text = span.textContent;
    let removeBtn = li.children[2];
    let editBtn = li.children[3];
    let input = document.createElement('input');
    let saveBtn = document.createElement('button');
    let cancelBtn = document.createElement('button');
    let removeElements = [checkbox, span, removeBtn, editBtn];
    let elements = [input, saveBtn, cancelBtn];
    input.id = id;
    input.className = 'editInput';
    input.value = text;
    saveBtn.className = 'saveBtn';
    saveBtn.textContent = 'Salvar';
    cancelBtn.className = 'cancelBtn';
    cancelBtn.textContent = 'Cancelar';
    removeArray(li, removeElements);
    appendArray(li, elements);
    saveBtn.addEventListener('click', () => salveTask(input.value, id));
    cancelBtn.addEventListener('click', () => cancel(span.value, id));
}

function salveTask(text, id){
    if(text){
        let li = document.getElementById(id);
        let input = li.children[0];
        let saveBtn = li.children[1];
        let cancelBtn = li.children[2];
        let removeElements = [input, saveBtn, cancelBtn];
        removeArray(li, removeElements);
        tasks[id].name = text;
        listTask(text, true, id);
        setState();
    }
}

function cancel(text, id){
    let li = document.getElementById(id);
    let input = li.children[0];
    let saveBtn = li.children[1];
    let cancelBtn = li.children[2];
    let removeElements = [input, saveBtn, cancelBtn];
    removeArray(li, removeElements);
    listTask(text, false, id);
}

function decidefilter(){
    if (allBtn.disabled == true) {
        allFilter();
    }
    if (activeBtn.disabled == true) {
        activeFilter();
    }
    if (concludedBtn.disabled == true) {
        concludedFilter();
    }
}

function concluded(event, id, span, editbutton){
    if(event.target.checked == true){
        tasks[id].concluded = true;
        span.className = 'concluded';
        editbutton.disabled = true;
        setState();
        count();
    }else{
        tasks[id].concluded = false;
        span.className = '';
        span.removeAttribute('class');
        editbutton.disabled = false;
        setState();
        count();
    }
    decidefilter();
}

function allFilter(){
    Btn = 0;
    disabledBtn(allBtn, activeBtn, concludedBtn);
    let concludedElements = [];
    let activeElements = [];
    for (const key in tasks) {
        if(tasks[key].concluded == true){
            concludedElements.push(tasks[key].element);
        }else{
            activeElements.push(tasks[key].element);
        }
    }
    generalList.innerHTML = '';
    appendArray(generalList, activeElements);
    appendArray(generalList, concludedElements);
    if(allBtn.hidden == false){
        voidMessage('Todas');
    }
}

function activeFilter(){
    Btn = 1;
    disabledBtn(allBtn, activeBtn, concludedBtn);
    let concludedElements = [];
    let activeElements = [];
    for (const key in tasks) {
        if(tasks[key].concluded == true){
            concludedElements.push(tasks[key].element);
        }else{
            activeElements.push(tasks[key].element);
        }
    }
    generalList.innerHTML = '';
    appendArray(generalList, activeElements);
    if(activeBtn.hidden == false){
        voidMessage('Ativas');
    }
}

function concludedFilter(){
    Btn = 2;
    disabledBtn(allBtn, activeBtn, concludedBtn);
    let concludedElements = [];
    let activeElements = [];
    for (const key in tasks) {
        if(tasks[key].concluded == true){
            concludedElements.push(tasks[key].element);
        }else{
            activeElements.push(tasks[key].element);
        }
    }
    generalList.innerHTML = '';
    appendArray(generalList, concludedElements);
    if(concludedBtn.hidden == false){
        voidMessage('Concluidas');
    }
}

function appendArray(where, array){
    if(array){
        array.forEach(value =>{
            where.appendChild(value);
        });
    }
}

function removeArray(where, array){
    if(array){
        array.forEach(value =>{
        where.removeChild(value);
        });
    }
}

function disabledBtn(btn1, btn2, btn3){
    switch (Btn) {
        case 1:
            btn1.disabled = false;
            btn2.disabled = true;
            btn3.disabled = false;
            createBtn.disabled = false;
            break;
        case 2:
            btn1.disabled = false;
            btn2.disabled = false;
            btn3.disabled = true;
            createBtn.disabled = true;
            break;
        default:
            btn1.disabled = true;
            btn2.disabled = false;
            btn3.disabled = false;
            createBtn.disabled = false;
            break;
    }
}

function filterAnimation(btn1, btn2, btn3){
    btn1.removeAttribute('hidden');
    btn2.removeAttribute('hidden');
    btn3.removeAttribute('hidden');
    if(iFilter >= 1){
    btn1.setAttribute('hidden', 'true');
    btn2.setAttribute('hidden', 'true');
    btn3.setAttribute('hidden', 'true');
    iFilter = 0;
    allFilter();
    }else{
        iFilter++;
        decidefilter();
        voidMessage();
    }
}

function voidMessage(filterName) {
    if(generalList.innerHTML == ''){
        let div = document.createElement('div');
        let span = document.createElement('span');
        let colorSpan = document.createElement('span');
        div.className = 'notFound'
        span.className = 'baseSpan'
        colorSpan.className = 'colorSpan'
        colorSpan.textContent = `${filterName}`;
        span.textContent = 'Nenhum conteúdo para o filtro'; 
        generalList.appendChild(div);
        div.appendChild(span);
        div.appendChild(colorSpan);
    }
}

function count() {
    let countAll = document.getElementById('countAll');
    let countConcluded = document.getElementById('countConcluded');
    let countActives = document.getElementById('countActives');
    let iActive = 0;
    let iConcluded = 0;
    for (const key in tasks) {
        if(tasks[key].concluded == true){
            iConcluded++;
            countConcluded.textContent = iConcluded;
        }else{
            iActive++;
            countActives.textContent = iActive;
        }
    }
    countAll.textContent = iActive + iConcluded;
    countConcluded.textContent = iConcluded;
    countActives.textContent = iActive;
}

function setState() {
    let Stringtask = JSON.stringify(tasks);
    localStorage.setItem('task', Stringtask);
}

function getState() {
    let StringTask = localStorage.getItem('task');
    if(StringTask){
        let taskParse = JSON.parse(StringTask);
        tasks = taskParse;
        generalList.innerHTML = '';
        renderAllTasks();
        for (const key in tasks) {
            tasks[key].element = document.getElementById(key);
        }
        decidefilter();
        count();
    }
}

function createElements() {
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
    let elements = {input, span, removebutton, editbutton, li};
    return elements;
}