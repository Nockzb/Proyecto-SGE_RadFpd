import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTIDAD_UNIDAD_CENTRO } from '../../../shared/messages';
import { DatosUnidadesCentroComponent } from '../datos-unidades-centro.component';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-datos-basicos-unidades-centro',
  templateUrl: './datos-basicos-unidades-centro.component.html',
  styleUrls: ['./datos-basicos-unidades-centro.component.scss']
})
export class DatosBasicosUnidadesCentroComponent implements OnInit {

  datosBasicosUnidadesCentroForm: FormGroup;
  alumnos: Alumno[];
  ciclos: Ciclo[];

  ENTIDAD: String;

  constructor(
    private datosUnidadCentro: DatosUnidadesCentroComponent,
    public unidadCentroService: UnidadesCentroService,
    private servicioCiclos: CiclosService
  ) {
    this.alumnos = this.datosUnidadCentro.datosEditarUnidadCentro.alumnos;
  }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_UNIDAD_CENTRO;
    this.setForm();

    this.datosBasicosUnidadesCentroForm.valueChanges.subscribe(form => {
      this.unidadCentroService.setDatosBasicosUnidadCentro(form);
    });

    this.getCiclos();
  }

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclos = RESPONSE.data as Ciclo[];
    }
  }

  setForm(): void {
    this.datosBasicosUnidadesCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadCentroService.unidadCentro.id_unidad_centro),
      unidad_centro: new FormControl(this.unidadCentroService.unidadCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadCentroService.unidadCentro.id_ciclo, Validators.required),
      observaciones: new FormControl(this.unidadCentroService.unidadCentro.observaciones, Validators.required)
    });
  }
}
