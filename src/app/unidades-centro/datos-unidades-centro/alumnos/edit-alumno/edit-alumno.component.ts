import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CLOSE, ENTIDAD_ALUMNO, ERROR } from 'src/app/shared/messages';

import { Alumno } from 'src/app/shared/interfaces/alumno';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.scss']
})
export class EditAlumnoComponent implements OnInit {
  public alumnoForm: FormGroup;
  unidadesCentro: UnidadCentro[];
  alumno: Alumno;
  ENTIDAD: String;
  nivelIngles = ["A1", "A2", "B1", "B2", "C1", "C2"]

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumnos: AlumnosService,
    private servicioUnidadesCentro: UnidadesCentroService,
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
  ) {
    this.alumno = { ...data };
  }

  ngOnInit(): void {
    this.setForm();    
    //this.setFilter();
  }

  setForm() {
    this.ENTIDAD = ENTIDAD_ALUMNO;
    this.alumnoForm = new FormGroup({
      id_alumno: new FormControl(this.alumno.id_alumno),
      dni: new FormControl(this.alumno.dni, Validators.required),
      nombre: new FormControl(this.alumno.nombre, Validators.required),
      apellidos: new FormControl(this.alumno.apellidos, Validators.required),
      fecha_nac: new FormControl(this.alumno.fecha_nacimiento, Validators.required),
      linkedin: new FormControl(null),
      nivel_ingles: new FormControl(this.alumno.nivel_ingles),
      minusvalia: new FormControl(this.alumno.minusvalia),
      otra_formacion: new FormControl(this.alumno.otra_formacion),
      id_unidad_centro: new FormControl(this.alumno.id_unidad_centro),
    });

    this.getUnidadesCentro();
  }

  async confirmEdit() {    
    if (this.alumnoForm.valid) {
      const aluForm = this.alumnoForm.value;

      const RESPONSE = await this.servicioAlumnos.editAlumno(aluForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }    
  }

  async getUnidadesCentro() {
    const RESPONSE = await this.servicioUnidadesCentro.getAllUnidadesCentro().toPromise();
    if (RESPONSE.ok) {
      this.unidadesCentro = RESPONSE.data as UnidadCentro[];
    }
  }

  decrementar() {
    const valorActual = this.alumnoForm.get('minusvalia').value;
    const nuevoValor = Math.max(valorActual - 5, 0);
    this.alumnoForm.get('minusvalia').setValue(nuevoValor);
  }

  incrementar() {
    const valorActual = this.alumnoForm.get('minusvalia').value;
    const nuevoValor = Math.min(valorActual + 5, 100);
    this.alumnoForm.get('minusvalia').setValue(nuevoValor);
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
