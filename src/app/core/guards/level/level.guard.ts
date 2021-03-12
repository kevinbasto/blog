import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LevelGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        let location = state.url.substr(1, state.url.length - 1);
        let tree = location.split("/");
        let subRoute = tree[1];
        switch(subRoute){
          case 'inicio':
            if(user.roleId > 2)
              return true
            this.router.navigate(['/admin/inicio'])
          break;
          case 'usuarios':
            if(user.roleId > 3)
              return true;
            this.router.navigate(['/admin/inicio'])
          break;
          case 'staff':
            if(user.roleId > 3)
              return true;
            this.router.navigate(['/admin/inicio'])
          break;
          case 'solicitudes':
            if(user.roleId > 3)
              return true;
            this.router.navigate(['/admin/inicio'])
          break;
          case 'personalization':
            if(user.roleId > 3)
              return true;
            this.router.navigate(['/admin/inicio'])
          break;
          default:
            return true;
          break;
        }
        return true;
      })
    );
  }
  
}
