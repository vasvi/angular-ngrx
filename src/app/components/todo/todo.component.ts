import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '../../model/todo.model';
import { select, Store} from '@ngrx/store';
import { ToDoState } from 'src/app/reducers/todos.state';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as TodoActions from '../../actions/todos.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  constructor(
    private http: HttpClient,
    private store: Store<{todos: ToDoState}>
  ) {}
  
  todos$: Observable<ToDoState>;
  todoArray;
  loading;
  loadTodosSubs: Subscription
  @ViewChild('todoForm') todoForm;

  ngOnInit() {
    // Select from state
    this.todos$ = this.store.pipe(select('todos'))

    // Subscribe to state change
    this.loadTodosSubs = this.todos$
      .pipe(
        map(x => {
          this.loading = x.loading;
          this.todoArray = x.Todos;
        })
      ).subscribe()

    // Dispatch action to load todos
    this.store.dispatch(TodoActions.loadTodo());
  }

  addTodo(value) {
    if (value !== "") {
      let todo: ToDo = {
        title: value,
        completed: false
      }
      // Dispatch action to create a new Todo
      this.store.dispatch(TodoActions.createTodo({
        payload: todo
      }));

      //this.todoArray.push(todo);
      this.todoForm.reset();
    } else {
      alert('Field required **');
    }
  }

  deleteTodo(todo)  {
    console.log(todo);
    console.log('before', this.todoArray);
    //this.todoArray = this.todoArray.filter(todoItem => todoItem.name !== todo.name);
    this.store.dispatch(TodoActions.deleteTodo({
      payload: todo
    }));
    
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

  ngOnDestroy() {
    if (this.loadTodosSubs) {
      this.loadTodosSubs.unsubscribe();
    }
  }
}
