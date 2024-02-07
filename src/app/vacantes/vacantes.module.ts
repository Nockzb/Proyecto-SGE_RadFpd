import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacantesComponent } from './vacantes.component';
import { VacantesRoutingModule } from './vacantes-routing.module';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';



@NgModule({
  declarations: [VacantesComponent],
  imports: [
    CommonModule,
    VacantesRoutingModule,
    CrudMaterialModule
  ]
})
export class VacantesModule { }
