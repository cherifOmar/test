import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    UpdateprofileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
