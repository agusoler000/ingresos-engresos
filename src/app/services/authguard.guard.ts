import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor (private authService: AuthService,
    private router: Router){

  }

  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
    .pipe(
      tap( estado => {

        if(!estado){this.router.navigate(['/login'])}
        
      })
    )
  }
  
}