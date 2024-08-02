import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginService } from '../service_videos_processing/login.service';
import { response } from 'express';
import { AuthService } from '../service_videos_processing/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientListServiceService {

  private baseUrl = 'http://localhost:8086/api/clients';

  constructor(private http: HttpClient, private authService: AuthService , private loginservice: LoginService) { }

  getAllClientsLists(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginservice.getToken()}`);
    return this.http.get<any>(`${this.baseUrl}/allClientsLists`, { headers });
  }

  getClientsList(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginservice.getToken()}`);
    return this.http.get<any>(`${this.baseUrl}/showclientsList?id=${id}`, { headers });
  }

  getCsvFileRows(path: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginservice.getToken()}`);
    return this.http.get(`${this.baseUrl}/read-csv?filePath=${path}`, { headers, responseType: 'text' }).pipe(
        map(response => response as string)
    );
}

  addClientsList(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginservice.getToken()}`);
    return this.http.post(`${this.baseUrl}/addClientsList`, formData, { headers });
  }

  deleteClientsList(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginservice.getToken()}`);
    return this.http.delete(`${this.baseUrl}/deleteclientsList/${id}`, { headers });
  }
}
