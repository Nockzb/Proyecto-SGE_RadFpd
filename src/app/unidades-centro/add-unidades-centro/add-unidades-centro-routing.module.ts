import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUnidadesCentroComponent } from './add-unidades-centro.component';

const routes: Routes = [{ path: '', component: AddUnidadesCentroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUnidadRoutingModule { }
