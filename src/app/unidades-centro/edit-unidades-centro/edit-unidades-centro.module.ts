import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUnidadRoutingModule } from './edit-unidades-centro-routing.module';
import { EditUnidadesCentroComponent } from './edit-unidades-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditUnidadesCentroComponent],
  imports: [
    CommonModule,
    EditUnidadRoutingModule,
    CrudMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class EditUnidadModule { }
