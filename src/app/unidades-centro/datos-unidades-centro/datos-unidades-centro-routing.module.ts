import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosUnidadesCentroComponent } from './datos-unidades-centro.component';

const routes: Routes = [
  {
    path: '',
    component: DatosUnidadesCentroComponent,
    redirectTo: 'datos-unidades-centro'
  },
  {
    path: 'datos-basicos-unidades-centro',
    loadChildren: () => import('./datos-basicos-unidades-centro/datos-basicos-unidades-centro.module').then(m => m.DatosBasicosUnidadesCentroModule),
    outlet: 'sidebar'
  },
  {
     path: 'alumnos',
     loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosModule),
     outlet: 'sidebar'
  }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosUnidadesCentroRoutingModule { }
