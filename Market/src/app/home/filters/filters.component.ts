import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<any>;

  @Output() showCategory = new EventEmitter<String>();

  @Input() title:string=""
  @Input() data:any[]=[]
  @Output() selectedValue = new EventEmitter()

  categories: String[] | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.service
    .getAllCategories()
    .subscribe((response: Array<String>) => {
      this.categories = response;
    });
  }

  onShowCategory(category: String){
    this.showCategory.next(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }



  detectChanges(event:any){
    this.selectedValue.emit(event)
  }

}
