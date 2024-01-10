import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesCentroRoutingModule } from './unidades-centro-routing.module';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { UnidadesCentrosComponent } from './unidades-centro.component';
import { AddUnidadesCentroComponent } from './add-unidades-centro/add-unidades-centro.component';
import { EditUnidadesCentroComponent } from './edit-unidades-centro/edit-unidades-centro.component';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro/delete-unidades-centro.component';

@NgModule({
  declarations: [UnidadesCentrosComponent, AddUnidadesCentroComponent, EditUnidadesCentroComponent, DeleteUnidadesCentroComponent],
  imports: [
    CommonModule,
    UnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class UnidadesCentroModule { }
