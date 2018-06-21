import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { CustomValidators } from 'ng2-validation';
import 'rxjs/add/operator/take'

//interface
import { Product } from '../../../interface/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  formStoreProduct: FormGroup

  dataProduct: Product
  titleProduct: string = null
  imageUrl: string = null
  price = null

  isEdit: boolean
  paramProductId = null
  categories: any = []
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.setFormData(null)

    this.activateRoute.params.subscribe(params => {
      this.paramProductId = params['id']
    })
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories()
    this.getProduct(this.paramProductId)
  }

  setFormData(data: Product) {
    if (!data) {
      data = {
        $key: null,
        title: null,
        price: null,
        category: null,
        imageUrl: null
      }
    }

    if (!this.formStoreProduct) {
      this.formStoreProduct = new FormGroup({
        title: new FormControl(data.title, [Validators.required,]),
        price: new FormControl(data.price, [Validators.required, CustomValidators.min(0)]),
        category: new FormControl(data.category, [Validators.required]),
        imageUrl: new FormControl(data.imageUrl, [Validators.required, CustomValidators.url]),
      })

      this.formStoreProduct.valueChanges.subscribe(i => {
        let product: Product = {
          $key: i.$key,
          imageUrl: i.imageUrl,
          title: i.title,
          price: i.price
        }
        this.dataProduct = product
      })

    } else {
      this.formStoreProduct.setValue(data)
      let product: Product = {
        $key: data.$key,
        imageUrl: this.formStoreProduct.value.imageUrl,
        title: this.formStoreProduct.value.title,
        price: this.formStoreProduct.value.price
      }
      this.dataProduct = product
    }

    this.changeStatusBtn();

  }

  getProduct(productId) {
    if (!productId) return

    this.productService.getProduct(productId).take(1).subscribe(data => {
      this.setFormData(data)
    })
  }

  save() {
    let product = this.formStoreProduct.value
    if (this.paramProductId) {
      this.productService.updateProduct(this.paramProductId, product)
    } else {
      this.productService.create(product)
    }
    this.router.navigate(['/admin/products'])
  }

  delete(e) {
    e.preventDefault();

    let popup = confirm('Are you sure want to delete this product')
    if (!popup) {
      return
    } else {
      this.productService.deleteProduct(this.paramProductId)
      this.router.navigate(['admin/products'])
    }
  }

  changeStatusBtn() {
    if (!this.paramProductId) return;
    this.isEdit = true;
  }


} 