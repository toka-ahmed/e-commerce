import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/Interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { SplitPipe } from '../../core/pipes/split.pipe';
import { CategoriesService } from '../../core/services/categories.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink , CurrencyPipe , SplitPipe, SearchPipe , FormsModule , NgClass],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit{
  constructor(){
    this.loadWishlistFromLocalStorage();
  }
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)

  allProduct:IProduct[] = []
  text:string ="";


  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) =>{
        console.log(res.data   )
          this.allProduct = res.data
     
      },
      error: (err) =>{
        console.error(err)
      } 
    })
    
  }
  addCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
      console.log(res)
      this._ToastrService.success(res.message , 'FreshCart')
    this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  
  }
  wishlist: Set<string> = new Set<string>();

  addWishList(productId: string): void {
    if (this.wishlist.has(productId)) {
      this._WishlistService.deleteItemWish(productId).subscribe({
        next: (res:string) => {
          console.log(res);
          this._ToastrService.success( 'Removed from Wishlist 💔');
          this.wishlist.delete(productId); 
          this.saveWishlistToLocalStorage();
        },
        error: (err:string) => {
          console.error(err);
        }
      });
    } else {
      this._WishlistService.addToWishList(productId).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success('It has been successfully added. ❤️');
          this.wishlist.add(productId); 
          this.saveWishlistToLocalStorage();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
  saveWishlistToLocalStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));
  }
  
  loadWishlistFromLocalStorage(): void {
    const wishlistFromStorage = localStorage.getItem('wishlist');
    if (wishlistFromStorage) {
      this.wishlist = new Set<string>(JSON.parse(wishlistFromStorage));
    }
  }


  
}
