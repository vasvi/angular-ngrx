import { createAction, props } from '@ngrx/store';
import { ToDo } from '../model/todo.model';

export const loadTodo = createAction('[Todos] load todos');
export const loadTodoSuccess = createAction('[Todos] load todos success', props < {payload: ToDo[]} >());
export const loadTodoFailure = createAction('[Todos] load todos failure', props<Error>());

export const createTodo = createAction('[Todos] create todos', props<{payload: ToDo}>());
export const createTodoSuccess = createAction('[Todos] create Todo success', props<{ payload: ToDo}>());
export const createTodoFailure = createAction('[Todos] create Todo failure', props<Error>());

export const deleteTodo = createAction('[Todo] delete todo', props<{ payload: ToDo}>());
export const deleteTodoSuccess = createAction('[Todo] delete todo success', props<{ payload: ToDo}>());
export const deleteTodoFailure = createAction('[Todo] delete todo failure', props<Error>());