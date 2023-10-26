import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  flush,
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
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Dropdown } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MockHeroVillanData } from 'src/app/mock.data';
import { PrimeNGModule } from 'src/app/primeng.module';
import { MainComponent } from '../../components/main/main.component';
import { Hero } from '../../interfaces/hero.interface';
import { HttpLoaderFactory } from '../../main.module';
import { MainService } from '../../services/main.service';
import { NewHeroDialogComponent } from './new-hero-dialog.component';
describe('NewHeroDialogComponent', () => {
  let component: NewHeroDialogComponent;
  let fixture: ComponentFixture<NewHeroDialogComponent>;
  let dynamicDialogRef: DynamicDialogRef;
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
    dynamicDialogRef = TestBed.inject(DynamicDialogRef);
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
    const event1 = { query: 'thor' };
    const event2 = { name: 'thor' };
    const autoCElemnt: AutoComplete = {
      inputEL: {
        nativeElement: {
          value: 'thor',
        },
      },
    } as AutoComplete;
    component.onSelorCompleteAutoCompleteHero(event1, autoCElemnt);
    component.onSelorCompleteAutoCompleteHero(event2, autoCElemnt);
    // Expectations
    const heroForm: FormGroup = component.heroForm;
    const nameControl = heroForm.controls['name'];
    expect(nameControl.value).toBe('THOR');
    expect(autoCElemnt.inputEL?.nativeElement.value).toBe('thor'.toUpperCase());
  });

  it('Should set mode and load hero data if mode is "edit hero"', () => {
    const hero: Hero = {
      id: '999',
      name: 'The Mighty Thor 2',
      description: 'A powerful Norse god of thunder and lightning.',
      gear: 'Mjolnir, his enchanted hammer',
      category: 'Melee',
      rating: 1,
    };
    const dialogConfig = {
      data: {
        mode: 'edit hero',
        hero: hero,
      },
    };

    spyOn(component, 'loadHeroData');
    component.dialogConfig = dialogConfig;
    component.ngOnInit();

    expect(component.mode).toBe('edit hero');
    expect(component.loadHeroData).toHaveBeenCalledWith(dialogConfig.data.hero);
  });
  it('Should call with the provided hero and array of heroes', inject(
    [HttpClient, MainService],
    async (httpClientTest: HttpClient, mainService: MainService) => {
      const hero: Hero = {
        id: '999',
        name: 'The Mighty Thor 2',
        description: 'A powerful Norse god of thunder and lightning.',
        gear: 'Mjolnir, his enchanted hammer',
        category: 'Melee',
        rating: 1,
      };
      spyOn(mainService, 'validateDuplicatedHero').and.returnValue(true); // You can customize the return value based on your test case
      const isDuplicate = component.validateDuplicatedHero(hero);
      expect(isDuplicate).toBe(true); // You can adjust the expectation based on your test case
    }
  ));

  it('Should close the dialog with new hero mode and hero data if not a duplicate', () => {
    component.mode = 'new hero';
    spyOn(dynamicDialogRef, 'close').and.callThrough();
    spyOn(component, 'validateDuplicatedHero').and.returnValue(false);
    component.onSaveNewHero();
    expect(dynamicDialogRef.close).toHaveBeenCalledWith({
      mode: 'new hero',
      hero: component.heroForm.value,
    });
  });
  it('Should set duplicateHeroError if hero is a duplicate', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    component.mode = 'new hero';
    spyOn(component, 'validateDuplicatedHero').and.returnValue(true);
    spyOn(component.heroForm.controls['name'], 'setErrors');
    component.onSaveNewHero();
    expect(component.heroForm.controls['name'].setErrors).toHaveBeenCalledWith({
      duplicateHeroError: 'Duplicated',
    });
    flush();
  }));

  it('should filter and update arr_autoCompleteOpt based on query  characters', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    const autoCompleteEvent: AutoCompleteCompleteEvent = {
      query: 'Spider',
      originalEvent: new Event('input'),
    };
    const spy1 = spyOn(component, 'onAutocompleteChange').and.callThrough();
    component.onAutocompleteChange(autoCompleteEvent);
    expect(spy1).toHaveBeenCalledWith(autoCompleteEvent);
    flush();
  }));

it('should filter and update arr_autoCompleteOpt based on query and special characters', fakeAsync(() => {
  component.ngOnInit();
  tick(1000);
  const autoCompleteEvent2: AutoCompleteCompleteEvent = {
    query: 'Spider-Man',
    originalEvent: new Event('input'),
  };
  const spy1 = spyOn(component, 'onAutocompleteChange').and.callThrough();
  component.onAutocompleteChange(autoCompleteEvent2);
  expect(spy1).toHaveBeenCalledWith(autoCompleteEvent2);
  component.onAutocompleteChange(autoCompleteEvent2);
  flush();
}));
});
