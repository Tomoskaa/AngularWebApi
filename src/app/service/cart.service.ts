import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');
  
  constructor() { }
  
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product : any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product : any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice() : number {
    let totalPrice = 0;
    this.cartItemList.map((result:any) => {
      totalPrice += result.price;
    })
    return totalPrice;
  }

  removeCartItem(product : any) {
    this.cartItemList.map((result:any, index:any) => {
      if(product.id === result.id) {
        this.cartItemList.splice(index, 1);
      }
    })
  }
}

 
