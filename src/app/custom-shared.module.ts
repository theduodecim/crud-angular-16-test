import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from './primeng.module';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  exports: [
    CommonModule,
    PrimeNGModule
  ]
})
export class customSharedModule { }
