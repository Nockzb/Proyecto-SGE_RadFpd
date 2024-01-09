import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUnidadRoutingModule } from './add-unidades-centro-routing.module';
import { AddUnidadesCentroComponent } from './add-unidades-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [AddUnidadesCentroComponent],
  imports: [
    CommonModule,
    AddUnidadRoutingModule,
    CrudMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class AddUnidadModule { }
