import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { MockHeroVillanData } from './mock.data';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    HttpClientInMemoryWebApiModule.forRoot(MockHeroVillanData, {delay: 1000, dataEncapsulation: false, passThruUnknownUrl: true}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
