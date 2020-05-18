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
    )
}