import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../../../shared/interfaces/api-response';

import { Alumno } from '../../../shared/interfaces/alumno';
import { AlumnosService } from '../../../services/alumnos.service';

import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';

import { SelectionModel } from '@angular/cdk/collections';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource();

  idAlumnoFilter = new FormControl();  
  nombreFilter = new FormControl();
  apellidosFilter = new FormControl();
  fecha_nacFilter = new FormControl();
  linkedInFilter = new FormControl();  
  id_unidad_centroFilter = new FormControl();

  permises: Permises;

  selection: SelectionModel<Alumno>;
  alumno: Alumno;

  displayedColumns: string[];
  private filterValues = { id_alumno: '', nombre: '', apellidos: '', fecha_nacimiento: '', linkedin: '', id_unidad_centro: ''};  
  
  constructor(
    public dialog: MatDialog,
    private alumnosService: AlumnosService,
    private overlay: Overlay,
    @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadCentro,
  ) { }

  ngOnInit(): void {
    this.getAlumnos( this.unidadCentro.id_unidad_centro );
  }


  async getAlumnos(id_unidad_centro: number) {
    const RESPONSE = await this.alumnosService.getAlumnosUnidadCentro(id_unidad_centro).toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.alumnosService.alumnos = RESPONSE.data as Alumno[];
      this.displayedColumns = ['id_alumno', 'nombre', 'apellidos', 'fecha_nacimiento', 'linkedin', 'id_unidad_centro', 'actions'];
      // console.log(this.alumnosService.alumnos)
      this.dataSource.data = this.alumnosService.alumnos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<Alumno>(false, [this.alumno]);

      this.onChanges();
    }
  }

  async addAlumno() {
    const dialogRef = this.dialog.open(AddAlumnoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.alumnosService.alumnos.push(RESULT.data);
        this.dataSource.data = this.alumnosService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
        // this.ngOnInit();
      }
    }
  }

  async editAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.dataSource.data = this.alumnosService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
        //this.ngOnInit();
      }
    }
  }


  async deleteAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(DeleteAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      if (result.ok) {
        this.dataSource.data = this.alumnosService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
      }
    }
  }
  // async deleteAlumno(alumno: Alumno) {
  //   const dialogRef = this.dialog.open(DeleteAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
  //   const RESULT = await dialogRef.afterClosed().toPromise();
  //   if (RESULT) {
  //     if (RESULT.ok) {
  //       this.dataSource.data = this.alumnosService.alumnos;
  //       this.getAlumnos(this.unidadCentro.id_unidad_centro);
  //       //this.ngOnInit();
  //     }
  //   }
  // }

  createFilter(): (alumno: Alumno, filter: string) => boolean {
    const filterFunction = (alumno: Alumno, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return alumno.id_alumno.toString().indexOf(searchTerms.id_alumno) !== -1        
        && alumno.nombre.toLowerCase().indexOf(searchTerms.nombre.toLowerCase()) !== -1
        && alumno.apellidos.toLowerCase().indexOf(searchTerms.apellidos.toLowerCase()) !== -1
        && alumno.fecha_nacimiento.toLowerCase().indexOf(searchTerms.fecha_nacimiento.toLowerCase()) !== -1
        && alumno.linkedin.toLowerCase().indexOf(searchTerms.linkedin.toLowerCase()) !== -1        
        && alumno.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro.toLowerCase()) !== -1;      
    };

    return filterFunction;
  }

  onChanges() {
     this.idAlumnoFilter.valueChanges.subscribe(value => {
        this.filterValues.id_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.nombreFilter.valueChanges
    .subscribe(value => {
        this.filterValues.nombre = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.apellidosFilter.valueChanges
    .subscribe(value => {
        this.filterValues.apellidos = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.fecha_nacFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fecha_nacimiento = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.linkedInFilter.valueChanges
    .subscribe(value => {
        this.filterValues.linkedin = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.id_unidad_centroFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_unidad_centro = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }
}
