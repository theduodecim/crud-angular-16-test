import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public languageSubject = new Subject<any>();
  public languageObservable: Observable<any>;

  constructor(public translate: TranslateService) {
    this.languageObservable = this.languageSubject.asObservable();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.SendSubjectLanguageData(event.lang);
      localStorage.setItem('language', event.lang);
    });
    // console.log('language Service trigger');
  }

  SendSubjectLanguageData(data: any) {
    //  console.log(data); I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.languageSubject.next(data);
  }
}
