import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';

import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: UpdateComponent },
];
