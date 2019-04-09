/**
 * Main script file, currently handling all to-do list logic
 *
 * @version 1.1
 * @author Scidie
 */


let completedImage = document.createElement('img');
completedImage.src = 'images/tick-305245_640.png';
completedImage.className = 'completed-image';
    
let notCompletedImage = document.createElement('img');
notCompletedImage.src = 'images/minus-1270000_640.png';
notCompletedImage.className = 'not-completed-image';

let todoList = {
    todo: [],
    toggleList: [],
    todoId: '',
    
    addToggleListElement: function () {
        this.toggleList.push(notCompletedImage);
        console.log(this.toggleList);
    },

    deleteToggleElement: function (position) {
        this.toggleList.splice(position, 1);
    },

    addTodo: function () {
        const todoInputValue = document.getElementById('add-todo-text-input');

        if (todoInputValue.value !== '') {
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
        var emptyToggles = 0;
        for (let i = 0; i < todoList.toggleList.length; i++) { 
            if (todoList.toggleList[i] === '( )') {
                emptyToggles++;
            }
        }
        if (emptyToggles == 0) {
            for (let i = 0; i < todoList.toggleList.length; i++) { 
                todoList.toggleList[i] = '( )';
            }
        } else {
            for (let i = 0; i < todoList.toggleList.length; i++) { 
                todoList.toggleList[i] = '(x)';
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
            listElement.appendChild(createHTMLObject.createToggleElement(todoList.toggleList[i]));
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
        toggleElement.appendChild(position);
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
let changeTodoTextInput = document.getElementById('change-todo-text-input');
const addButton = document.getElementById('add-button');
const todoTextInput = document.getElementById('add-todo-text-input');
const buttonsContainer = document.getElementById('buttons-container');
const firstLineButtons = document.getElementById('first-line-buttons');
const secondLineButtons = document.getElementById('second-line-buttons');
let mainContainer = document.getElementById('main-container');


/** Event listener for the list containing all to-do's */
ulList.addEventListener('click', function (event) {
    console.log(event);
    const elementClicked = event.target;

    let imageParent = elementClicked.parentNode;
    console.log('zalukaj tu: ' + imageParent.className);

    changeTodoTextInput.value = todoList.todo[parseInt(imageParent.parentNode.id)].todoText;
    console.log(todoList.todo[parseInt(imageParent.parentNode.id)]);

    if (elementClicked.className === 'delete-button') {
        todoList.deleteTodo(parseInt(elementClicked.parentNode.id));
        todoList.deleteToggleElement(parseInt(elementClicked.parentNode.id));

    } else if (elementClicked.className === 'not-completed-image') {
            todoList.toggleList[parseInt(imageParent.parentNode.id)] = completedImage;

    } else if (elementClicked.className === 'completed-image') {
            todoList.toggleList[parseInt(imageParent.parentNode.id)] = notCompletedImage;

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

/** Event listener which handles replacing "change to-do" elements, with "add to-do" elements. */
mainContainer.addEventListener('click', function (event) {
  const elementClicked = event.target;

  if (elementClicked.id !== 'change-todo-button' && elementClicked.id !== 'change-todo-text-input'
      && elementClicked.className !== 'text-of-list-element') {
    buttonsContainer.replaceChild(firstLineButtons, secondLineButtons);
  }
});
