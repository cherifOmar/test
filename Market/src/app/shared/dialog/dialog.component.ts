import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  formData = new FormData();


  freshnessList= ["xxx","yyy","ooo"]
  productForm!: FormGroup
  actionBtn : string ='save'

  constructor(private formBuilder:FormBuilder,
    private service:ServiceService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject (MAT_DIALOG_DATA) public editData:any) { }
    id= this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name : ['', Validators.required],
      category : ['', Validators.required],
      price : ['', Validators.required],
      quantity : ['', Validators.required],
      // image : [''],
      status : ['', Validators.required],
      description : ['', Validators.required],
      // date : ['', Validators.required],
    })

    if(this.editData) {
        this.actionBtn = 'update'
        this.productForm.controls['name'].setValue(this.editData.name);
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['quantity'].setValue(this.editData.quantity);
        // this.productForm.controls['image'].setValue(this.editData.image);
        this.productForm.controls['status'].setValue(this.editData.status);
        this.productForm.controls['description'].setValue(this.editData.description);
        // this.productForm.controls['date'].setValue(this.editData.date);

    }

  }

  addProduct() {
    if (!this.editData){
      if(this.productForm.valid) {
        if(this.productForm.value.quantity>0){
          this.productForm.value.status=="enstock"
        }else if(this.productForm.value.quantity==0) {
          this.productForm.value.status=="nestpasenstock"

        }
        this.service.addProduct(this.productForm.value,localStorage.getItem('user_id')).subscribe({
          next:(res)=>{

            alert("Product added successfully")
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the Product")

          }
        })
      }
    }else {
      this.updateProduct()
    }
  }

  updateProduct() {
    this.service.putProduct(this.productForm.value,this.editData._id).subscribe({
      next:(res)=>{

        alert("Product updated successfylly")
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the Product")

      }
    })
  }


  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    this.formData.append('image', file, file.name);
  }



}
