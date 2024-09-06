import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/Interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly _CartService = inject(CartService);
private readonly _ToastrService = inject(ToastrService)
private readonly _Router = inject(Router)

cartNum:number=0
  cartDetails: ICart ={} as ICart
  num!:number  
  clearMsg!:string  


ngOnInit(): void {
  this._CartService.getProductsCart().subscribe({
    next: (res) => {
     this.num = res.numOfCartItems
      this.cartDetails = res.data;
      console.log(res)
      this.cartNum = res.numOfCartItems

    },
    error: (err) =>{
      console.error(err)
    }
  })
}

deleteItem(id:string):void{
  this._CartService.deleteSpecificItem(id).subscribe({
    next: (res) => {
      console.log(res)
      this.cartDetails = res.data;
      if(res.numOfCartItems === 0 ){
          this.cartNum ===0
      }
      this._ToastrService.error('Item Deleted' , 'FreshCart')
      this._CartService.cartNumber.next(res.numOfCartItems)
    },
    error: (err)=>{
      console.error(err)
    }
  })
}

updateCount(id:string , count:number):void{
if(count > 0){
  this._CartService.updateProductQuantity(id,count).subscribe({
    next: (res) => {
      console.log(res.data)
      this.cartDetails = res.data;
      this.num = res.numOfCartItems
    this._ToastrService.success('Update Item count' , 'FreshCart')


      
    },
    error:(err)=>{
      console.error(err)
    }
  })
}
}

clearItems():void{
  this._CartService.clearCart().subscribe({
    next: (res) => {
     this.clearMsg = res.message
      this.cartDetails = {} as ICart
      this._ToastrService.error('All Items Deleted' , 'FreshCart')
    this._CartService.cartNumber.next(0)
    setTimeout(() => {
    this._Router.navigate(['/home'])
    }, 2000);
    

      this.cartNum =0
      },
      error: (err)=>{
        console.error(err)
      }
    })
}



}
