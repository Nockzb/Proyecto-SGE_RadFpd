import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { CLOSE, ENTIDAD_UNIDAD_CENTRO, ERROR } from 'src/app/shared/messages';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';

@Component({
  selector: 'app-edit-unidades-centro',
  templateUrl: './edit-unidades-centro.component.html',
  styleUrls: ['./edit-unidades-centro.component.scss']
})
export class EditUnidadesCentroComponent implements OnInit {

  unidadCentroForm: FormGroup;
  ciclos: Ciclo[];
  ENTIDAD: String;


  constructor(
    public dialogRef: MatDialogRef<EditUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidadesCentro: UnidadesCentroService,
    private servicioCiclos: CiclosService,
    @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadCentro
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_UNIDAD_CENTRO;
    this.unidadCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadCentro.id_unidad_centro),
      unidad_centro: new FormControl(this.unidadCentro.unidad_centro, Validators.required),
      id_ciclo:new FormControl(this.unidadCentro.id_ciclo, Validators.required),
      observaciones: new FormControl(this.unidadCentro.observaciones)

    });
    this.getCiclos();
  }

  // ngOnInit(): void {
  //   this.setForm();
  //   //this.setFilter();
  // }

  // setForm() {
  //   this.ENTIDAD = ENTIDAD_UNIDAD;
  //   this.unidadCentroForm = new FormGroup({
  //     id_unidad_centro: new FormControl(this.unidadCentro.id_unidad_centro, Validators.required),
  //     unidad_centro: new FormControl(this.unidadCentro.unidad_centro, Validators.required),
  //     id_ciclo: new FormControl(this.unidadCentro.id_ciclo, Validators.required),
  //     observaciones: new FormControl(null)
  //   });

  //   this.getCiclos();
  // }

  // async confirmEdit(){
  //   // console.log(this.unidadCentro);
  //   if (this.unidadCentroForm.valid) {
  //     const unidadCentroForm = this.unidadCentroForm.value;

  //     const RESPONSE = await this.servicioUnidadesCentro.editUnidadCentro(unidadCentroForm).toPromise();
  //     if (RESPONSE.ok) {
  //       this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
  //       this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
  //     } else {
  //       this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
  //     }
  //   } else {
  //     this.snackBar.open(ERROR, CLOSE, { duration: 5000 });
  //   }
  // }

  // async confirmEdit(){
  //   if (this.unidadCentroForm.valid) {
  //     const unidadCentroForm = this.unidadCentroForm.value;

  //     const RESPONSE = await this.servicioUnidadesCentro.editUnidadCentro(unidadCentroForm).toPromise();
  //     if (RESPONSE.ok) {
  //       this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
  //       this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
  //     } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  //   } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  // }
  async confirmEdit() {
    if (this.unidadCentroForm.valid) {
      const unidadCentroForm = this.unidadCentroForm.value;

      try {
        const RESPONSE = await this.servicioUnidadesCentro.editUnidadCentro(unidadCentroForm).toPromise();

        if (RESPONSE.ok) {
          this.snackBar.open(RESPONSE.message || 'Operación exitosa', CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
        } else {
          const errorMessage = RESPONSE.message || 'Ocurrió un fallo sin mensaje detallado';
          console.error('Error al editar la unidad centro:', errorMessage);
          this.snackBar.open(ERROR, CLOSE, { duration: 5000 });
        }
      } catch (error) {
        console.error('Error inesperado:', error); // Agrega esta línea
        this.snackBar.open(ERROR, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(ERROR, CLOSE, { duration: 5000 });
    }
  }

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclos = RESPONSE.data as Ciclo[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
