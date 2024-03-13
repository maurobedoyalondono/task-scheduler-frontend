import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { TaskCreationComponent } from './task-creation/task-creation.component';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: CreateUserComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'new-task', component: TaskCreationComponent },
      { path: 'tasks/:taskid', component: TaskDetailComponent },
    ])
  ],
  providers: [
    DatePipe
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    TaskListComponent,
    TaskDetailComponent,
    CreateUserComponent,
    TaskCreationComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }