import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ProductModel } from './product.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  formValue !: FormGroup;
  product : ProductModel = new ProductModel();
  products : any;
  showAdd : boolean = false;
  showUpdate : boolean = false; 
  searchProduct : string = '';
  public filterCategory : any;

  constructor(private formbuilder : FormBuilder, private api : ApiService,
    private cartService : CartService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      productName : [''],
      image : [''],
      description : [''],
      author : [''],
      hours : [''],
      lectures : [''],
      category : [''],
      price : [''],
      inStock : ['']
    })
    this.getAllProducts();

    this.cartService.search.subscribe((product : any) => {
      this.searchProduct = product;
    })
    
  }

  getAllProducts() {
    this.api.getProduct()
    .subscribe(result => {
      this.products = result.products;
      this.filterCategory = result.products;
      result.products.forEach((a:any) => {
        if(a.category === 'Web development') {
        a.category = 'Web development'
      }
      if(a.category === 'Database Design & Development') {
        a.category = 'Database Design & Development'
      }
      if(a.category === 'Other IT & Software') {
        a.category = 'Other IT & Software'
      }
      if(a.category === 'IT Certifications') {
        a.category = 'IT Certifications'
      }
      if(a.category === 'Mobile Development') {
        a.category = 'Mobile Development'
      }
      })
      
      
      console.log(result.products);
    })
  }

  clickAddProduct() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  
  addProduct() {
    this.product.ProductName = this.formValue.value.productName;
    this.product.Description = this.formValue.value.description;
    this.product.Image = this.formValue.value.image;
    this.product.Category = this.formValue.value.category;
    this.product.Author = this.formValue.value.author;
    this.product.Hours = this.formValue.value.hours;
    this.product.Lectures = this.formValue.value.lectures;
    this.product.Price = this.formValue.value.price;
    this.product.InStock = this.formValue.value.inStock;

    this.api.addProduct(this.product)
    .subscribe(result => {
      console.log(result);
      this.toastr.success("Product Added Successfully!");
      let close = document.getElementById("cancel")
      close?.click();
      this.formValue.reset();
      this.getAllProducts();
    },
    err => {
      this.toastr.error("Error...")
    })
  }

  editProduct(product : any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.product.Id = product.id;
    this.formValue.controls['productName'].setValue(product.productName);
    this.formValue.controls['description'].setValue(product.description);
    this.formValue.controls['image'].setValue(product.image);
    this.formValue.controls['category'].setValue(product.category);
    this.formValue.controls['author'].setValue(product.author);
    this.formValue.controls['hours'].setValue(product.hours);
    this.formValue.controls['lectures'].setValue(product.lectures);
    this.formValue.controls['price'].setValue(product.price);
    this.formValue.controls['inStock'].setValue(product.inStock);
  }

  updateProduct() {
    this.product.ProductName = this.formValue.value.productName;
    this.product.Description = this.formValue.value.description;
    this.product.Image = this.formValue.value.image;
    this.product.Category = this.formValue.value.category;
    this.product.Author = this.formValue.value.author;
    this.product.Hours = this.formValue.value.hours;
    this.product.Lectures = this.formValue.value.lectures;
    this.product.Price = this.formValue.value.price;
    this.product.InStock = this.formValue.value.inStock;

    this.api.updateProduct(this.product)
    .subscribe(result => {
      this.toastr.success("Product edited!")
      let close = document.getElementById("cancel")
      close?.click();
      this.formValue.reset();
      this.getAllProducts();
    })
  }

  deleteProduct(product : any) {
    this.api.deleteProduct(product.id)
    .subscribe(result => {
      this.toastr.success("Product Deleted!")
      this.getAllProducts();
    })
  }

  addToCart(product : any) {
    this.cartService.addToCart(product);
  }

  filter(category : string) {
    this.filterCategory = this.products.filter((product : any) => {
      if(product.category == category || category == '') {
        return product;
      }
    })
  }
}
