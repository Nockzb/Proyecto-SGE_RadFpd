import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, INVALID_FORM, ENTIDAD_UNIDAD } from 'src/app/shared/messages';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';

@Component({
  selector: 'app-add-unidades-centro',
  templateUrl: './add-unidades-centro.component.html',
  styleUrls: ['./add-unidades-centro.component.scss']
})

export class AddUnidadesCentroComponent implements OnInit {
  unidadForm: FormGroup;
  ciclos: Ciclo[];  

  ENTIDAD: String;  

  constructor(public dialogRef: MatDialogRef<AddUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidadesCentro: UnidadesCentroService,
    private servicioCiclos: CiclosService,    
    @Inject(MAT_DIALOG_DATA) public idEntidad: number,

  ){ }

  ngOnInit(): void {
    this.unidadForm = new FormGroup({      
      id_ciclo: new FormControl(null, Validators.required),
      unidad_centro: new FormControl(null, Validators.required),      
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_UNIDAD;

    this.getCiclos();    
  }

  async confirmAdd() {
    if (this.unidadForm.valid) {
      const unidadCentro = this.unidadForm.value as UnidadCentro;

      const RESPONSE = await this.servicioUnidadesCentro.addUnidadCentro(unidadCentro).toPromise();
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

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclos = RESPONSE.data as Ciclo[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }  
}
