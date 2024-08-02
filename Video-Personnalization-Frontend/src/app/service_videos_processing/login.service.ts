import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string | null = null;
  constructor(public location: Location, private http: HttpClient) {}

  public login(user: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', user)
      .set('password', password)
      .set('client_id', 'VidPersclient');

    return this.http.post('http://localhost:9090/realms/Cold-Outreach-Application/protocol/openid-connect/token', body, { headers })
      .pipe(
        map((response: any) => {
          // Stocker le token dans le local storage
          localStorage.setItem('token', response.access_token);
          return response;
        })
      );
  }

  public logout()  {
    localStorage.clear();
    location.reload()
  }


  public getIsLogged(): boolean {
    return (localStorage.getItem('token') != null);
  }

  public getUsername(): string | null {
    if (this.getIsLogged()) {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = token.split('.')[1];
        const payloadDecodedJson = atob(payload);
        const payloadDecoded = JSON.parse(payloadDecodedJson);
        return payloadDecoded.preferred_username;
      }
    }
    return null;
  }

  public getIsAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecodedJson = atob(payload);
      const payloadDecoded = JSON.parse(payloadDecodedJson);
      return payloadDecoded.realm_access.roles.indexOf('admin') !== -1;
    }
    return false;
  }
  
  getToken(): string | null {
    return this.token;
  }
}
