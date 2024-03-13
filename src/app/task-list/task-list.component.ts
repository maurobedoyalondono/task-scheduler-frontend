import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { tasks } from '../tasks';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: any = [];
  errorLoadingTasksInfo: boolean = false;

  constructor(private router: Router, private taskService: TaskService) { }
  ngOnInit(): void {
    this.taskService.getUserTasks().subscribe({
      next: tasks => {        
        this.tasks = tasks;
      },
      error: (e) => {
        console.error(e);
        this.errorLoadingTasksInfo = true;
      }
    })
  }

  navigateToTaskCreation() {
    this.router.navigate(['/new-task']);
  }
}
