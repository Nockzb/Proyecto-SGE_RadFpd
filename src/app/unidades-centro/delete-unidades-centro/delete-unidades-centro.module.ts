import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteUnidadRoutingModule } from './delete-unidades-centro-routing.module';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DeleteUnidadesCentroComponent],
  imports: [
    CommonModule,
    DeleteUnidadRoutingModule,
    CrudMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class DeleteUnidadModule { }
