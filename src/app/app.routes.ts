import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';

import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { ShowTaskComponent } from './show-task/show-task.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'showTask/:id', component: ShowTaskComponent },
];
