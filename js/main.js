let todoArray = []



const createAppTitle = (title) => {
    const appTitle = document.createElement('h1')
    appTitle.innerHTML = title

    return appTitle
}

const createTodoForm = () => {
    const form = document.createElement('form'),
          input = document.createElement('input'),
          addButton = document.createElement('button'),
          wrapper = document.createElement('div')

    form.classList.add('input-group', 'mb-3')
    input.classList.add('form-control')      
    input.placeholder = 'Введите задачу'
    addButton.classList.add('btn', 'btn-primary')
    addButton.innerHTML = 'Добавить'
    wrapper.classList.add('input-group-append')

    wrapper.append(addButton)
    form.append(input)
    form.append(wrapper)

    return {
        form,
        input,
        addButton
    }

}

const createTodoList = () => {
    const list = document.createElement('ul')
    list.classList.add('list-group')

    return list
}

const createTodoItem = (name) => {
    const todoItem = document.createElement('li'),
          btnWrapper = document.createElement('div'),
          btnDone = document.createElement('button'),
          btnDelete = document.createElement('button')

    const randomId = Math.random() * 15.75
    todoItem.id = randomId.toFixed(2)      

    todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
    btnDone.classList.add('btn', 'btn-success')      
    btnDelete.classList.add('btn', 'btn-danger')
    todoItem.textContent = name
    btnDone.textContent = 'Готово'
    btnDelete.textContent = 'Удалить'
    
    btnWrapper.append(btnDone, btnDelete)
    todoItem.append(btnWrapper)

    return {
        todoItem,
        btnDone,
        btnDelete
    }
}

const changeItemDone = (arr, item) => {
    arr.map(obj => {
        if (obj.id === item.id && obj.done === false) {
            obj.done = true
        } else {
            obj.done = false
        }
    })
}

const completeTodoItem = (item, btn) => {
    btn.addEventListener('click', () => {
        todoArray = JSON.parse(localStorage.getItem(key))
        item.classList.toggle('list-group-item-success')
        changeItemDone(todoArray, item)


        localStorage.setItem(key, JSON.stringify(todoArray))
    })
}

const deleteTodoItem = (item, btn) => {
    btn.addEventListener('click', () => {
        if (confirm('Вы точно хотите удалить задание?')) {
            item.remove()
        }
    })
}

function createTodoApp(container, title, key) {
    const appTitle = createAppTitle(title),
          appForm = createTodoForm(),
          appList = createTodoList()

    container.append(appTitle, appForm.form, appList)

    appForm.form.addEventListener('submit', (e) => {
        e.preventDefault()

        const todoItem = createTodoItem(appForm.input.value)

        if (!appForm.input.value) return

        completeTodoItem(todoItem.todoItem, todoItem.btnDone)
        deleteTodoItem(todoItem.todoItem, todoItem.btnDelete)



        const createItemObj = (arr) => {
            const itemObj = {}

            itemObj.name = appForm.input.value
            itemObj.id = todoItem.todoItem.id
            itemObj.done = false

            arr.push(itemObj)
        }
        createItemObj(todoArray)
        localStorage.setItem(key, JSON.stringify(todoArray))

        appList.append(todoItem.todoItem)
        appForm.input.value = ''
    })
}
