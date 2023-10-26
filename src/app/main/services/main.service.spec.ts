import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
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
import { Hero } from '../interfaces/hero.interface';
import { MainComponent } from '../components/main/main.component';
import { of } from 'rxjs';

describe('Testing "MainService"', () => {
  let service: MainService;
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
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Main Service GET Data', inject(
    [HttpClient, MainService],
    async (httpClientTest: HttpClient, mainService: MainService) => {
      var heros: any;
      await mainService
        .getHeroData()
        .toPromise()
        .then((data) => (heros = data));

      expect(heros).toBeTruthy();
    }
  ));

  it('Main Service ADD Data', inject(
    [HttpClient, MainService],
    async (httpClientTest: HttpClient, mainService: MainService) => {
      var newHero = {
        id: '999',
        name: 'Cheetah 2',
        description:
          'A cursed archaeologist with the abilities and appearance of a cheetah.',
        category: 'Melee',
        gear: 'Claws',
        rating: 4,
      };
      var success: any;
      await mainService
        .addHero(newHero)
        .toPromise()
        .then((res) => (success = res));

      expect(success).toBeTruthy();
    }
  ));

  it('Main Service UPDATE Data', inject(
    [HttpClient, MainService],
    async (httpClientTest: HttpClient, mainService: MainService) => {
      var hero: any;
      var success: any;
      await mainService
        .getHerosById(1)
        .toPromise()
        .then((data) => (hero = data));
      hero.name = 'The Mighty Thor, God of Thunder';
      await mainService
        .updateHero(hero)
        .toPromise()
        .then((res) => (success = res));

      expect(success).toBeTruthy();
    }
  ));

  it('Main Service DELETE Data', inject(
    [HttpClient, MainService],
    async (httpClientTest: HttpClient, mainService: MainService) => {
      var success: any;
      var error: any;
      await mainService.deleteHero(1).then((res) => success = res);
      await mainService.deleteHero(999).then((res) => error = res);
      
    expect(success).toBeTruthy();
    expect(error).toBeNull();
    }
  ));

  it('Main Service Get Hero by Id', inject(
    [HttpClient, MainService],
    async (httpClientTest: HttpClient, mainService: MainService) => {
      var hero: any;
      await mainService
        .getHerosById(1)
        .toPromise()
        .then((data) => (hero = data));
      expect(hero.id).toBeTruthy();
    }
  ));

  it('Should Validate Duplicated Hero', inject(
    [HttpClient, MainService],
    async (httpClientTest: HttpClient, mainService: MainService) => {
      var heros: Hero[] = [];
      const hero = {
        id: '1',
        name: 'The Mighty Thor',
        description: 'A powerful Norse god of thunder and lightning.',
        gear: 'Mjolnir, his enchanted hammer',
        category: 'Melee',
        rating: 5,
      };
      const hero2 = {
        id: '891',
        name: 'The Mighty Thor x',
        description: 'A powerful Norse god of thunder and lightning.',
        gear: 'Mjolnir, his enchanted hammer',
        category: 'Melee',
        rating: 5,
      };
      await mainService
        .getHeroData()
        .toPromise()
        .then((data) => (heros = data));

     
      // Set up your test conditions here, so that `validateDuplicatedHero(hero)` returns the expected result
      const isDuplicated = mainService.validateDuplicatedHero(hero, heros);
      expect(isDuplicated).toBe(true); // Use an expectation to validate the result
      const isnotDuplicated = mainService.validateDuplicatedHero(hero2, heros);
      expect(isnotDuplicated).toBe(false); // Use an expectation to validate the result
    }
  ));

/*
  it('should add a hero successfully', fakeAsync(() => {
    component.ngOnInit();
    const newhero: Hero = {
      id: '999',
      name: 'The Mighty Thor 2',
      description: 'A powerful Norse god of thunder and lightning.',
      gear: 'Mjolnir, his enchanted hammer',
      category: 'Melee',
      rating: 5
    }  
  
   spyOn(component, 'openEditNewHeroDialog');
   // spyOn(mainService, 'addHero');
    component.openEditNewHeroDialog();
    tick(2000)





    console.log(component.arr_heros);
    expect(component.openEditNewHeroDialog).toHaveBeenCalledWith();
  //  expect(mainService.addHero).toHaveBeenCalled();
  }));
*/

});
