import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { customSharedModule } from '../custom-shared.module';
import { MainComponent } from './components/main/main.component';
//import { NewHeroDialogComponent } from './reusable-fragments/new-hero-dialog/new-hero-dialog.component';
import { PrimeNGModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewHeroDialogComponent } from './reusable-fragments/new-hero-dialog/new-hero-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/api/');
}



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
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class MainModule { }
