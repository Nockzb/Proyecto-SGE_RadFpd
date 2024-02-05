import { Injectable } from '@angular/core';
import { UnidadCentro } from '../shared/interfaces/unidad-centro';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { Alumno } from '../shared/interfaces/alumno';


const ENDPOINT = 'unidades_centro';

@Injectable({
  providedIn: 'root'
})
export class UnidadesCentroService {

  unidadesCentro: UnidadCentro[];
  unidadCentro: UnidadCentro;
  alumnos: Alumno[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setUnidadCentro(unidadCentro: UnidadCentro) {
    this.unidadCentro = unidadCentro;
  }

  setDatosBasicosUnidadCentro(formUnidadCentro: any) {
    this.unidadCentro.id_unidad_centro = formUnidadCentro.id_unidad_centro;
    this.unidadCentro.unidad_centro = formUnidadCentro.unidad_centro;
    this.unidadCentro.id_ciclo = formUnidadCentro.id_ciclo;
    this.unidadCentro.observaciones = formUnidadCentro.observaciones;
  }

  // Obtener todas las unidades centro
  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllUnidadesCentro() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  // getAlumnos(idUnidadesCentros: string[]) {
  //   const ROUTE = 'obtener_alumnos';
  //   const ID_UNIDADES_CENTROS = JSON.stringify(idUnidadesCentros);
  //   return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${ID_UNIDADES_CENTROS}&route=${ROUTE}`, { headers: this.commonService.headers });
  // }

  // Añadir una nueva unidad centro
  addUnidadCentro(unidadCentro: UnidadCentro) {
    const body = JSON.stringify(unidadCentro);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  // Editar una unidad centro 
  editUnidadCentro(unidadCentro: UnidadCentro) {
    const body = JSON.stringify(unidadCentro);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  // Eliminar una unidad centro por ID
  deleteUnidadCentro(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
