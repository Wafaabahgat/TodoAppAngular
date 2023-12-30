import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent implements OnInit {
  id: any = this.router.snapshot.params['id'];
  task: any;
  editTaskForm: FormGroup;

  constructor(
    private _shared: SharedService,
    private router: ActivatedRoute,

    private route: Router
  ) {}

  updatedata = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    id: new FormControl(this.id),
  });

  ngOnInit(): void {
    this._shared.getTaskById(this.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.updatedata.patchValue({
          title: res.title,
          content: res.content,
          id: res.id,
        });

        console.log('form values', this.updatedata.value);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log('Extracted id:', this.id);
  }

  updateTask() {
    this._shared.updateTask(this.updatedata.value).subscribe({
      next: (res) => {
        console.log(res);
        this.route.navigate(['/']);
        alert('Updated Task');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
