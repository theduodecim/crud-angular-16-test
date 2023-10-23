import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public translateService: TranslateService) {
    this.translateService.addLangs(['en', 'es']);
    this.translateService.setDefaultLang('es');
    const broserLang = translateService.getBrowserLang();
    translateService.use(broserLang?.match(/en|es/) ? broserLang : 'en');
  }
}
