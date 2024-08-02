// processing.service.ts
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {
  private apiUrl = 'http://localhost:5000'; //  l'URL de  API Flask

  constructor(private http: HttpClient) { }

  processVideo(videoFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', videoFile);
    return this.http.post<any>(`${this.apiUrl}/process_video`, formData);
  }
  
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {
  private apiUrl = 'http://localhost:5000'; // URL de l'API Flask

  constructor(private http: HttpClient) { }

  processVideo(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/process_video`, formData);
  }
}
