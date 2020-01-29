import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiEndpoint}/user`;

  constructor(
    private http: HttpClient
  ) { }

  getUserInfo() {
    const url = `${this.baseUrl}/me`
    return this.http.get<User>(url);
  }
}
