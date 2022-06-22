import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from 'src/app/utils/endPoints';
import { AuthLoginModel } from 'src/app/models/auth.model';
import { AuthSignUpModel } from 'src/app/models/auth.model';
import { TokenStorageService } from '../token/token-storage.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'withCredentials': 'true',

    }),
    withCredentials: true,
    observe: 'response' as 'response'
    
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http : HttpClient, private tokenStorage: TokenStorageService ) { }

  login(auth: AuthLoginModel): Observable<any> {
    this.tokenStorage.saveToken("token")
    return this.http.post(Endpoints.AUTHDEF, auth, httpOptions);
    
   
  }

  register(auth: AuthSignUpModel): Observable<any> {
    return this.http.post(Endpoints.AUTH, auth, httpOptions,);
  }

  loggedIn(): any {
    return !!this.tokenStorage.getToken();
  }
}
