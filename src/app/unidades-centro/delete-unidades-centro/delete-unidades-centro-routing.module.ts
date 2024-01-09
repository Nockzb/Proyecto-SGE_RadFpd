import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteUnidadesCentroComponent } from './delete-unidades-centro.component';

const routes: Routes = [{ path: '', component: DeleteUnidadesCentroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteUnidadRoutingModule { }
