import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivateChild {

  constructor(
    private auth   : AuthService,
    private router : Router
    ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(take(1), map(user => {
      if(!(user.role == "staff")){
        this.router.navigate(["/client/inicio"]);
      }
      return true;
    }) );
  }
  
}
