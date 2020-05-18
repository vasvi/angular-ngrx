import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { StoreModule } from '@ngrx/store';
import { TodoReducer } from './reducers/todos.reducer';
import { EffectsModule} from '@ngrx/effects';
import { TodoEffects } from './effects/todo.effects';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ todos: TodoReducer}),
    EffectsModule.forRoot([TodoEffects])
  ],
  declarations: [
    AppComponent,
    TodoComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
