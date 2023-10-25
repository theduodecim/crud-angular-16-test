import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainService } from './main.service';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockHeroVillanData } from 'src/app/mock.data';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from '../main.module';
import { MainComponent } from '../components/main/main.component';
import { Dropdown } from 'primeng/dropdown';
import { By } from '@angular/platform-browser';

describe('Testing Translate Feature', () => {
  let service: MainService;
  let translateService: TranslateService;
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;





  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(MockHeroVillanData, {
          delay: 1000,
          dataEncapsulation: false,
          put204: false,
          passThruUnknownUrl: true,
          delete404: true,
        }),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        MainService,
        HttpClientTestingModule,
        TranslateService,
        TranslateStore,
        TranslateLoader,
      ],
    });
    service = TestBed.inject(MainService);
    translateService = TestBed.inject(TranslateService)
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Select Language And Change', () => {
    fixture.detectChanges();
    //  tick(5000);
    const dropdown: Dropdown = fixture.debugElement.query(
      By.css('p-dropdown')
    ).componentInstance;
    dropdown;
    dropdown.selectItem(new Event('change'), { label: 'en', value: 'en' });
    dropdown.onChange.emit({ originalEvent: new Event('change'), value: 'es' });
    expect(component!.languageBind).toEqual(dropdown?.value);
  });


 
 






});
