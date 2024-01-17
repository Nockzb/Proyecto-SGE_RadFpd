import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { CLOSE, ENTIDAD_UNIDAD_CENTRO, ERROR } from 'src/app/shared/messages';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-edit-unidades-centro',
  templateUrl: './edit-unidades-centro.component.html',
  styleUrls: ['./edit-unidades-centro.component.scss']
})
export class EditUnidadesCentroComponent implements OnInit {

  unidadesCentroForm: FormGroup;
  ciclos: Ciclo[];
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidadesCentro: UnidadesCentroService,
    private servicioCiclos: CiclosService,
    @Inject(MAT_DIALOG_DATA) public unidadesCentro: UnidadCentro
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
  }

  async confirmEdit(){
    if (this.unidadesCentroForm.valid) {
      const familiaForm = this.unidadesCentroForm.value;

      const RESPONSE = await this.servicioUnidadesCentro.editUnidadCentro(familiaForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
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

