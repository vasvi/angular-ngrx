import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  constructor(
    private http: HttpClient
  ) {}

  todoArray;
  todo: {
    name,
    completed
  };
  @ViewChild('todoForm') todoForm;

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    this.http.get('http://localhost:8000/api/todos').subscribe((data) => {
      this.todoArray = data;
    },
    err => console.log('error'))
  }

  addTodo(value) {
    if (value !== "") {
      let todo = {
        name: value,
        completed: false
      }

      this.todoArray.push(todo);
      this.todoForm.reset();
    } else {
      alert('Field required **');
    }
  }

  deleteTodo(todo)  {
    console.log(todo);
    console.log('before', this.todoArray);
    this.todoArray = this.todoArray.filter(todoItem => todoItem.name !== todo.name);
    console.log('After', this.todoArray);
  }

  markDone(todo) {
    this.todoArray.map((todoItem) => {
      if (todoItem.name === todo.name) {
        todoItem.completed = !todoItem.completed;
      }
    })

    
  }

  todoSubmit(value: any) {
    if (value !== "") {
      let todo = {
        name: value.todo,
        completed: false
      }
      this.todoArray.push(todo);
      this.todoForm.reset();
    } else {
      alert('Field required **');
    }
  }
}
