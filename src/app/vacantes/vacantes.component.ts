import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Vacante } from '../shared/interfaces/vacante';
import { Permises } from '../shared/interfaces/api-response';
import { VacanteService } from '../services/vacantes.service';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss']
})

export class VacantesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Vacante> = new MatTableDataSource();

  idVacanteFilter = new FormControl();
  entidadFilter = new FormControl();
  unidadFilter = new FormControl();
  numAlumnosFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_vacante: '', entidad: '', unidad: '' , num_alumnos: '' };

  constructor(
    public dialog: MatDialog,
    private vacanteService: VacanteService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getVacantes();
  }

  async getVacantes() {
    const RESPONSE = await this.vacanteService.getVacantes().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.vacanteService.vacante = RESPONSE.data as Vacante[];
      this.displayedColumns = ['id_vacante', 'entidad', 'unidad', 'num_alumnos', 'actions'];
      this.dataSource.data = this.vacanteService.vacante;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addVacante() {
  //   const dialogRef = this.dialog.open(AddNivelComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
  //   const RESULT = await dialogRef.afterClosed().toPromise();
  //   if (RESULT) {
  //     if (RESULT.ok) {
  //       //this.nivelesService.nivel.push(RESULT.data);
  //       //this.dataSource.data = this.nivelesService.nivel;
  //       this.ngOnInit();
  //     }
  //   }  
  }

  async editVacante(vacante: Vacante) {
  //   const dialogRef = this.dialog.open(EditNivelComponent, { data: nivel, scrollStrategy: this.overlay.scrollStrategies.noop() });
  //   const RESULT = await dialogRef.afterClosed().toPromise();
  //   if (RESULT) {
  //     if (RESULT.ok) {
  //       //this.nivelesService.editNivel(RESULT.data);
  //       //this.dataSource.data = this.nivelesService.nivel;
  //       this.ngOnInit();
  //     }
  //   }  
  }

  async deleteVacante(vacante: Vacante) {
  //   const dialogRef = this.dialog.open(DeleteNivelComponent, { data: nivel, scrollStrategy: this.overlay.scrollStrategies.noop() });
  //   const RESULT = await dialogRef.afterClosed().toPromise();
  //   if (RESULT) {
  //     if (RESULT.ok) {
  //       //this.nivelesService.deleteNivel(RESULT.data);
  //       //this.dataSource.data = this.nivelesService.nivel;
  //       this.ngOnInit();
  //     }
  //   }
  }

  createFilter(): (vacante: Vacante, filter: string) => boolean {
    const filterFunction = (vacante: Vacante, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return vacante.id_vacante.toString().indexOf(searchTerms.id_nivel) !== -1
        && vacante.entidad.toLowerCase().indexOf(searchTerms.vacante.toLowerCase()) !== -1
        && vacante.unidad.toLowerCase().indexOf(searchTerms.cod_nivel.toLowerCase()) !== -1
        && vacante.num_alumnos.toString().indexOf(searchTerms.titulo.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idVacanteFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_vacante = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.entidadFilter.valueChanges
      .subscribe(value => {
          this.filterValues.entidad = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 

      this.unidadFilter.valueChanges
      .subscribe(value => {
          this.filterValues.unidad = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });  
    
      this.numAlumnosFilter.valueChanges
      .subscribe(value => {
          this.filterValues.num_alumnos = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });     
  }
}
