import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
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
  id: any;
  task: any;
  taskForm: FormGroup;



  constructor(
    private _shared: SharedService,
    private act: ActivatedRoute,
    private fb: FormBuilder
  ) {
      this.taskForm = this.fb.group({
        content: [''],
        title: [''],
      });
    }

  updateTask() {
    const formData = this.taskForm.value;
    this._shared
      .updateTask({
        id: this.id,
        content: formData.content,
        title: formData.title,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('Updated Task');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    const id = +this.act.snapshot.paramMap.get('id');
    console.log('Extracted id:', id);
    this._shared.getAllTask('bedo-2003').subscribe((data) => {
      this.taskForm.patchValue({
        title: data[0].title,
        content: data[0].content,
      });
    });
  }
}

