import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { AlumnosComponent } from './alumnos.component';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { EdadAlumnoPipe } from 'src/app/shared/pipes/edad-alumno.pipe';
import { LinkedinPipe } from 'src/app/shared/pipes/linkedinUrl.pipe';

@NgModule({
  declarations: [AlumnosComponent, AddAlumnoComponent, DeleteAlumnoComponent, EditAlumnoComponent, EdadAlumnoPipe, LinkedinPipe],
  providers: [DatePipe],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    CrudMaterialModule
  ]
})
export class AlumnosModule { }
