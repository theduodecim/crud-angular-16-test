import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { MockHeroVillanData } from './mock.hero.data';

// import { MockHeroData, MockVillainData } from './mock.data';

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
    HttpClientInMemoryWebApiModule.forRoot(MockHeroVillanData, {delay: 1000}),
   // HttpClientInMemoryWebApiModule.forRoot(MockVillainData, {delay: 1000})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
