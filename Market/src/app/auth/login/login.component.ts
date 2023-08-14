import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/service/service.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userList= ["Client","Vendeur"]
  userForm!: FormGroup

  user!:User

  constructor(private formBuilder:FormBuilder,
     private dialog:MatDialog,
     private dialogRef: MatDialogRef<SignupComponent>,
     private service: ServiceService,
     private router: Router ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
      statusUser : ['', Validators.required],

    })


  }

  openSignup() {
      this.dialog.open(SignupComponent, {
        width:'30%'
      })
      this.dialogRef.close('save');

  }

  signin() {
    console.log(this.userForm.value.mail)
    const t = {
      mail: this.userForm.value.mail,
      password: this.userForm.value.password,
      statusUser: this.userForm.value.statusUser
    }
    this.service.signIn(t).subscribe((data)=>{
      if (this.userForm.value.statusUser=="Client"){
      this.dialogRef.close('save');
       this.router.navigate(['home']);
      } else if (this.userForm.value.statusUser=="Vendeur"){
      this.dialogRef.close('save');
        this.router.navigate(['listproduct']);
       }
      this.user=data
      localStorage.setItem('user_id',data._id)



    })


  }


  // res=>{
  //   const user = 1
  //   if(user){
  //     alert("login success");
  //     this.userForm.reset();
  //     this.dialogRef.close('save');
  //     this.router.navigate(['listproduct']);

  //   }else{
  //     alert("user not found")
  //   }
  // },err=>{
  //   alert("something went wrong")
  // }

}
