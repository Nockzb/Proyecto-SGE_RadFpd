import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CLOSE, ENTIDAD_ALUMNO, ERROR } from '../../shared/messages';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';

@Component({
  selector: 'app-edit-alumnos',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.scss']
})
export class EditAlumnoComponent implements OnInit {
  alumnoForm: FormGroup;
  unidadesCentro: UnidadCentro[];
  // Para autocompletar...
  //familias: any[]
  //arrayFiltradoAutocomplete: any[] = [];
  //filteredOptions: Observable<any[]>;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumnos: AlumnosService,
    private servicioUnidadesCentro: UnidadesCentroService,
    @Inject(MAT_DIALOG_DATA) public alumno: Alumno,
  ) { }

  ngOnInit(): void {
    this.setForm();
    //this.setFilter();
  }

  setForm() {
    this.ENTIDAD = ENTIDAD_ALUMNO;
    this.alumnoForm = new FormGroup({
      dni: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      fecha_nac: new FormControl(null, Validators.required),
      linkedin: new FormControl(null),
      nivel_ingles: new FormControl(null),
      minusvalia: new FormControl(null),
      otra_formacion: new FormControl(null),
      id_unidad_centro: new FormControl(null, Validators.required),
    });

    this.getUnidadesCentro();
  }

  async confirmEdit(){
    console.log(this.alumno);
    if (this.alumnoForm.valid) {
      const aluForm = this.alumnoForm.value;

      const RESPONSE = await this.servicioAlumnos.editAlumno(aluForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    console.log(this.alumno);
  }

  async getUnidadesCentro(){
    const RESPONSE = await this.servicioUnidadesCentro.getAllUnidadesCentro().toPromise();
    if (RESPONSE.ok){
      this.unidadesCentro = RESPONSE.data as UnidadCentro[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
