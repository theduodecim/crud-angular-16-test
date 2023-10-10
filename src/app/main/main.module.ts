import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { customSharedModule } from '../custom-shared.module';
import { MainComponent } from './components/main/main.component';
//import { NewHeroDialogComponent } from './reusable-fragments/new-hero-dialog/new-hero-dialog.component';
import { PrimeNGModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewHeroDialogComponent } from './reusable-fragments/new-hero-dialog/new-hero-dialog.component';





@NgModule({
  declarations: [
    MainComponent,
    NewHeroDialogComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
   
  ]
})
export class MainModule { }
