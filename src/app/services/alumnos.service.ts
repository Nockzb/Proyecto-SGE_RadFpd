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

  constructor(private http: HttpClient,
              private commonService: CommonService) { }

  setAlumno(alumno: Alumno) {
    this.alumno = alumno;
  }

  setDatosBasicosAlumno(formAlumno: any) {
    this.alumno.id_alumno = formAlumno.id_alumno;
    this.alumno.nombre = formAlumno.nombre;
    this.alumno.apellidos = formAlumno.apellidos;
    this.alumno.fecha_nacimiento = formAlumno.fecha_nacimiento;
    this.alumno.linkedin = formAlumno.linkedin;
    this.alumno.nivel_ingles = formAlumno.nivel_ingles;
    this.alumno.minusvalia = formAlumno.minusvalia;
    this.alumno.otra_formacion = formAlumno.otra_formacion;
    this.alumno.id_unidad_centro = formAlumno.id_unidad_centro;
  }

  getAlumnosUnidadCentro(id_unidad_centro: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_unidad_centro=${id_unidad_centro}`, { headers: this.commonService.headers });
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
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_alumno=${id}`, { headers: this.commonService.headers });
  }
}
