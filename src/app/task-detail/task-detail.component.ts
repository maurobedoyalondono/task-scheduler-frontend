import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { interval, Subscription } from 'rxjs';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  task: any;
  params = {
    TASK_ID: 'taskid'
  };
  errorLoadingTaskInfo: boolean = false;
  private timerSubscription: any;
  TASK_DETAIL_UPDATE_INTERVAL_IN_MILLISECONDS: number = 30000;

  objectKeys = Object.keys;
  isArray = Array.isArray;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const taskid = routeParams.get(this.params.TASK_ID);

    if (taskid) {
      this.getTaskDetails(taskid);

      this.timerSubscription = interval(this.TASK_DETAIL_UPDATE_INTERVAL_IN_MILLISECONDS)
      .subscribe(() => {
        this.getTaskDetails(taskid);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getTaskDetails(taskid) {
    this.taskService.getTask(taskid).subscribe({
      next: (task) => this.task = task,
      error: (e) => {
        console.error(e);
        this.errorLoadingTaskInfo = true;
      }
    });
  }

  formatDate(dateString: string): string | null {
    const date = new Date(dateString);
    // Format the date using DatePipe
    return this.datePipe.transform(date, 'MMMM d, HH:mm:ss');
  }
}
