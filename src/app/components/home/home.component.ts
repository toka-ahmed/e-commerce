import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/Interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../core/Interfaces/icategory';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { SplitPipe } from '../../core/pipes/split.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,FormsModule , RouterLink , CurrencyPipe , SplitPipe , SearchPipe , NgClass , TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _WishlistService = inject(WishlistService)
    
constructor(){
  this.loadWishlistFromLocalStorage();
}
productList:IProduct[]=[];
categoriesList:Icategory[]=[];
getAllProductSub!: Subscription

text:string ="";

customOptionsCat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  autoplay: true,
  rtl:true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  autoplay: true,
  rtl:true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  navText: ['', ''],
 items:1,
  nav: true
}



ngOnInit(): void {
  this._NgxSpinnerService.show('loading-3')
  this._CategoriesService.getAllCategories().subscribe({
    next: (res) => {
      console.log(res.data)
      this.categoriesList = res.data
  this._NgxSpinnerService.hide('loading-3')

      
    },
    error: (err) => {
      console.log(err)
      }
  })





  this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
    next: (res) =>{
      console.log(res.data)
      this.productList=res.data
    },
    error: (err) =>{
      console.error(err)
    } 
  })
}


ngOnDestroy(): void {
  this.getAllProductSub?.unsubscribe()
}



addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next: (res) => {
    console.log(res)
    this._ToastrService.success(res.message , 'FreshCart')
    this._CartService.cartNumber.next(res.numOfCartItems)
    console.log(this._CartService.cartNumber)
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
// this._WishlistService.wishListNumber.next(res.numOfWishListItems)
      // console.log(this._WishlistService.wishListNumber)