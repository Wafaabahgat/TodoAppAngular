import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  task: any[] = [];

  constructor(private http: HttpClient) {}

  private url = 'https://task.ecmpp.com/api/task/';

  getAllTask() {
    return this.http.get(this.url + 'all/bedo - 2003');
  }

  createNewTask(task: any) {
    return this.http.post(this.url + 'add', task);
  }

  updateTask(task: any) {
    return this.http.post(this.url + `edit`, task);
  }

  deleteTask(id) {
    return this.http.delete(this.url + `remove/${id}`);
  }
  
  getTaskById(id: any) {
    return this.http.get(`${this.url}Show/${id}`);
  }
}
