import { CategoryService } from './../../../service/category.service';
import { Component, OnInit, Input } from '@angular/core'; 

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  dataCategories: any

  @Input() category: string
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(res => this.dataCategories = res)
  }

}
