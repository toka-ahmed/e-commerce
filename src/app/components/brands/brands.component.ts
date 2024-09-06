import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/Interfaces/ibrand';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgFor],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  private readonly _BrandsService= inject(BrandsService)
brandList:IBrand[]=[]
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) =>{
        console.log(res.data)
        this.brandList=res.data
      } ,
      error: (err) =>{
        console.log(err)
      }
    })
  }

isClicked:boolean = false

imgSrc:string= ''
name:string= ''
slug:string= ''

open(imgSrc:string , name:string ,slug:string):void{
  this.isClicked = true
  this.imgSrc = imgSrc
  this.name = name
  this.slug = slug
}

}
