import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadesCentroComponent } from './unidades-centro.component';

const routes: Routes = [
  { path: '', component: UnidadesCentroComponent },
  { 
    path: 'add-unidad', 
    loadChildren: () => import('./add-unidades-centro/add-unidades-centro.module').then(m => m.AddUnidadModule) 
  },
  { 
    path: 'edit-unidad', 
    loadChildren: () => import('./edit-unidades-centro/edit-unidades-centro.module').then(m => m.EditUnidadModule) 
  },
  { 
    path: 'delete-unidad', 
    loadChildren: () => import('./delete-unidades-centro/delete-unidades-centro.module').then(m => m.DeleteUnidadModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesRoutingModule { }
