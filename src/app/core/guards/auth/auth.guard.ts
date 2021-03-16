import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private auth : AuthService, private router: Router) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        let url = state.url.substr(1, state.url.length - 1);
        let tree = url.split("/");
        switch(tree[0]){
          case "auth":
            if(user)
              this.router.navigate(["client/inicio"]);
            return true;
          case "client":
            if(!user)
              this.router.navigate(["client/inicio"]);
            return true;
          case "admin":
            if(!user)
              this.router.navigate(["client/inicio"]);
            return true;
        }
        return true;
      })

    );
  }
  
  isAuthenticated(user: any) : boolean {
    return !!user;
  }
}
