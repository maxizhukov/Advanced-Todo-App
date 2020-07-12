const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const hintContainer = document.querySelector('.hint-container')
const filterOption = document.querySelector('.filter-todo')
const trashAudio = document.getElementById('trash')
const successAudio = document.getElementById('success')
const addAudio = document.getElementById('add')
const blockedAudio = document.getElementById('blocked')
const progress = document.getElementById('progress')
const reset = document.querySelector('.reset-button')
const soundButton = document.querySelector('.sound')
const soundGood = document.getElementById('good')


soundButton.addEventListener('click', soundToggle)

reset.addEventListener('click', function () {
    localStorage.clear()
    location.reload()
    }
)

document.addEventListener('DOMContentLoaded', getTodos)

todoButton.addEventListener('click', addTodo)


todoList.addEventListener('click', deleteCheck)

filterOption.addEventListener('click', filterTodo)


function soundToggle() {
    soundButton.classList.toggle('nosound')
}

function addTodo(event) {
    event.preventDefault()

    if (todoInput.value.length > 0) {
        hintContainer.style.display = 'none'
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        const newTodo = document.createElement('li')
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        saveLocalTodos(todoInput.value)


        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-button')
        todoDiv.appendChild(completedButton)
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-button')
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv)
        todoInput.value = ''
        test()
        styles()
        if (!soundButton.classList.contains('nosound')) {
            playAdd()
        }


    } else {
        const hint = document.createElement('div')
        hint.classList.add('hint')
        const hintText = document.createElement('p')
        hintText.innerText = 'You need to write here something'
        hint.appendChild(hintText)
        hintContainer.appendChild(hint)
        if (!soundButton.classList.contains('nosound')) {
            playBlocked()
        }
    }
}


function deleteCheck(e) {
    const item = e.target
    if(item.classList[0] === 'trash-button') {
        if (!soundButton.classList.contains('nosound')) {
            playTrash()
        }
        const todo = item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove()
            test()
            styles()
        })
    }
    if (item.classList[0] === 'complete-button') {
        if (!soundButton.classList.contains('nosound')) {
            playSuccess()
        }
        const todo = item.parentElement
        todo.classList.toggle('completed')
        test()
        styles()
    }
}

function playTrash() {
    trashAudio.play()
}

function playSuccess() {
    successAudio.play()
}

function playAdd() {
    addAudio.play()
}

function playBlocked() {
    blockedAudio.play()
}


function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
}

function saveLocalTodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function styles() {
    let stylesArr = []
    const todoss = todoList.childNodes
    let arr = Array.from(todoss)
    for (let i = 0; i < arr.length; i++) {
        stylesArr.push(arr[i].classList.value)
    }
    saveLocalStyles(stylesArr)
}

function saveLocalStyles(style) {
    localStorage.setItem('styles', JSON.stringify(style))
}

function getTodos() {
    let todos
    let styles
    if (localStorage.getItem('todos') === null) {
        todos = []
        styles = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
        styles = JSON.parse(localStorage.getItem('styles'))
    }
    let count = 0
    todos.forEach(function (todo, style) {
        count++
        const todoDiv = document.createElement('div')
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-button')
        todoDiv.appendChild(completedButton)
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-button')
        if ((styles[style] === 'todo completed')) {
            todoDiv.classList.add('todo', 'completed')
        } else {
            todoDiv.classList.add('todo')
        }
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv)
        test()
    })
}

function removeLocalTodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}


function test() {
    let res
    let col = 0
    let count = 0
        const todoss = todoList.childNodes
        let arr = Array.from(todoss)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].classList.value.includes("completed")) {
                count++
            }
            if (arr[i].classList.value.includes("todo")) {
                col++
            }
            }
        res = count / col
        progress.value = res*100
    if (res === 1) {
        alert('You are the Best!But...Sorry')
        playGood()
    }
}

function playGood() {
    soundGood.play()
}






