import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  task: any;
  tasks: any;
  id: any = this.router.snapshot.params['id'];
  constructor(private _shared: SharedService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllTask();
    console.log('Extracted id:', this.id);
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

  updatedata = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    id: new FormControl(this.id),
  });

  deleteTask(id: any) {
    this._shared.deleteTask(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
