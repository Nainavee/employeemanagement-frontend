import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Newuser } from './newuser';
import { Userdata } from './userdata';
@Injectable({
  providedIn: 'root'
})
export class NewuserService {
  private apiServerUrl=environment.apiBaseUrl;
  private httpHeader={headers: new HttpHeaders({'Content-type':'application/json'})}

  constructor(private http: HttpClient) { }

  public signUp(user: Newuser): Observable<Newuser>{
      return this.http.post<Newuser>(`${this.apiServerUrl}/signup`,user,this.httpHeader);
  }

  public login(user: Userdata): Observable<Newuser>{
    return this.http.post<Newuser>(`${this.apiServerUrl}/login`,user,this.httpHeader);
}
}
