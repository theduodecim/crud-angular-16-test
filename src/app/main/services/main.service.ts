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

    getHerosById =(id:number) => {
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/${this.enpointHeros}/${id}`, { params: { observe: 'response' } });
      }
    setPaginatorStartAndEnd(start:number, end:number) {
        this.start = start;
        this.end = end;
    }

    getPaginatorStartAndEnd() {
        return [this.start, this.end];
    }

   
    getVillansData(): Observable<any> {
         return this.httpClient.get('assets/data/villans-data.json').pipe(delay(1500));
     }
 



};