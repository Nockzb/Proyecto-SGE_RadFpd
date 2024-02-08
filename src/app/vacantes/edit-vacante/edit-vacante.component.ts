import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, INVALID_FORM } from '../../shared/messages';
import { VacanteService } from 'src/app/services/vacantes.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { EntidadesService } from 'src/app/services/entidades.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { Vacante } from 'src/app/shared/interfaces/vacante';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-edit-vacante',
  templateUrl: './edit-vacante.component.html',
  styleUrls: ['./edit-vacante.component.scss']
})

export class EditVacanteComponent implements OnInit {
  vacanteForm: FormGroup;
  entidades: Entidad[];
  unidades: UnidadCentro[];
  alumnadoUnidadElegida: Alumno[];
  alumnosSeleccionados: Alumno[];

  constructor(public dialogRef: MatDialogRef<EditVacanteComponent>,
    private servicioVacante: VacanteService,
    private servicioEntidades: EntidadesService,
    private servicioUnidadesCentro: UnidadesCentroService,
    private servicioAlumnos: AlumnosService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public vacante: Vacante,
  ) {
    // TODO ALMACENAR SELECCIONES
    this.alumnadoUnidadElegida = [];
    this.alumnosSeleccionados = [];
  }

  ngOnInit(): void {
    this.vacanteForm = new FormGroup({
      id_vacante: new FormControl(this.vacante.id_vacante),
      entidad: new FormControl(this.vacante.entidad, Validators.required),
      id_unidad_centro: new FormControl(this.vacante.id_unidad_centro, Validators.required),
      num_alumnos: new FormControl(this.vacante.num_alumnos, Validators.required),
      alumnadoUnidad: new FormControl(this.alumnadoUnidadElegida),
      alumnosSeleccionados: new FormControl(this.alumnosSeleccionados)
    });

    this.getEntidades();
    this.getUnidadesCentro();
    this.getAlumnosUnidadElegida(this.vacante.id_vacante, this.vacante.id_unidad_centro);
  }

  async getAlumnosUnidadElegida(id_vacante: number, id_unidad_centro:number) {
    const RESPONSE = await this.servicioVacante.getListadoAlumnos(id_vacante, id_unidad_centro).toPromise();
    if (RESPONSE.ok) {
       RESPONSE.data.forEach(alumno => {
        console.log(alumno)
        if(alumno['estado'] == 0){
          this.alumnadoUnidadElegida.push(alumno);
        } else {
          this.alumnosSeleccionados.push(alumno);
        }
    });
    }
  }

  async getEntidades() {
    const RESPONSE = await this.servicioEntidades.getAllEntidades().toPromise();
    if (RESPONSE.ok) {
      this.entidades = RESPONSE.data as Entidad[];
    }
  }

  async getUnidadesCentro() {
    const RESPONSE = await this.servicioUnidadesCentro.getAllUnidadesCentro().toPromise();
    if (RESPONSE.ok) {
      this.unidades = RESPONSE.data as UnidadCentro[];
    }
  }

  async confirmEdit() {
    if (this.vacanteForm.valid) {
      const vacante = this.vacanteForm.value;

      const idsAlumnos: number[] = vacante.alumnosSeleccionados.map(alumno => {
        return alumno.id_alumno;
      });

      const RESP = await this.servicioVacante.editVacante(vacante).toPromise();
      if (RESP.ok) {
        const RESP2 = await this.servicioVacante.insertarAlumnosSeleccionados(vacante.id_vacante, idsAlumnos).toPromise();
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESP.ok, data: RESP.data});
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  async seleccionarAlumno(alumno: Alumno) {
    // Se agrega el alumno a la lista de seleccionados
    //if (!this.alumnosSeleccionados.includes(alumno)) {
      this.alumnosSeleccionados.push(alumno);
    //}
    // Se  elimina el alumno de la lista de la unidad
    const index = this.alumnadoUnidadElegida.indexOf(alumno);
    if (index !== -1) {
      this.alumnadoUnidadElegida.splice(index, 1);
    }
  }

  async quitarAlumno(alumno: Alumno) {
    // Se quita el alumno de la lista de seleccionados
    const index = this.alumnosSeleccionados.indexOf(alumno);
    if (index !== -1) {
      this.alumnosSeleccionados.splice(index, 1);
    }
    // Se devuelve a lista de la unidad
    //if (!this.alumnadoUnidadElegida.includes(alumno)) {
      this.alumnadoUnidadElegida.push(alumno);
    //}
  }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }
}
