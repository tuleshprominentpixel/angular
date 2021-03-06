import { Route } from '@angular/compiler/src/core';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-z][a-z]*[a-z]+$/),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^([a-zA-Z0-9_.]*)\d*@prominentpixel.com$/),
          Validators.minLength(29)
        ]),
        fullname: new FormControl('', [
          Validators.required,
          Validators.pattern(/^([a-zA-Z0-9_ ])*$/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
        confirmpassword: new FormControl('', [Validators.required]),
      }, {
      validator: this.mustMatch('password', 'confirmpassword')
    }
    );
  }

  onSignUpSubmit() {
    if (!this.signupForm.valid) {
      alert('invalid credentials!! Register all detail perfectly');
      return;
    } else {
      this.authService.login(this.signupForm.value);
      this.router.navigate(['blog']);
    }
  }
  
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
