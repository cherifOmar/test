import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../../service/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Product } from 'src/app/models/product'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css']
})
export class TableProductComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'price', 'quantity', 'status', 'description', 'date', 'action'];
  dataSource!: MatTableDataSource<Product>; // Utilisez le type Product pour le MatTableDataSource

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() vendorId: string | null = null; // Ajoutez l'entrée vendorId

  constructor(private dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    this.getProductsForVendor(); // Utilisez la méthode getProductsForVendor pour filtrer les produits du vendeur
  }

  getProductsForVendor() {
    if (this.vendorId) {
      this.service.getProductsByvendor(this.vendorId).subscribe(
        (res: Product[]) => {
          this.dataSource = new MatTableDataSource<Product>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          alert('Erreur lors de la récupération des produits du vendeur');
        }
      );
    } else {
      // Si le vendorId n'est pas disponible, récupérez tous les produits
      this.getAllProducts();
    }
  }

  getAllProducts() {
    this.service.getProduct().subscribe({
      next: (res: Product[]) => {
        this.dataSource = new MatTableDataSource<Product>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        alert('Erreur lors de la récupération des données');
      }
    })
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllProducts();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    this.service.deleteProduct(id).subscribe({
      next: (res) => {
        alert("Produit supprimé avec succès")
        this.getAllProducts();
      },
      error: (e) => {
        alert("Erreur lors de la suppression du produit")
      }
    })
  }

}
