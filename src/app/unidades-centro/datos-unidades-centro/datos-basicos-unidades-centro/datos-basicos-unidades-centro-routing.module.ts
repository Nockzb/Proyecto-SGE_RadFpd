import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosBasicosUnidadesCentroComponent } from './datos-basicos-unidades-centro.component';

const routes: Routes = [{ path: '', component: DatosBasicosUnidadesCentroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosBasicosUnidadesCentroRoutingModule { }
