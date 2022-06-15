import { NbAuthService } from '@nebular/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: NbAuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated()
    .pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigateByUrl('/auth')
        }
        else {
          if(route.data.roles) {
            this.authService.getToken().subscribe(
              token => {
                if(route.data.roles.indexOf(token.getPayload().role) === -1) {
                  this.router.navigateByUrl('/home/403')
                  return false
                }
                return true
              } 
            )
          }
          return true
        }
      }),
    );
  }

  getRole() {
    this.authService.getToken().subscribe( token => {return token.getPayload().role})
  }
}
