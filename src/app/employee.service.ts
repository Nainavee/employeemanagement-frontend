import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl= environment.apiBaseUrl;
  private httpHeader={headers: new HttpHeaders({'Content-type':'application/json'})}

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employees/all`);  
  }

  public addEmployee(employee: Employee): Observable<Employee>{
    
    return this.http.post<Employee>(`${this.apiServerUrl}/employees/add`,employee,this.httpHeader);  
  }

  public updateEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employees/update`,employee,this.httpHeader);  
  }

  public deleteEmployee(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employees/delete/${id}`,);  
  }
}
