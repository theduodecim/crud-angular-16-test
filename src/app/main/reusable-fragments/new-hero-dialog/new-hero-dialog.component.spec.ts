import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MessageService } from 'primeng/api';
import { AutoComplete } from 'primeng/autocomplete';
import { Dropdown } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MockHeroVillanData } from 'src/app/mock.data';
import { PrimeNGModule } from 'src/app/primeng.module';
import { MainComponent } from '../../components/main/main.component';
import { HttpLoaderFactory } from '../../main.module';
import { MainService } from '../../services/main.service';

import { NewHeroDialogComponent } from './new-hero-dialog.component';

describe('NewHeroDialogComponent', () => {
  let component: NewHeroDialogComponent;
  let fixture: ComponentFixture<NewHeroDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, NewHeroDialogComponent],
      imports: [
        CommonModule,
        PrimeNGModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientInMemoryWebApiModule.forRoot(MockHeroVillanData, {
          delay: 1000,
          dataEncapsulation: false,
          put204: false,
          passThruUnknownUrl: true,
          delete404: true,
        }),
        TranslateModule.forChild({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        MessageService,
        TranslateStore,
        TranslateService,
        MainService,
        DynamicDialogRef,
        DynamicDialogConfig,
      ],
    });
    fixture = TestBed.createComponent(NewHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should createId', () => {
    expect(component.createId()).toBeTruthy();
  });
  it('Should create the heroForm with expected controls and validators', fakeAsync(() => {
    fixture.detectChanges();
    component.createForm(); // Call the method to create the form
    // Access the form controls
    tick();
    const heroForm: FormGroup = component.heroForm;
    const nameControl: FormControl = heroForm.get('name') as FormControl;
    const descriptionControl: FormControl = heroForm.get(
      'description'
    ) as FormControl;
    const categoryControl: FormControl = heroForm.get(
      'category'
    ) as FormControl;
    const ratingControl: FormControl = heroForm.get('rating') as FormControl;
    const gearControl: FormControl = heroForm.get('gear') as FormControl;
    // Expectations
    expect(heroForm).toBeDefined();
    expect(nameControl).toBeDefined();
    expect(descriptionControl).toBeDefined();
    expect(categoryControl).toBeDefined();
    expect(ratingControl).toBeDefined();
    expect(gearControl).toBeDefined();
    expect(nameControl.valid).toBe(false); // Name control should be invalid initially
    expect(descriptionControl.valid).toBe(false); // Description control should be invalid initially
    expect(categoryControl.valid).toBe(true); // Category control should be invalid initially
    expect(ratingControl.valid).toBe(false); // Rating control should be invalid initially
    expect(gearControl.valid).toBe(true); // Name control should be invalid initially
  }));

  it('Should loadHeroData', () => {
    var hero = {
      id: '1',
      name: 'The Mighty Thor',
      description: 'A powerful Norse god of thunder and lightning.',
      gear: 'Mjolnir, his enchanted hammer',
      category: 'Melee',
      rating: 5,
    };
    component.loadHeroData(hero);
    expect(component.heroForm.controls['name']).toBeTruthy();
  });

  it('Should Change Category', () => {
    fixture.detectChanges();
    //  tick(5000);
    const dropdown: Dropdown = fixture.debugElement.query(
      By.css('p-dropdown')
    ).componentInstance;
    
    dropdown.selectItem(new Event('change'), { id: 2, label: 'Speedster' });
    dropdown.onChange.emit({
      originalEvent: new Event('change'),
      value: { id: 2, label: 'Speedster' },
    });
    expect(component!.selCategory).toEqual(dropdown?.value);
  });

  it('Should update heroForm and autoCElemnt when event contains query', () => {
    const event = { query: 'thor' };
    const autoCElemnt: AutoComplete = {
      inputEL: {
        nativeElement: {
          value: 'thor',
        },
      },
    } as AutoComplete;
    component.onSelorCompleteAutoCompleteHero(event, autoCElemnt);
    // Expectations
    const heroForm: FormGroup = component.heroForm;
    const nameControl = heroForm.controls['name'];
    expect(nameControl.value).toBe('THOR');
    expect(autoCElemnt.inputEL?.nativeElement.value).toBe(
      'thor'.toUpperCase()
    );
  });






});
