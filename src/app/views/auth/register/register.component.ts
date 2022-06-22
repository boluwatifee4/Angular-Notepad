import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {  AuthSignUpModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Path } from 'src/app/utils/paths';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: UntypedFormGroup;
  isLoggedIn: boolean = false;
  isloggedInFailed: boolean = false;
  errMsg: string = '';
  constructor(
    private authService: AuthService, 
    private router: Router, 
    // private tokenStorage: TokenStorageService, 
    private formBuilder: UntypedFormBuilder,
    ) { }


  ngOnInit(): void {
      
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]]
      })
  }

  // onSubmit
  onSubmit() {
    const auth: AuthSignUpModel = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name
    }
    // save first name to local storage
    localStorage.setItem('first_name', auth.first_name);
    this.authService.register(auth).subscribe(
      data => {
        // this.tokenStorage.saveToken(data.data.email);
        // this.isLoggedIn = true;
        this.router.navigate([Path.AUTHDEF]);
      }
    , error => {
      // this.isloggedInFailed = true;
      this.errMsg = error.error.message;
    }
    )
  }
}
