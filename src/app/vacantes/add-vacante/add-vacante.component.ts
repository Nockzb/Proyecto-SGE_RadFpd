import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, INVALID_FORM } from '../../shared/messages';
import { VacanteService } from 'src/app/services/vacantes.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { EntidadesService } from 'src/app/services/entidades.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';

@Component({
  selector: 'app-add-vacante',
  templateUrl: './add-vacante.component.html',
  styleUrls: ['./add-vacante.component.scss']
})
export class AddVacanteComponent implements OnInit {
  vacanteForm: FormGroup;
  entidades: Entidad[];
  unidades: UnidadCentro[];

  constructor(public dialogRef: MatDialogRef<AddVacanteComponent>,              
              private servicioVacante: VacanteService,
              private servicioEntidades: EntidadesService,
              private servicioUnidadesCentro: UnidadesCentroService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.vacanteForm = new FormGroup({
      id_vacante: new FormControl(0),
      entidad: new FormControl(null, Validators.required),
      unidad: new FormControl(null, Validators.required),
      num_alumnos: new FormControl(null, Validators.required),     
    });

    this.getEntidades();
    this.getUnidadesCentro();
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

  async confirmAdd() {
    // console.log(this.usuarioForm.value);
    if (this.vacanteForm.valid) {
      const vacante = this.vacanteForm.value;

      const RESP = await this.servicioVacante.addVacante(vacante).toPromise();
      if (RESP.ok) {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESP.ok, data: RESP.data});
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }
}
