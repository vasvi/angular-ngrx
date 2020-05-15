import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpClientModule
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
