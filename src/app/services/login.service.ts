/* eslint-disable max-len */
import { User } from './../Model/user';
import { ApiResponse } from './../Model/api-response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost/Apis/ApiPremiApp';

  constructor(private http: HttpClient) { }

  registerUser(loginData: { username: any; password: any }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/register.php', loginData);
  }

  login(loginData: { username: any; password: any }):
    Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/login.php', loginData);
  }

  getUses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + '/list.php');
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + '/getById.php?id=' + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/insert.php', user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + '/update.php' + id);
  }

  updateStudent(user: User) {
    return this.http.post<ApiResponse>(this.baseUrl + '/update.php', user);
  }
}
  // // Login URL
  // url = 'https://premiapp.co/ApiApp/index.php/LoginServ/';

  // // Register users URL
  // registerUrl = 'https://premiapp.co/ApiApp/index.php/Usuarios/';

  // constructor(
  //   public http: HttpClient
  // ) { }

  // getPosts(user, pass) {
  //   return new Promise(resolve => {
  //     this.http.get(this.url + 'find/' + user + '/' + pass).subscribe(data => {
  //       resolve(data);
  //     }, error => {
  //       console.log(error);
  //     });
  //   });

  // }
  // postAddUser(name, typeDoc, document, dateNac, email, phone, user, pass) {
  //   return new Promise(resolve => {
  //     // eslint-disable-next-line max-len
  //     this.http.get(this.registerUrl + 'save?name=' + name + '&type_doc=' + typeDoc + '&number_doc=' + document + '&date_nac=' + dateNac + '&email=' + email + '&user=' + user + '&pass=' + pass).subscribe(data => {
  //       resolve(data);
  //     }, error => {
  //       console.log(error);
  //     });
  //   });
  // }

  // addPost(data) {
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.url, JSON.stringify(data))
  //       .subscribe(response => {
  //         resolve(response);
  //       }, (error) => {
  //         reject(error);
  //       });
  //   });
  // }
// }
