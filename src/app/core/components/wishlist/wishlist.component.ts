import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { IWishList } from '../../Interfaces/iwish-list';
import { CurrencyPipe } from '@angular/common';
import { loadingInterceptor } from '../../interceptors/loading.interceptor';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

wishListItems:IWishList[]=[]

clearAll():void{
  this.wishListItems =[]

}


  ngOnInit(): void {
    this.wish()
    
  }

  wish():void{
    this._WishlistService.getAllWishList().subscribe({
      next: (res) =>{
        this.wishListItems = res.data

      } 
    })
  }

  deleteItem(id:string):void{
    this._WishlistService.deleteItemWish(id).subscribe({
      next: (res) =>{
       this.wish()

        
        },
    })
  }


 addToCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next: (res) =>{
      console.log(res) 
      this._ToastrService.success(res.message , 'FreshCart')
      this._CartService.cartNumber.next(res.numOfCartItems)
      },
  })
 }

}
