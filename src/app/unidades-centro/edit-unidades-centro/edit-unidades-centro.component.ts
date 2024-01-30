import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ENTIDAD_UNIDAD_CENTRO, ERROR } from '../../shared/messages';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-unidades-centro',
  templateUrl: './edit-unidades-centro.component.html',
  styleUrls: ['./edit-unidades-centro.component.scss']
})

export class EditUnidadesCentroComponent implements OnInit {

  rutaSeleccionada: string;
  unidadesCentroForm: FormGroup;
  ciclos: Ciclo[];  
  alumnos: Alumno[];
  ENTIDAD: String;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EditUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidadesCentro: UnidadesCentroService,
    private servicioCiclos: CiclosService,
    @Inject(MAT_DIALOG_DATA) public unidadesCentro: UnidadCentro,
    private servicioAlumnos: AlumnosService
  ) { }

  ngOnInit(): void {
    this.ENTIDAD=ENTIDAD_UNIDAD_CENTRO;
    this.unidadesCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadesCentro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadesCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadesCentro.id_ciclo, Validators.required),
      observaciones: new FormControl(this.unidadesCentro.observaciones)
    });
    
    this.getCiclos();
    this.getAlumnos();
  }

  async confirmEdit(){
    if (this.unidadesCentroForm.valid) {
      const uniCenForm = this.unidadesCentroForm.value;

      const RESPONSE = await this.servicioUnidadesCentro.editUnidadCentro(uniCenForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  }

  navega(ruta: string) {
    this.router.navigate([`/${ this.rutaSeleccionada }`, { outlets: { sidebar: ruta } }]);
  }

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclos = RESPONSE.data as Ciclo[];
    }
  }

  async getAlumnos(){
    const RESPONSE = await this.servicioAlumnos.getAllAlumnos().toPromise();
    if (RESPONSE.ok){
      this.alumnos = RESPONSE.data as Alumno[];
    }
  }

  async save() {
    const RESPONSE = await this.servicioAlumnos.editUnidadCentro(this.servicioAlumnos.entidad).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ok: RESPONSE.ok, entidad: this.datosEditarEntidad.entidad});
      //this.entidadService.entidades = (await this.entidadService.getAllEntidades().toPromise()).data;
    } else {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
    }
  }
  
  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
