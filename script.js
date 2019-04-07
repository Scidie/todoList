/**
 * Main script file, currently handling all to-do list logic
 *
 * @version 1.0
 * @author Scidie
 */

var todoList = {
  todo: [],
  toggleList: [],
  todoId: '',

  addToggleListElement: function() {
    this.toggleList.push('( )') 
  },

  deleteToggleElement: function(position) {
    this.toggleList.splice(position, 1);
  },

  addTodo: function() {
    var todoInputValue = document.getElementById('add-todo-text-input');
    if (todoInputValue.value != '') {
      console.log('im here');
      this.todo.push({
        todoText: todoInputValue.value,
      })
    }
    todoInputValue.value = '';
    this.addToggleListElement();
    viewTodoList.displayTodo();
  },

  changeTodo: function(position, newValue) {
    this.todo[position].todoText = newValue;
    viewTodoList.displayTodo();
  },

  deleteTodo: function(position) {
    this.todo.splice(position, 1);
    viewTodoList.displayTodo();
  },

  toggleAll: function() {
    for (var i = 0; i < todoList.toggleList.length; i++) {

      if (todoList.toggleList[i] === '( )') {
        for (var i = 0; i < todoList.toggleList.length; i++) {
          todoList.toggleList[i] = '(x)';
        }
      } else {
        for (var i = 0; i < todoList.toggleList.length; i++) {
          todoList.toggleList[i] = '( )';
        }
      }
    }
    viewTodoList.displayTodo();
  }
}

// Viewing todoList_______________________________________________________________________________________________________
var viewTodoList = {
  displayTodo: function() {
    var theList = document.getElementById('list');
    theList.innerHTML = '';

    for (var i = 0; i < todoList.todo.length; i++) {
      var listElement = document.createElement('div');
      listElement.id = i;
      listElement.className = 'list-element';
      theList.appendChild(listElement);
      listElement.appendChild(createHTMLObject.createToggleElement(i));
      listElement.appendChild(createHTMLObject.createTextElement(i));
      listElement.appendChild(createHTMLObject.createButtonElement());
    } 
  }
}

//Functions creating HTML objects_________________________________________________________________________________________
var createHTMLObject = {

  createToggleElement: function(position) {
    var toggleElement = document.createElement('span')
    toggleElement.className = 'toggle-element';
    toggleElement.textContent = todoList.toggleList[position];
    return toggleElement;
  },

  createTextElement: function(position) {
    var textElement = document.createElement('span');
    textElement.className = 'text-of-list-element';
    textElement.textContent = todoList.todo[position].todoText;
    return textElement;
  },
  
  createButtonElement: function() {
    var buttonElement = document.createElement('button');
    buttonElement.className = 'delete-button';
    buttonElement.textContent = 'x';
    return buttonElement;
  }
}

//Event Listners of created HTML objects__________________________________________________________________________________
var ulList = document.getElementById('list');

var changeTodoButton = document.getElementById('change-todo-button');
var changeTodoTextInput = document.getElementById('change-todo-text-input');
var addButton = document.getElementById('add-button');
var todoTextInput = document.getElementById('add-todo-text-input');
var buttonsContainer = document.getElementById('buttons-container');
var firstLineButtons = document.getElementById('first-line-buttons');
var secondLineButtons = document.getElementById('second-line-buttons');

ulList.addEventListener('click', function(event) {
  console.log(event);
  var elementClicked = event.target;


  if (elementClicked.className === 'delete-button') {
    todoList.deleteTodo(parseInt(elementClicked.parentNode.id));
    todoList.deleteToggleElement(parseInt(elementClicked.parentNode.id));
  } 
  
  else if (elementClicked.className === 'toggle-element') {
      if (elementClicked.textContent === '( )') {
        todoList.toggleList[parseInt(elementClicked.parentNode.id)] = '(x)';
      }
      else {
        todoList.toggleList[parseInt(elementClicked.parentNode.id)] = '( )';
      }
  } 
  
  else if (elementClicked.className === 'text-of-list-element') {
    todoList.todoId = parseInt(elementClicked.parentNode.id);
    buttonsContainer.replaceChild(secondLineButtons, firstLineButtons);
    document.getElementById('second-line-buttons').style.visibility = 'visible';
    changeTodoTextInput.value = todoList.todo[parseInt(elementClicked.parentNode.id)].todoText;
  }
  viewTodoList.displayTodo();
});


changeTodoButton.addEventListener('click', function(event) {
  console.log(event);
  todoList.changeTodo(todoList.todoId, changeTodoTextInput.value);
  document.getElementById('second-line-buttons').style.visibility = 'hidden';
  buttonsContainer.replaceChild(firstLineButtons, secondLineButtons);
  changeTodoTextInput.value = '';
});

addButton.addEventListener('click', function(event) {
      todoList.addTodo();
      todoTextInput.value = '';
});






















