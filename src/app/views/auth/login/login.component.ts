import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { AuthLoginModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Path } from 'src/app/utils/paths';
import { TaostsService } from 'src/app/services/toast/taosts.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public loginForm!: UntypedFormGroup;
isLoggedIn: boolean = false;
isLoggedInFailed: boolean = false;
errorMsg: string = '';
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private tokenStorage: TokenStorageService, 
    private formBuilder: UntypedFormBuilder,
    private taostService: TaostsService,
    ) { }
  


  ngOnInit(): void {

    // if(this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.router.navigate([Path.DASHBOARD]);
    // }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  // openSnackBar
  openSnackBar(message: string) {
    this.taostService.openSnackBar(message);
  }

  // onSubmit
  onSubmit() {
    const auth: AuthLoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    
    this.authService.login(auth).subscribe(
      data => {
        // this.tokenStorage.saveToken(data.data.token);
        this.isLoggedIn = true;
        this.openSnackBar('Login Successful');
        this.router.navigate([Path.DASHBOARD]);
      }
    , error => {
      this.isLoggedInFailed = true;
      this.errorMsg = error.error.message;
      this.openSnackBar(this.errorMsg);
    }
    )
    // this.authService.login().subscribe(
    //   data => {
    //     // this.tokenStorage.saveToken(data.data.email);
    //     // check if data.data.email is = auth.email and data.data.password is = auth.password else return error
    //     const user = data.data.find((user:any)=>{
    //       return user.email === auth.email && user.password === auth.password
    //     })
    //     if(user) {
    //     // this.isLoggedIn = true;
    //     this.router.navigate([Path.DASHBOARD]);
    //     } else {
    //       // this.isLoggedInFailed = true;
    //       this.errorMsg = 'Invalid email or password';
    //     }
    //   }
    // , error => {
    //   this.isLoggedInFailed = true;
    //   this.errorMsg = error.error.message;
    // }
    // )
  }
}
