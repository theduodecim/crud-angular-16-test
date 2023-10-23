import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MainService } from './main.service';
import { Hero } from '../interfaces/hero.interface';
import { Observable } from 'rxjs';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockHeroVillanData } from 'src/app/mock.data';

describe('Testing "MainService"', () => {
  let service: MainService;

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
      ],
      providers: [MainService, HttpClientTestingModule],
    });
    service = TestBed.inject(MainService);
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
      console.log(heros);
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
      console.log(success);
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
      console.log(success);
      expect(success).toBeTruthy();
    }
  ));

  it('Main Service DELETE Data', inject(
    [HttpClient, MainService],
    async (httpClientTest: HttpClient, mainService: MainService) => {
      var success: any;

      await mainService.deleteHero(1).then((res) => (success = res));
      console.log(success);
      expect(success).toBeTruthy();
    }
  ));
});
