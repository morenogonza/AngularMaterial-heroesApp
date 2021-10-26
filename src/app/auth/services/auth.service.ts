import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseURL;

  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  verificarAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('id')) return of(false);

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        console.log(auth);
        this._auth = auth;
        return true;
      })
    );
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((user) => (this._auth = user)),
      tap((user) => localStorage.setItem('id', user.id))
    );
  }

  logout() {
    this._auth = undefined;
  }
}
