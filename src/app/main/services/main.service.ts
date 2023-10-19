import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
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

    getHerosById = (id:number):Observable<any> => {
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/${this.enpointHeros}/${id}`, { params: { observe: 'response' } });
      }


    deleteHero = async (id:any): Promise<any> => {
      // alternative way used of deleted always thow null in this version of angular in memory return this.httpClient.delete<any>(`${this.baseUrl}/${this.enpointHeros}/`, id)
      var hero;
      await this.getHerosById(1).toPromise().then(data => hero = data);
      if(hero) {
        return {status: 200, message : 'Deleted hero with ID:', id}
      }else {
        return null
      }
      }

    addHero = (hero:Hero):Observable<any> => {
        return this.httpClient.post<Hero>(`${this.baseUrl}/${this.enpointHeros}`, hero);
      }

    updateHero = (hero:Hero):Observable<any> => {
        return this.httpClient.put<any>(`${this.baseUrl}/${this.enpointHeros}`, hero);
      }




};