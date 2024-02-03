import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { Alumno } from '../shared/interfaces/alumno';

const ENDPOINT = 'alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumno: Alumno;
  alumnos: Alumno[];

  constructor(private http: HttpClient, private commonService: CommonService) { }
  /*
    get() {
      return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
    }
  */
  getAlumnosUnidadCentro(id_unidad_centro: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_unidad_centro=${id_unidad_centro}`, { headers: this.commonService.headers });
  }

  getAlumnos(idCentro: string) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_unidad_centro=${idCentro}`, { headers: this.commonService.headers });
  }

  addAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteAlumno(id: number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_alumno=${id}`, {headers: this.commonService.headers });
  }
}
