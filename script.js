/**
 * Main script file, currently handling all to-do list logic
 * // pomyslalem zeby dodac 
 * 
 * @version 1.0
 * @author Scidie
 */
var todoList = {
  todo: [],

  addTodo: function(todoText) {
    this.todo.push({
      todoText: todoText,
      completed: false
    })
  },

  changeTodo: function(position, newValue) {
    this.todo[position].todoText = newValue;
  },

  deleteTodo: function(position) {
    this.todo.splice(position, 1);
  },

  toggleCompleted: function(position) {
    var todo = this.todo[position - 1];
    todo.completed = !todo.completed;
  },

  toggleAll: function() {
    for (var i = 0; i < view.toggleList.length; i++) {

      if (view.toggleList[i] === '( )') {
        for (var i = 0; i < view.toggleList.length; i++) {
            view.toggleList[i] = '(x)';
        }
      } else {
        for (var i = 0; i < view.toggleList.length; i++) {
          view.toggleList[i] = '( )';
        }
      }
    }
  }
}

var handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodo();
  },

  /**
   * grabs input box reference, adds new element to list, ...
   * 
   * @author Scidie
   */
  addTodo: function() {
    var addTodo = document.getElementById('add-todo-text-input');

    if (addTodo.value != '') {
      todoList.addTodo(addTodo.value);
    }

    addTodo.value = '';
    view.addToggleListElement();
    view.displayTodo();
  },

  changeTodo: function(position, text) {
    todoList.changeTodo(position, text);
    view.displayTodo();
  },

  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodo();
  }
}

// Viewing list object________________________________________________________________________________________________
var view = {
  toggleList: [],
  changeTodo: '',
  addToggleListElement: function() {
    this.toggleList.push('( )') 
  },

  deleteToggleElement: function(position) {
    this.toggleList.splice(position, 1);
  },

  displayTodo: function() {
    var theList = document.querySelector('ul');
    theList.innerHTML = '';

    for (var i = 0; i < todoList.todo.length; i++) {
      var listElement = document.createElement('li');
      listElement.id = i;
      listElement.className = 'list-element';
      theList.appendChild(listElement);
      listElement.appendChild(this.createToggleElement(i));
      listElement.appendChild(this.createTextElement(i));
      listElement.appendChild(this.createButtonElement());
    } 
  },

  createToggleElement: function(position) {
    var toggleElement = document.createElement('li')
    toggleElement.className = 'toggle-element';
    toggleElement.textContent = view.toggleList[position];
    return toggleElement;
  },

  createTextElement: function(position) {
    var textElement = document.createElement('li');
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

// Main event listener_______________________________________________________________________________________________
var ulList = document.querySelector('ul');

ulList.addEventListener('click', function(event) {
  console.log(event);
  var elementClicked = event.target;
  var changeTextInput = document.getElementById('change-todo-text-input');

  // sets "to-do edit field" to the value of the to-do that is being edited
  changeTextInput.value = todoList.todo[parseInt(elementClicked.parentNode.id)].todoText;

  if (elementClicked.className === 'delete-button') {
    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    view.deleteToggleElement(parseInt(elementClicked.parentNode.id));
  } 
  
  else if (elementClicked.className === 'toggle-element') {
    console.log('klikam na element z id rownym: '+ elementClicked.parentNode.id);

      if (elementClicked.textContent === '( )') {
        view.toggleList[parseInt(elementClicked.parentNode.id)] = '(x)';
      }
      else {
        view.toggleList[parseInt(elementClicked.parentNode.id)] = '( )';
      }
  } 
  
  else if (elementClicked.className === 'text-of-list-element') {
    view.changeTodo = parseInt(elementClicked.parentNode.id);
    console.log('jest tutaj');
    document.getElementById('third-line-buttons').style.visibility = 'visible';
  }
  view.displayTodo();
});

var changeText = document.getElementById('change-todo-button');
var changeTextInput = document.getElementById('change-todo-text-input');

changeText.addEventListener('click', function(event) {
  console.log(event);
  var elementClicked = event.target;
  handlers.changeTodo(view.changeTodo, changeTextInput.value);
  document.getElementById('third-line-buttons').style.visibility = 'hidden';
  changeTextInput.value = '';
});














