import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive , TranslateModule , RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
 readonly _AuthService = inject(AuthService)
 readonly _TranslateService = inject(TranslateService)
private readonly _MytranslateService = inject(MytranslateService)
private readonly _CartService = inject(CartService)
private readonly _WishlistService = inject(WishlistService)

idToken:string=''
countNumber:number = 0 ;
cartID:string=''

ngOnInit(): void {

  this._CartService.getProductsCart().subscribe({
    next: (res) => {
      this._CartService.cartNumber.next(res.numOfCartItems)
    this.cartID = res.cartId
      },
  })

  this._CartService.cartNumber.subscribe({
    next:(data)=>{
      this.countNumber = data;
    }
  })
}
 change(lang:string):void{
  this._MytranslateService.changeLang(lang)

 }

}
