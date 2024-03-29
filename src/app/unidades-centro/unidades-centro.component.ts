import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { UnidadCentro } from '../shared/interfaces/unidad-centro';
import { UnidadesCentroService } from '../services/unidades-centro.service';

import { AddUnidadesCentroComponent } from './add-unidades-centro/add-unidades-centro.component';
import { EditUnidadesCentroComponent } from './edit-unidades-centro/edit-unidades-centro.component';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro/delete-unidades-centro.component';
import { AlumnosService } from '../services/alumnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from '../shared/interfaces/alumno';
import { DatosUnidadesCentroComponent } from './datos-unidades-centro/datos-unidades-centro.component';

@Component({
  selector: 'app-unidades-centro',
  templateUrl: './unidades-centro.component.html'
})
export class UnidadesCentroComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<UnidadCentro> = new MatTableDataSource();

  idUnidadCentroFilter = new FormControl();
  unidadCentroFilter = new FormControl();
  idCicloFilter = new FormControl();
  observacionesFilter = new FormControl();
  idAlumnoFilter = new FormControl();

  isChecked = false;
  isCheckedAll = false;
  pageSizeChecked: number;
  pageIndexChecked: number;

  permises: Permises;

  selection: SelectionModel<UnidadCentro>;
  unidadCentro: UnidadCentro;

  displayedColumns: string[];
  private filterValues = { id_unidad_centro: '', unidad_centro: '', id_ciclo: '', observaciones: ''};

  constructor(
    public dialog: MatDialog,
    private unidadesCentrosService: UnidadesCentroService,    
    private overlay: Overlay,
  ) { }

  ngOnInit(): void {
    this.getUnidadesCentros();
  }

  async datosUnidadesCentro(unidadCentro: UnidadCentro) {
    const UNIDAD_CENTRO = unidadCentro;

    if (UNIDAD_CENTRO) {
      const dialogRef = this.dialog.open(DatosUnidadesCentroComponent, {
        width: '70em',
        maxWidth: '70em',
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        disableClose: true,
        data: UNIDAD_CENTRO
      });

      const RESULT = await dialogRef.afterClosed().toPromise();
      await this.getUnidadesCentros();
    }
  }


  async getUnidadesCentros() {
    const RESPONSE = await this.unidadesCentrosService.getAllUnidadesCentro().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.unidadesCentrosService.unidadesCentro = RESPONSE.data as UnidadCentro[];
      this.displayedColumns = ['id_unidad_centro', 'unidad_centro', 'id_ciclo', 'observaciones', 'actions'];
      this.dataSource.data = this.unidadesCentrosService.unidadesCentro;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<UnidadCentro>(false, [this.unidadCentro]);
      this.onChanges();
    }
  }

  async addUnidadCentro() {
    const dialogRef = this.dialog.open(AddUnidadesCentroComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }

  async editUnidadCentro(unidadCentro: UnidadCentro) {
    const dialogRef = this.dialog.open(EditUnidadesCentroComponent, { data: unidadCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }
async deleteUnidadCentro(unidadCentro: UnidadCentro) {
    const dialogRef = this.dialog.open(DeleteUnidadesCentroComponent, { data: unidadCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }

  changePage() {
    if (this.isCheckedAll) {
      this.isChecked = true;
    } else {
      this.isChecked = (((this.pageIndexChecked + 1) * this.pageSizeChecked) /
      ((this.dataSource.paginator.pageIndex + 1) * this.dataSource.paginator.pageSize)) >= 1;
    }
  }

  createFilter(): (unidadCentro: UnidadCentro, filter: string) => boolean {
    const filterFunction = (unidadCentro: UnidadCentro, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return unidadCentro.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
          && unidadCentro.unidad_centro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
          && unidadCentro.id_ciclo.toString().indexOf(searchTerms.id_ciclo.toLowerCase()) !== -1
          && (unidadCentro.observaciones || '').toLowerCase().indexOf(searchTerms.observaciones.toLowerCase()) !== -1;
  };
    //   if(unidadCentro.observaciones!=null){
    //     return unidadCentro.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
    //       && unidadCentro.unidad_centro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
    //       && unidadCentro.observaciones.toLowerCase().indexOf(searchTerms.observaciones.toLowerCase()) !== -1;
    //   }else{
    //     unidadCentro.observaciones=""
    //     return unidadCentro.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
    //     && unidadCentro.unidad_centro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
    //     && unidadCentro.observaciones.toLowerCase().indexOf(searchTerms.observaciones.toLowerCase()) !== -1
    //   }
    // };

    return filterFunction;
  }

  onChanges() {
      this.idUnidadCentroFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_unidad_centro = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.unidadCentroFilter.valueChanges
      .subscribe(value => {
          this.filterValues.unidad_centro = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.idCicloFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_ciclo = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.observacionesFilter.valueChanges
      .subscribe(value => {
          this.filterValues.observaciones = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  }
}
