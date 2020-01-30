import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models';
import {Page } from '../models/page';
import { Pageable } from '../models/pageable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiEndpoint}/user`;

  constructor(private http: HttpClient) {}

  getUserInfo() {
    const url = `${this.baseUrl}/me`;
    return this.http.get<User>(url);
  }

  loadPage(page: Pageable) {
    return this.http.get<Page<User>>(this.baseUrl, {
      params: {
        page: `${page.pageNumber}`,
        size: `${page.pageSize || 10}`
      }
    });
  }

  addUser(user: User) {
    return this.http.post<User>(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<User>(`${this.baseUrl}/${userId}`);
  }
}
