import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAutenticacion().pipe(
      tap((estadoAutenticado) => {
        if (!estadoAutenticado) this.router.navigate(['./auth/login']);
      })
    );
    // console.log('Bloqueado por el auth Guard canActivate');
    // if (this.authService.auth.id) return true;
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAutenticacion().pipe(
      tap((estadoAutenticado) => {
        if (!estadoAutenticado) this.router.navigate(['./auth/login']);
      })
    );
    // console.log('Bloqueado por el auth Guard canActivate');
    // if (this.authService.auth.id) return true;
    // return false;
  }
}
