import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../../../shared/interfaces/api-response';

import { Alumno } from '../../../shared/interfaces/alumno';
import { AlumnosService } from '../../../services/alumnos.service';

import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';

import { SelectionModel } from '@angular/cdk/collections';

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
  dniFilter = new FormControl();
  nombreFilter = new FormControl();
  apellidosFilter = new FormControl();
  fecha_nacFilter = new FormControl();
  linkedInFilter = new FormControl();
  nivel_inglesFilter = new FormControl();
  minusvaliaFilter = new FormControl();
  otra_formacionFilter = new FormControl();
  id_unidad_centroFilter = new FormControl();

  permises: Permises;

  selection: SelectionModel<Alumno>;
  alumno: Alumno;

  displayedColumns: string[];
  private filterValues = { id_alumno: '', dni: '', nombre: '', apellidos: '', fecha_nacimiento: '', linkedin: '', nivel_ingles: '', minusvalia: '', otra_formacion: '', id_unidad_centro: ''};

  constructor(
    public dialog: MatDialog,
    private alumnosService: AlumnosService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getContactos();
    //this.createFilter();
    //this.onChanges();
  }


  async getContactos() {
    const RESPONSE = await this.alumnosService.getAllAlumnos().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.alumnosService.alumnos = RESPONSE.data as Alumno[];
      this.displayedColumns = ['id_documento', 'nombre', 'apellidos', 'fecha_nacimiento', 'linkedin', 'nivel_ingles', 'minusvalia', 'otra_formacion', 'id_unidad_centro'];
      this.dataSource.data = this.alumnosService.alumnos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<Alumno>(false, [this.alumno]);

      this.onChanges();
    }
  }

  async addAlumno() {
    const dialogRef = this.dialog.open(AddAlumnoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.contacto.push(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
        this.ngOnInit();
      }
    }
  }

  async editAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.editContacto(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
        this.ngOnInit();
      }
    }
  }

  async deleteAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(DeleteAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.deleteContacto(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (alumno: Alumno, filter: string) => boolean {
    const filterFunction = (alumno: Alumno, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return alumno.id_alumno.toString().indexOf(searchTerms.id_alumno) !== -1
        && alumno.dni.toLowerCase().indexOf(searchTerms.dni.toLowerCase()) !== -1
        && alumno.nombre.toLowerCase().indexOf(searchTerms.nombre.toLowerCase()) !== -1
        && alumno.apellidos.toLowerCase().indexOf(searchTerms.apellidos.toLowerCase()) !== -1
        && alumno.fecha_nacimiento.toLowerCase().indexOf(searchTerms.fecha_nacimiento.toLowerCase()) !== -1
        && alumno.linkedin.toLowerCase().indexOf(searchTerms.linkedin.toLowerCase()) !== -1
        && alumno.nivel_ingles.toLowerCase().indexOf(searchTerms.nivel_ingles.toLowerCase()) !== -1
        && alumno.minusvalia.toString().indexOf(searchTerms.minusvalia.toLowerCase()) !== -1
        && alumno.otra_formacion.toLowerCase().indexOf(searchTerms.otra_formacion.toLowerCase()) !== -1
        && alumno.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro.toLowerCase()) !== -1;
        // TODO Arreglar esto
    };

    return filterFunction;
  }

  onChanges() {
     this.idAlumnoFilter.valueChanges.subscribe(value => {
        this.filterValues.id_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.dniFilter.valueChanges
    .subscribe(value => {
        this.filterValues.dni = value;
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

    this.nivel_inglesFilter.valueChanges
    .subscribe(value => {
        this.filterValues.nivel_ingles = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.minusvaliaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.minusvalia = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.otra_formacionFilter.valueChanges
    .subscribe(value => {
        this.filterValues.otra_formacion = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.id_unidad_centroFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_unidad_centro = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }
}
