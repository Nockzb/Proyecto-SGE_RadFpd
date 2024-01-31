import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAlumnoComponent } from './add-alumno.component';

const routes: Routes = [{ path: '', component: AddAlumnoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAlumnoRoutingModule { }
