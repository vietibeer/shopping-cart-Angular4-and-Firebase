import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { ISubscription } from 'rxjs/Subscription';

//service
import { ProductService } from './../../../service/product.service'

//interface
import { Product } from './../../../interface/product' 
 
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  dataProductsSub: ISubscription
  dataProducts: Product[]
  currentDataProducts: Product[]
  dataSearch: any = null 
  msgSearch: any = null
 
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() { 
    this.getProducts()
  }

  getProducts() {
    this.dataProductsSub = this.productService.getAllProducts().subscribe((res: any) => {
      this.dataProducts = res
      this.currentDataProducts = this.dataProducts
    })
   }

  searchFilter(dataSearch) {
    let data = []
    if (!dataSearch) {
      return
    } else {
      this.msgSearch = null
      this.currentDataProducts.forEach(res => {
        let result = res.title.toLowerCase().includes(dataSearch.toLowerCase())
        if (result) {
          data.push(res)
        }
      }) 
      
      if (data.length) {
        this.dataProducts = data
        this.msgSearch = `Find ${data.length} the record` 
      }

      if (!this.msgSearch) {
        this.msgSearch = 'No result is found'
      }  
    }
  }

  reset() {
    this.msgSearch = null
    this.dataSearch = null
    this.dataProducts = this.currentDataProducts
  }
 
  ngOnDestroy() {
    this.dataProductsSub.unsubscribe() 
    console.log(`destroy`);
    
  }

}
