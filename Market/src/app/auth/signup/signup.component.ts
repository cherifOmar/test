import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { AuthService } from 'src/app/service/auth.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  role: Role[] = [];


  rolee: User = {
    _id: '',
    username: '',
    email: '',
    password: '',
    roles: [],
  };


  signupList= ["Client","Vendeur"]
  signupForm!: FormGroup
  constructor(private formBuilder:FormBuilder,
     private dialog:MatDialog,
     private dialogRef: MatDialogRef<LoginComponent>,
     private service: ServiceService,
     private serviceAuth: AuthService,

    ) { }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      username : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      // confirmPassword : ['', Validators.required],
      roles : [[], Validators.required],
      // phone : ['', Validators.required],

    })

    this.getRoles();

  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      width:'30%'
    })
    this.dialogRef.close('save');
}

signup() {
  if (this.signupForm.valid) {
    if (this.signupForm.value.password) {
      const userData = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role: this.signupForm.value.roles, // Assurez-vous que le rôle est correctement envoyé
      };

      this.service.createAcount(userData) // Assurez-vous que le nom de la méthode est correct
        .subscribe(
          res => {
            alert("Signup successful");
            this.signupForm.reset();
            this.openLogin();
          },
          error => {
            console.error("Error signing up:", error);
            if (error.status === 500) {
              alert("Something went wrong on the server. Check the console for more details.");
            } else {
              alert("An error occurred. Check the console for more details.");
            }
          }
        );
    } else {
      alert("Please confirm your password");
    }
  }
}




getRoles() {
  this.serviceAuth.getRoles().subscribe(
    (role: Role[]) => {
      this.role = role;
    },
    (error: any) => {
      console.error(error);
    }
  );
}

}
