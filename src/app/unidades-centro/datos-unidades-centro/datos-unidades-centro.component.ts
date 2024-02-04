import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { UnidadesCentroService } from '../../services/unidades-centro.service';
import { DatosEditarUnidadesCentro } from '../../shared/interfaces/datos-editar-unidades-centro';
import { CLOSE } from '../../shared/messages';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';


@Component({
  selector: 'app-datos-unidades-centro',
  templateUrl: './datos-unidades-centro.component.html',
  styleUrls: ['./datos-unidades-centro.component.scss']
})
export class DatosUnidadesCentroComponent implements OnInit {

  @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;
  rutaSeleccionada: string;
  lastRoute = '';
  datosUnidadesCentroForm: FormGroup;

  constructor(
            private router: Router,
            @Inject(MAT_DIALOG_DATA) public datosEditarUnidadCentro: UnidadCentro,
            private unidadCentroService: UnidadesCentroService,
            private snackBar: MatSnackBar,
            public dialogRef: MatDialogRef<DatosUnidadesCentroComponent>,
            ) { }

  ngOnInit(): void {
    this.rutaSeleccionada = this.router.url.substring(1);
    this.rutaSeleccionada = this.rutaSeleccionada.split('/')[0];
    this.router.navigate([`/${ this.rutaSeleccionada }`, { outlets: { sidebar: 'datos-basicos-unidades-centro' } }]);

    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet !== this.lastRoute) {
        this.lastRoute = this.rutaSeleccionada;
        this.outlet.deactivate();
      }
    });
    this.unidadCentroService.setUnidadCentro(this.datosEditarUnidadCentro);
  }

  navega(ruta: string) {
    this.router.navigate([`${ this.rutaSeleccionada }`, { outlets: { sidebar: ruta } }]);
  }

  async save() {
      const RESPONSE = await this.unidadCentroService.editUnidadCentro(this.unidadCentroService.unidadCentro).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, entidad: this.datosEditarUnidadCentro});
        //this.entidadService.entidades = (await this.entidadService.getAllEntidades().toPromise()).data;
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    }

  onNoClick() {
    this.dialogRef.close({entidad: this.datosEditarUnidadCentro});
  }
}
