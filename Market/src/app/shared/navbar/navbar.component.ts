import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service/service.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { UpdateprofileComponent } from 'src/app/auth/updateprofile/updateprofile.component';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  vendorId: string | null = null; // Ajoutez la propriété vendorId

  constructor(private dialog: MatDialog, private service: ServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.vendorId = params.get('id');
      if (this.vendorId) {
        this.getAllProducts();
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProducts();
      }
    })
  }

  getAllProducts() {
    // Check if the vendorId is available in the route parameters
    if (this.route.snapshot.paramMap.has('id')) {
      // If the vendorId is available, fetch products for that specific vendor
      const vendorId = this.route.snapshot.paramMap.get('id');
      this.service.getProductsByvendor(vendorId!).subscribe({
        next: (res: Product[]) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (e) => {
          alert("Error while fetching the data");
        }
      });
    } else {
      // If the vendorId is not available, fetch all products
      this.service.getAllProducts().subscribe({
        next: (res: Product[]) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (e) => {
          alert("Error while fetching the data");
        }
      });
    }
  }




  openProfile() {
    this.dialog.open(UpdateprofileComponent, {
      width: '30%'
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

