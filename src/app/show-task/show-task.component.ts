import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import {} from '@angular/forms';

@Component({
  selector: 'app-show-task',
  standalone: true,
  imports: [],
  templateUrl: './show-task.component.html',
  styleUrl: './show-task.component.css',
})
export class ShowTaskComponent implements OnInit {
  constructor(private _shared: SharedService, private router: ActivatedRoute) {}
  id: any = this.router.snapshot.params['id'];
  //editTaskForm: FormGroup;
  task: any;
  getImageUrl(fullImagePath: string): string {
    const imageUrl = fullImagePath.replace('public/', '');
    return 'https://task.ecmpp.com/storage/' + imageUrl;
  }

  ngOnInit(): void {
    this._shared.getTaskById(this.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.task = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
