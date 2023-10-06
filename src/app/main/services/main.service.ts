import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Hero} from '../interfaces/hero.interface'
@Injectable()
export class MainService {

    constructor(public httpClient: HttpClient) {}

    getSeverity(status: string) {
        switch (status) {
            case 'Melee':
                return 'success';
            case 'Ranged':
                return 'warning';
            case 'Speedster':
                return 'danger';
           default:
              return 'info'  
        }
      }


    getHeroData(): Observable<Hero> {
        return this.httpClient.get('assets/data/heros-data.json');
    }


    getHeroMini() {
        //return Promise.resolve(this.getHeroData().slice(0, 5));
    }

    getHeroSmall() {
        //return Promise.resolve(this.getHeroData().slice(0, 10));
    }

    getHeros() {
        return Promise.resolve(this.getHeroData());
    }

    getHeroWithOrdersSmall() {
     //   return Promise.resolve(this.getHeroWithOrdersData().slice(0, 10));
    }

    getHeroWithOrders() {
      //  return Promise.resolve(this.getHeroWithOrdersData());
    }
};