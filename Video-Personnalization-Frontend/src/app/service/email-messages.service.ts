import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service_videos_processing/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EmailMessagesService {

  private baseUrl = 'http://localhost:8020/email';

  constructor(private http: HttpClient,private authService: AuthService) { }

  getEmails(username, pwd,folder): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.isAuthenticated()}`);
    return this.http.get<any>(`${this.baseUrl}/readEmails?username=${username}&password=${pwd}&folder=${folder}`, { headers });
}

sendEmail(emailRequest: any): Observable<void> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.isAuthenticated()}`);
  const url = `${this.baseUrl}/sendEmails`;
  return this.http.post<void>(url, emailRequest, { headers });
}

  
}