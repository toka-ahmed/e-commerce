import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  userData:any=null

  saveUserData():void{
    if ( localStorage.getItem('userToken') !==null) {
     this.userData= jwtDecode(localStorage.getItem('userToken')!)
    }
    // console.log((this.userData).id)
  
  }
myHeader:any = { token : localStorage.getItem('userToken')}


  constructor(private readonly _HttpClient : HttpClient) { }

checkOut(idCart:string|null ,shippingDetails:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,
    {
      "shippingAddress":shippingDetails

    },

    {
      headers: this.myHeader
    }
  );
}

getAllOrders(id:string | null):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)

}



}
