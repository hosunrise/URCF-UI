import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../../app.config.interface';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {last, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  private isLogin: boolean;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
    this.isLogin = localStorage.getItem('auth_token') != null;
  }

  login(username: string, password: string): Observable<Object> {
    return this.http.post(this.config.loginEndpoint + '/login', {
      username: username,
      password: password
    }).pipe(
      last(),
      tap((data) => {
        this.isLogin = true;
        localStorage.setItem('auth_token', data['access_token']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isLogin = false;
  }

  checkLogin(): boolean {
    return this.isLogin;
  }
}
