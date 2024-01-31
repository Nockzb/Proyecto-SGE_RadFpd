import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosUnidadesCentroRoutingModule } from './datos-unidades-centro-routing.module';
import { DatosUnidadesCentroComponent } from './datos-unidades-centro.component';
import { CrudMaterialModule } from '../../modules/crud-material/crud-material.module'

@NgModule({
  declarations: [DatosUnidadesCentroComponent],
  imports: [
    CommonModule,
    DatosUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosUnidadesCentroModule { }
