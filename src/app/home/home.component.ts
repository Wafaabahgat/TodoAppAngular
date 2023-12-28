import { Component, OnInit } from '@angular/core';
import { TaskModelComponent } from '../task-model/task-model.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskModelComponent, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  task: any;

  constructor(private _shared: SharedService) {}

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this._shared.getAllTask().subscribe({
      next: (res) => {
        console.log('all tasks', res);
        this.task = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      // complete: () => {
      //   alert('Task created!');
      // },
    });
  }

  getImageUrl(fullImagePath: string): string {
    const imageUrl = fullImagePath.replace('public/', '');
    return 'https://task.ecmpp.com/storage/' + imageUrl;
  }

  deleteTask(id: any) {
    // const headers = new HttpHeaders({
    //   Authorization: 'Bearer ',
    // });

    this._shared.deleteTask(id).subscribe({
      next: (res) => {
        console.log(res);
        //this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
