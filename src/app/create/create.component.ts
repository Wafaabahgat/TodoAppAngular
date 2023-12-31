import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  image!: File;

  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    // image: null as any,
    username: new FormControl('bedo - 2003', [
      Validators.required,
      Validators.maxLength(199),
    ]),
  });

  saveImg(e): void {
    this.image = e.target.files[0];
  }

  create() {
    console.log(this.taskForm.value);
    const values = this.taskForm.value;
    const formData = new FormData();
    formData.append('title', values['title']);
    formData.append('content', values['content']);
    formData.append('image', this.image);
    formData.append('username', values['username']);

    this._shared.createNewTask(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.route.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      complete() {
        alert('Task created!');
      },
    });
  }

  form: any;
  constructor(
    public _shared: SharedService,
    private route: Router
  ) //private _fb: FormBuilder
  {
    // this.form = this._fb.group({
    // title: this._fb.control('', Validators.required),
    // });
  }
}
