import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';

import { UnidadesCentroRoutingModule } from './unidades-centro-routing.module';

import { UnidadesCentroComponent } from './unidades-centro.component';
import { AddUnidadesCentroComponent } from './add-unidades-centro/add-unidades-centro.component';
import { EditUnidadesCentroComponent } from './edit-unidades-centro/edit-unidades-centro.component';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro/delete-unidades-centro.component';
import { DatosUnidadesCentroModule } from './datos-unidades-centro/datos-unidades-centro.module';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [UnidadesCentroComponent, AddUnidadesCentroComponent, EditUnidadesCentroComponent, DeleteUnidadesCentroComponent],
  providers: [DatePipe],
  imports: [
    CommonModule,
    UnidadesCentroRoutingModule,
    CrudMaterialModule,
    DatosUnidadesCentroModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ]
})
export class UnidadesCentroModule { }
