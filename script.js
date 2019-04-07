/**
 * Main script file, currently handling all to-do list logic
 *
 * @version 1.1
 * @author Scidie
 */
let todoList = {
    todo: [],
    toggleList: [],
    todoId: '',

    addToggleListElement: function () {
        this.toggleList.push('( )')
    },

    deleteToggleElement: function (position) {
        this.toggleList.splice(position, 1);
    },

    addTodo: function () {
        const todoInputValue = document.getElementById('add-todo-text-input');

        if (todoInputValue.value !== '') {
            console.log('todoInputValue is not empty!');
            this.todo.push({
                todoText: todoInputValue.value,
            })
        }

        todoInputValue.value = '';
        this.addToggleListElement();
        viewTodoList.displayTodo();
    },

    changeTodo: function (position, newValue) {
        this.todo[position].todoText = newValue;
        viewTodoList.displayTodo();
    },

    deleteTodo: function (position) {
        this.todo.splice(position, 1);
        viewTodoList.displayTodo();
    },

    toggleAll: function () {
        for (let i = 0; i < todoList.toggleList.length; i++) {

            if (todoList.toggleList[i] === '( )') {
                for (i = 0; i < todoList.toggleList.length; i++) {
                    todoList.toggleList[i] = '(x)';
                }
            } else {
                for (i = 0; i < todoList.toggleList.length; i++) {
                    todoList.toggleList[i] = '( )';
                }
            }
        }
        viewTodoList.displayTodo();
    }
};

/** Viewing todoList */
const viewTodoList = {
    displayTodo: function () {
        const theList = document.getElementById('list');
        theList.innerHTML = '';

        for (let i = 0; i < todoList.todo.length; i++) {
            const listElement = document.createElement('li');

            listElement.id = i.toString();
            listElement.className = 'list-element';
            theList.appendChild(listElement);
            listElement.appendChild(createHTMLObject.createToggleElement(i));
            listElement.appendChild(createHTMLObject.createTextElement(i));
            listElement.appendChild(createHTMLObject.createButtonElement());
        }
    }
};

/** Functions creating HTML objects */
const createHTMLObject = {
    createToggleElement: function (position) {
        const toggleElement = document.createElement('li');

        toggleElement.className = 'toggle-element';
        toggleElement.textContent = todoList.toggleList[position];
        return toggleElement;
    },

    createTextElement: function (position) {
        const textElement = document.createElement('li');

        textElement.className = 'text-of-list-element';
        textElement.textContent = todoList.todo[position].todoText;
        return textElement;
    },

    createButtonElement: function () {
        const buttonElement = document.createElement('button');

        buttonElement.className = 'delete-button';
        buttonElement.textContent = 'x';
        return buttonElement;
    }
};

// Event Listeners of created HTML objects
const ulList = document.getElementById('list');

const changeTodoButton = document.getElementById('change-todo-button');
const changeTodoTextInput = document.getElementById('change-todo-text-input');
const addButton = document.getElementById('add-button');
const todoTextInput = document.getElementById('add-todo-text-input');
const buttonsContainer = document.getElementById('buttons-container');
const firstLineButtons = document.getElementById('first-line-buttons');
const secondLineButtons = document.getElementById('second-line-buttons');
let mainContainer = document.getElementById('main-container');

/** Event listener for the list containing all to-do's */
ulList.addEventListener('click', function (event) {
    const elementClicked = event.target;

    changeTodoTextInput.value = todoList.todo[parseInt(elementClicked.parentNode.id)].todoText;

    if (elementClicked.className === 'delete-button') {
        todoList.deleteTodo(parseInt(elementClicked.parentNode.id));
        todoList.deleteToggleElement(parseInt(elementClicked.parentNode.id));

    } else if (elementClicked.className === 'toggle-element') {
        if (elementClicked.textContent === '( )') {
            todoList.toggleList[parseInt(elementClicked.parentNode.id)] = '(x)';
        } else {
            todoList.toggleList[parseInt(elementClicked.parentNode.id)] = '( )';
        }

    } else if (elementClicked.className === 'text-of-list-element') {
        todoList.todoId = parseInt(elementClicked.parentNode.id);
        buttonsContainer.replaceChild(secondLineButtons, firstLineButtons);
        document.getElementById('second-line-buttons').style.visibility = 'visible';
        changeTodoTextInput.value = todoList.todo[parseInt(elementClicked.parentNode.id)].todoText;
    }
    viewTodoList.displayTodo();
});

/**
 * When {@link changeTodoButton} is pressed, changes the text of to-do that's being edited, hides all elements related
 * to editing to-do's and clears input field.
 */
changeTodoButton.addEventListener('click', function (event) {
    console.log(event);
    todoList.changeTodo(todoList.todoId, changeTodoTextInput.value);
    document.getElementById('second-line-buttons').style.visibility = 'hidden';
    buttonsContainer.replaceChild(firstLineButtons, secondLineButtons);
    changeTodoTextInput.value = '';
});

addButton.addEventListener('click', function () {
    todoList.addTodo();
    todoTextInput.value = '';
});

mainContainer.addEventListener('click', function(event) {
  const elementClicked = event.target;
  if (elementClicked.id !== 'change-todo-button' && elementClicked.id !== 'change-todo-text-input' && elementClicked.className !== 'text-of-list-element') {
    buttonsContainer.replaceChild(firstLineButtons, secondLineButtons);
  
  }
});












