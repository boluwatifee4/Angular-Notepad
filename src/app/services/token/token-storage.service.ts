import { Injectable } from '@angular/core';
import { Router,
} from '@angular/router';
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private router: Router
  ) { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    // get token from cookie storage by key 'token'


    return sessionStorage.getItem(TOKEN_KEY);

  }
  public clearToken() {
    // remove every 15 minutes
    setInterval(() => {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.location.reload();
    }
      , 900000);
    
      
  }
}
