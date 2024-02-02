import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ENTIDAD_ALUMNO } from 'src/app/shared/messages';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-delete-contacto',
  templateUrl: './delete-alumno.component.html',
  styleUrls: ['./delete-alumno.component.scss']
})
export class DeleteAlumnoComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public alumno: Alumno,
    private servicioAlumnos: AlumnosService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_ALUMNO;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioAlumnos.deleteAlumno(this.alumno.id_alumno).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
