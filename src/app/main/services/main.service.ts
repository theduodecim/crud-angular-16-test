import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
@Injectable()
export class MainService {
    baseUrl="/api";
    enpointHeros="heros";
    enpointVillans="villans";
    start: number = 0;
    end: number = 20;

    constructor(private httpClient: HttpClient) {}
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

    getHeroData = (mode?: string):Observable<any> => {
        if(mode == 'villans') {
            return this.httpClient.get<Hero[]>(`${this.baseUrl}/${this.enpointVillans}`);
        }else {
            return this.httpClient.get<Hero[]>(`${this.baseUrl}/${this.enpointHeros}`);
        }
      }

    getHerosById = (id:number) => {
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/${this.enpointHeros}/${id}`, { params: { observe: 'response' } });
      }


    deleteHero = (arr_hero:any) => {
        return this.httpClient.delete<any>(`${this.baseUrl}/${this.enpointHeros}`, arr_hero);
      }

    addHero = (hero:Hero) => {
        return this.httpClient.post<Hero>(`${this.baseUrl}/${this.enpointHeros}`, hero);
      }

    updateHero = (hero:Hero) => {
        return this.httpClient.put<any>(`${this.baseUrl}/${this.enpointHeros}`, hero);
      }




};