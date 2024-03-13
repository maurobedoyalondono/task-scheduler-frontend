import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent implements OnInit {
  taskForm: FormGroup;
  timeUnitOptions = ['Seconds', 'Minutes', 'Hours'];
  valueOptions: number[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private taskService: TaskService) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      timeUnit: ['', Validators.required],
      value: [{value: '', disabled: true}, Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]]
    });
  }

  ngOnInit(): void {
  }

  onTimeUnitChange(timeUnit: string) {
    this.taskForm.get('value')!.enable();
    const maxValue = timeUnit === 'Hours' ? 23 : 59;
    this.valueOptions = Array.from({length: maxValue + 1}, (_, i) => i);

    // Reset value field whenever timeUnit changes
    this.taskForm.get('value')!.reset();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const { name, description, timeUnit, value, url } = this.taskForm.value;
      let cronExpression = '';
      switch(timeUnit) {
        case 'Seconds':
          cronExpression = `*/${value} * * * * *`;
          break;
        case 'Minutes':
          cronExpression = `*/${value} * * * *`;
          break;
        case 'Hours':
          cronExpression = `0 ${value} * * *`;
          break;
      }

      const type = 'WebScraper';
      const data = {
        url
      };

      const task = { name, description, cronExpression, data, type};
      console.log(task); // Replace with API call to create task

      this.taskService.postTask(task).subscribe({
        next: () => {
          console.log('Task created successfully.');
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Task creation failed:', error);          
        }
      });
    }
  }
}
