import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  registerSub!: Subscription


private readonly _AuthService = inject(AuthService)
private readonly _FormBuilder = inject(FormBuilder)
private readonly _Router = inject(Router)
private readonly _ToastrService = inject(ToastrService)

msgError:string="";
isLoading:boolean= false;
msgSuccess:string ='';

registerForm:FormGroup= this._FormBuilder.group({
  name: [null, [Validators.required ,Validators.minLength(3), Validators.maxLength(20)]],
  email: [null, [Validators.required, Validators.email]],
  password: [null, [Validators.required , Validators.pattern(/^\w{6,}$/)]],
  rePassword: [null],
  phone: [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
} , {validators:[this.confirmPassword]} )

  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required ,Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl(null , [Validators.required , Validators.email]),
  //   password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(null),
  //   phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // } , this.confirmPassword ) ;


  registerSubmit():void{
    if(this.registerForm.valid){
      this.isLoading = true;
     this.registerSub = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
         if(res.message=='success'){
      this.msgSuccess= "Success transfer to login";
      this._ToastrService.success('success Transfer To Login' , 'FreshCart')
          setTimeout(() => {
          this._Router.navigate(['/login'])
          }, 2000);
         }

          console.log(res);
      this.isLoading = false;

          },
          error: (err:HttpErrorResponse) => {
            this._ToastrService.error(err.error.message , 'FreshCart')
      this.isLoading = false;
            this.msgError = err.error.message
            console.log(err);
            }
      })
     
    }else{
      // this.msgError = "Please fill all fields";
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
 
  }

  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value ){
      return null
    }else{
      return {mismatch:true}
    }
    
  }
  ngOnDestroy(): void {
    
    this.registerSub?.unsubscribe();
  }



  
}
