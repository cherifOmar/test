import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  idf:any;
  user:any;
  username:any;
  mail:any;
  password:any;
  confirmPassword:any;
  status:any;
  phone:any;
  signupList= ["Client","Vendeur"]
  signupForm!: FormGroup
  constructor(private formBuilder:FormBuilder,
     private dialog:MatDialog,
     private dialogRef: MatDialogRef<LoginComponent>,
     private service: ServiceService,
     private act:ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.idf=this.act.snapshot.params['idp'];
    // this.service.getUserById(this.idf).subscribe(
    //   (d)=>{
    //     this.user = d;
    //     this.username=this.user.username;
    //     this.email=this.user.email;
    //     this.password=this.user.password;
    //     this.confirmPassword=this.user.confirmPassword;
    //     this.status=this.user.status;
    //     this.phone=this.user.phone;


    //     },
    // )
  }


  // updateprofile(f:any){
  //   this.service.updateProfile(f,this.idf).subscribe(
  //     ()=>{
  //       console.log('updated');
  //     }
  //   )
  // }

}
