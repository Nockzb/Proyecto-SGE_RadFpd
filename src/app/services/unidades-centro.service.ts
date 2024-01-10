import { Injectable } from '@angular/core';
import { UnidadCentro } from '../shared/interfaces/unidad-centro';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';


const ENDPOINT = 'unidades_centro';

@Injectable({
  providedIn: 'root'
})
export class UnidadesCentroService {

  unidadCentro: UnidadCentro[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllUnidadesCentro() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addUnidadCentro(unidadCentro: UnidadCentro) {
    const body = JSON.stringify(unidadCentro);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editUnidadCentro(unidadCentro: UnidadCentro) {
    const body = JSON.stringify(unidadCentro);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteUnidadCentro(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
