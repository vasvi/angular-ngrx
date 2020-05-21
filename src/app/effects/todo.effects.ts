import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from "rxjs";
import * as TodoActions from '../actions/todos.actions';
import { mergeMap, catchError, map } from "rxjs/operators";
import { ToDo } from "../model/todo.model";

@Injectable()
export class TodoEffects {
    constructor(
        private http: HttpClient,
        private action$: Actions
    ) {}

    private apiUrl = 'http://localhost:8000/api/todos';

    loadTodo$: Observable<Action> = createEffect(() => 
        this.action$.pipe(
            ofType(TodoActions.loadTodo),
            mergeMap(
                (action) =>
                this.http.get(this.apiUrl).pipe(
                    map((data: ToDo[]) => {
                        console.log(data);
                        return TodoActions.loadTodoSuccess({payload: data})
                    })
                )),
            catchError((error: Error) => {
                console.log(error);
                return of(TodoActions.loadTodoFailure(error))
            })
        )
    );

    createTodo$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(TodoActions.createTodo),
            mergeMap(
                (action) => (
                console.log(action.payload),
                this.http
                .post(this.apiUrl, action.payload, {
                  headers: { 'Content-Type': 'application/json' }
                }).pipe(
                    map((data: ToDo) => {
                        console.log(data);
                        return TodoActions.createTodoSuccess({payload: data})
                })
        ))),
            catchError((error: Error) => {
                return of(TodoActions.createTodoFailure)
            })
        )
    );

    deleteTodo$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(TodoActions.deleteTodo),
            mergeMap(
                (action) => (
                    this.http.delete(`${this.apiUrl}/${action.payload.id}`)
                    .pipe(map((data) => {
                        return TodoActions.deleteTodoSuccess({payload: action.payload})
                    })
            ))),
            catchError((error: Error) => {
                return of(TodoActions.createTodoFailure)
            }
        ))
    );
}