import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0) ;

  constructor(private readonly _HttpClient : HttpClient) { }


myHeader:any = { token : localStorage.getItem('userToken')}

  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
      "productId": id
    },
    {
      headers: this.myHeader
    }
  );
  }


  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart` ,
      {
        headers: this.myHeader
      }
    )
  }

  deleteSpecificItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        headers: this.myHeader
      }
    )
      
  }
updateProductQuantity(id:string , newCount:number):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
    {
      "count": newCount
    },
    {
      headers: this.myHeader
      }
  )
}


clearCart():Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
    {
      headers: this.myHeader
      }
  )
}


}
