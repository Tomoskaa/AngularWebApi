import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';  
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public productAPIUrl : string = "https://localhost:44314/api/Product/";

  constructor(private http : HttpClient) { }

  getProduct() {
    return this.http.get<any>(`${this.productAPIUrl}getProducts`)
    .pipe(map((result : any) => {
      return result;
    }))
  }

  addProduct(data : any) {
    return this.http.post<any>(`${this.productAPIUrl}add_product`, data)
    .pipe(map((result : any) => {
      return result;
    }))
  }

  updateProduct(data : any) {
    return this.http.put<any>(`${this.productAPIUrl}update_product`, data)
    .pipe(map((result : any) => {
      return result;
    }))
  }

  deleteProduct(id : number) {
    return this.http.delete<any>(`${this.productAPIUrl}delete_product/` + id)
    .pipe(map((result : any) => {
      return result;
    }))
  }

}
