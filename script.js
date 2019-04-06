var todoList = {
  todo: [],
  addTodo: function(todoText) {
    this.todo.push({
      todoText: todoText,
      completed: false
    })
  },
  changeTodo: function(position, newValue) {
    this.todo[position-1].todoText = newValue;
  },
  deleteTodo: function(position) {
    this.todo.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todo[position - 1];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var allTodos = this.todo.length;
    var completedTodos = 0;
    for (var i = 0; i < this.todo.length; i++) {
      if (this.todo[i].completed === true) {
        completedTodos++;
      }
    }
    if (completedTodos === allTodos) {
      for (var i = 0; i < this.todo.length; i++) {
        this.todo[i].completed = false;
      }
    }
    else {
      for (var i = 0; i < this.todo.length; i++) {
        this.todo[i].completed = true;
      }
    }
  }
}

var handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodo();
  },
  addTodo: function() {
    var addTodo = document.getElementById('add-todo-text-input');
    if (addTodo.value != '') {
    todoList.addTodo(addTodo.value);
    }
    addTodo.value = '';
    view.addToggleListElement();
    view.displayTodo();
  },
  changeTodo: function() {
    var todoChangePositionInput = document.getElementById('todo-change-position-input');
    var changeTodoTextInput = document.getElementById('change-todo-text-input');
    todoList.changeTodo(todoChangePositionInput.valueAsNumber, changeTodoTextInput.value);
    todoChangePositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodo();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodo();
  }
}
//Viewing list object________________________________________________________________________________________________
var view = {
  toggleList: [],
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
    console.log('stworzony zostaje toggleElement i przypisana mu zostaje wartosc: ' + toggleElement.textContent + ' z listy: ' + this.toggleList);
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
//Main event listener_______________________________________________________________________________________________
var ulList = document.querySelector('ul');
ulList.addEventListener('click', function(event) {
  console.log(event);
  var elementClicked = event.target;
  console.log('klikam na' + elementClicked.className);
  if (elementClicked.className === 'delete-button') {
    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    view.deleteToggleElement(parseInt(elementClicked.parentNode.id));
  }
  else if (elementClicked.className === 'toggle-element') {
    console.log('klikam na element z id rownym: '+ elementClicked.parentNode.id);
    if (elementClicked.textContent === '( )') {
      view.toggleList[parseInt(elementClicked.parentNode.id)] = '(x)';
      console.log('tutaj drugi: ' + view.toggleList[parseInt(elementClicked.id)]);
    }
    else {
      view.toggleList[parseInt(elementClicked.parentNode.id)] = '( )';
    }
  }
  view.displayTodo();
});














