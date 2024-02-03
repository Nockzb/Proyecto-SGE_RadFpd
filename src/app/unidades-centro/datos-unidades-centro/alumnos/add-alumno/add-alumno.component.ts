import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CLOSE, INVALID_FORM, ENTIDAD_ALUMNO } from 'src/app/shared/messages';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { Alumno } from 'src/app/shared/interfaces/alumno';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {
  nivelIngles = ["A1", "A2", "B1", "B2", "C1", "C2"]
  alumnoForm: FormGroup;
  unidadesCentro: UnidadCentro[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddAlumnoComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumnos: AlumnosService,
    private servicioUnidadesCentro: UnidadesCentroService,
    @Inject(MAT_DIALOG_DATA) public id_unidad_centro: number
  ){ }

  // ngOnInit() {
  //   this.alumnoForm = new FormGroup({
  //     id_alumno: new FormControl(null, Validators.required),
  //     nombre: new FormControl(null, Validators.required),
  //     apellidos: new FormControl(null, Validators.required),
  //     fecha_nac: new FormControl(null),
  //     linkedin: new FormControl(null),
  //     nivel_ingles: new FormControl(null, Validators.required),
  //     minusvalia: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
  //     otra_formacion: new FormControl(null),
  //     id_unidad_centro: new FormControl(49)
  //   });
  // }
  ngOnInit(): void {
    this.alumnoForm = new FormGroup({
      // id_alumno: new FormControl(0),
      dni: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      fecha_nac: new FormControl(null),
      linkedin: new FormControl(null),
      nivel_ingles: new FormControl(null),
      minusvalia: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      otra_formacion: new FormControl(null),
      id_unidad_centro: new FormControl(this.id_unidad_centro),
    });
    this.ENTIDAD = ENTIDAD_ALUMNO;

    this.getUnidadesCentro();

  }

  async confirmAdd() {
    if (this.alumnoForm.valid) {
      const alumno = this.alumnoForm.value as Alumno;

      const RESPONSE = await this.servicioAlumnos.addAlumno(alumno).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  async getUnidadesCentro(){
    const RESPONSE = await this.servicioUnidadesCentro.getAllUnidadesCentro().toPromise();
    if (RESPONSE.ok){
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
    this.dialogRef.close({ok: false});
  }
}
