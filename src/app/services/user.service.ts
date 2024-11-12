import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VMUsers2, Users, VMUsers, AuthenticateRequest, AuthenticateResponse, UserWithRoleDto } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrls.ApiUrl + 'api/Users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<VMUsers2[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<VMUsers2[]>(this.apiUrl, { headers });
  }

  getUserById(id: number): Observable<VMUsers2> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<VMUsers2>(`${this.apiUrl}/${id}`, { headers });
  }

  addNewUser(user: VMUsers): Observable<VMUsers> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<VMUsers>(`${this.apiUrl}`, user, { headers });
  }

  updateUser(id: number, user: VMUsers2): Observable<VMUsers2> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<VMUsers2>(`${this.apiUrl}/${id}`, user, { headers });
  }

  /*deleteUserById(id: number): Observable<Users> {
    return this.http.delete<Users>(`${this.apiUrl}/${id}`);
  }*/

  softDeleteUserById(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/soft/${id}`, { headers });
  }

  authenticate(model: AuthenticateRequest): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.apiUrl}/login`, model);
  }

  decodeJwtToken(token: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/DecodeJwtToken?token=${token}`);
  }

  getUsersWithRoles(): Observable<UserWithRoleDto[]> {
    return this.http.get<UserWithRoleDto[]>(`${this.apiUrl}/GetUsersWithRoles`);
  }

  getUserWithRoleById(id: number): Observable<UserWithRoleDto> {
    return this.http.get<UserWithRoleDto>(`${this.apiUrl}/GetUserWithRoleById?id=${id}`);
  }

  getAllUsersOrderByDate(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/GetAllUsersOrderByDate`);
  }
}
