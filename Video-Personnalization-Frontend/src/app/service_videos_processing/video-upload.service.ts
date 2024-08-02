import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  private baseUrl = 'http://localhost:8083/api/videos'; // Remplacez l'URL par celle de votre backend

  constructor(private http: HttpClient) { }

  uploadVideo(videoFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('video', videoFile);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
 
  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}


