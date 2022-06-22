import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Path} from '../utils/paths'; 


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() : boolean {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(["/"]);
            return false;
        }
    }
}