import { ToDo } from '../model/todo.model';
export interface ToDoState {
    Todos: Array<ToDo>;
    TodoError: Error;
    loading: boolean;
}

export const initializeState = (): ToDoState => {
    return {
        Todos: Array<ToDo>(),
        TodoError: null,
        loading: true
    }
}