import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatillosService {
  private API_URL = 'https://api-controlcocina.vercel.app/platillos'; // URL del backend

  constructor(private http: HttpClient) {}

  obtenerEstado(estado: string): Observable<any> {
    return this.http.get(`${this.API_URL}/estado/${estado}`);
  }  

  actualizarPlatillo(platilloId: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/actualizar/${platilloId}`, data);
  }

  marcarComoTerminado(platilloId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/terminad/${platilloId}`, {});
  }

  crearPlatillo(nombre: string): Observable<any> {
    return this.http.post(`${this.API_URL}/crear`, { nombre });
  }
}
