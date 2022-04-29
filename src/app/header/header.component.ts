import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public searchProduct : string = '';
  pageTitle = 'ProductsShop';

  constructor(private cartService : CartService, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(result => {
      this.totalItem = result.length;
    })
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  search(event : any) {
    this.searchProduct = (event.target as HTMLInputElement).value;
    console.log(this.searchProduct);
    this.cartService.search.next(this.searchProduct)
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
