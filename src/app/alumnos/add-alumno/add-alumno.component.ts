import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contacto } from 'src/app/shared/interfaces/contacto';
import { ContactosService as AlumnosService } from 'src/app/services/contactos.service';
import { CLOSE, INVALID_FORM, ENTIDAD_CONTACTO, ENTIDAD_ALUMNO } from '../../shared/messages';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {
  alumnoForm: FormGroup;
  unidadesCentro: UnidadCentro[];  

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddAlumnoComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumnos: AlumnosService,
    private servicioUnidadesCentro: UnidadesCentroService
  ){ }

  ngOnInit(): void {
    this.alumnoForm = new FormGroup({
      // id_contacto: new FormControl(this.alumno.id_contacto, Validators.required),
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
    this.ENTIDAD = ENTIDAD_ALUMNO;

    this.getUnidadesCentro();

  }

  async confirmAdd() {
    if (this.alumnoForm.valid) {
      const contacto = this.alumnoForm.value as Contacto;

      const RESPONSE = await this.servicioAlumnos.addContacto(contacto).toPromise();
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

  onNoClick() {
    this.dialogRef.close({ok: false});
  }  

}
