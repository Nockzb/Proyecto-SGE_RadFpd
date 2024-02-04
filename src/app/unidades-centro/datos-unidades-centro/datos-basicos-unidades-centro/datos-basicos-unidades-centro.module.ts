import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';

import { DatosBasicosUnidadesCentroComponent } from './datos-basicos-unidades-centro.component';
import { DatosBasicosUnidadesCentroRoutingModule } from './datos-basicos-unidades-centro-routing.module';


@NgModule({
  declarations: [DatosBasicosUnidadesCentroComponent],
  providers: [DatePipe],
  imports: [
    CommonModule,
    DatosBasicosUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosBasicosUnidadesCentroModule { }
