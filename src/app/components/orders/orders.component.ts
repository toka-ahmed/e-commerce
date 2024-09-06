import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrderService = inject(OrderService)


  cartId:string|null = ''

  orders:FormGroup =  this._FormBuilder.group({
    details: [null , [Validators.required]],
    phone: [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null , [Validators.required]],
  })


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
       this.cartId = params.get('id')
        }
    })
    
  }


  ordersSubmit():void{
    console.log(this.orders.value)
    this._OrderService.checkOut(this.cartId , this.orders.value).subscribe({
      next: (res) => {
        console.log(res)
        if(res.status === 'success'){
          window.open(res.session.url , '_self')

        }
      },
      error: (err) =>{ 
        console.log(err)
      }
      })

  }

}
