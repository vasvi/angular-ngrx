import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from '../actions/todos.actions';
import { ToDo } from '../model/todo.model';
import { ToDoState, initializeState } from './todos.state';

export const initialState = initializeState();
//export const getLoadingStatus = () => { return }

const reducer = createReducer(
    initialState,
    on(TodoActions.loadTodo, state => state),
    on(TodoActions.loadTodoSuccess, (state: ToDoState, { payload }) => {
        return {...state, Todos: payload, loading: false}
    }),
    on(TodoActions.loadTodoFailure, (state: ToDoState, error) => {
        return {...state, 
            Todos: [],
            loading: false,
            TodoError: error
        }
    }),
    on(TodoActions.createTodo, (state: ToDoState, todo: ToDo) => {
        return {...state,
            Todos: [...state.Todos, todo],
            TodoError: null,
            loading: true
        }
    }),
    on(TodoActions.createTodoSuccess, (state: ToDoState, {payload}) => {
        return {...state,
            Todos: [...state.Todos, payload],
            TodoError: null,
            loading: false
        }
    }),
    on(TodoActions.createTodoFailure, (state: ToDoState, error) => {
        return {...state,
            Todos: [...state.Todos],
            TodoError: error,
            loading: false
        }
    })
)

export function TodoReducer(state: ToDoState | undefined, action: Action) {
    return reducer(state, action)
}

// Prior to ngrx 8
/*
export const LOAD_TODOS = 'LOAD_TODOS';

export function todosReducer(state, action) {
    switch (action.type) {
        case LOAD_TODOS: 
            return state;
        default:
            return state;
    }
}*/