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

@Component({
  selector: 'app-edit-vacante',
  templateUrl: './edit-vacante.component.html',
  styleUrls: ['./edit-vacante.component.scss']
})
export class EditVacanteComponent implements OnInit {
  vacanteForm: FormGroup;
  entidades: Entidad[];
  unidades: UnidadCentro[];

  constructor(public dialogRef: MatDialogRef<EditVacanteComponent>,              
    private servicioVacante: VacanteService,
    private servicioEntidades: EntidadesService,
    private servicioUnidadesCentro: UnidadesCentroService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public vacante: Vacante
) { }

  ngOnInit(): void {
    this.vacanteForm = new FormGroup({
      id_vacante: new FormControl(this.vacante.id_vacante),
      entidad: new FormControl(this.vacante.entidad, Validators.required),
      unidad: new FormControl(this.vacante.unidad, Validators.required),
      num_alumnos: new FormControl(this.vacante.num_alumnos, Validators.required),     
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

  async confirmEdit() {
    if (this.vacanteForm.valid) {
      const vacante = this.vacanteForm.value;

      const RESP = await this.servicioVacante.editVacante(vacante).toPromise();
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
