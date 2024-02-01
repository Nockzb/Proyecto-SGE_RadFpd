import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnosComponent } from './alumnos.component';

const routes: Routes = [{ path: '', component: AlumnosComponent },
  {
    path: 'add-alumno',
    loadChildren: () => import('./add-alumno/add-alumno.module').then(m => m.AddAlumnoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
