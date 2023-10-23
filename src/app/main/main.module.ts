import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { customSharedModule } from '../custom-shared.module';
import { MainComponent } from './components/main/main.component';
//import { NewHeroDialogComponent } from './reusable-fragments/new-hero-dialog/new-hero-dialog.component';
import { PrimeNGModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewHeroDialogComponent } from './reusable-fragments/new-hero-dialog/new-hero-dialog.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { UppercaseDirective } from './directives/uppercase.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/api/');
}

@NgModule({
  declarations: [MainComponent, NewHeroDialogComponent, UppercaseDirective],
  imports: [
    CommonModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [MessageService, TranslateStore, TranslateService],
})
export class MainModule {}
