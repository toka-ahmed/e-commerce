import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { log } from 'node:console';
import { IOrder } from '../../core/Interfaces/iorder';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  private readonly _OrderService = inject(OrderService)



allOrderHave:IOrder[]=[]


ngOnInit(): void {
  this._OrderService.saveUserData()

  this._OrderService.getAllOrders((this._OrderService.userData).id).subscribe({
    next: (data) =>{
      this.allOrderHave=data
      console.log(data)
    },
    error: (error) => console.error(error)
  })
  ;

}

}
