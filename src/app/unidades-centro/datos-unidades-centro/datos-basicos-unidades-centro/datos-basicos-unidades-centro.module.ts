import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';

import { DatosBasicosUnidadesCentroComponent } from './datos-basicos-unidades-centro.component';
import { DatosBasicosUnidadesCentroRoutingModule } from './datos-basicos-unidades-centro-routing.module';


@NgModule({
  declarations: [DatosBasicosUnidadesCentroComponent],
  imports: [
    CommonModule,
    DatosBasicosUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosBasicosUnidadesCentroModule { }
