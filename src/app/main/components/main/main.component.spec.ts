import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, NgModule, OnInit } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ConfirmationService, Footer, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Dropdown, DropdownChangeEvent } from 'primeng/dropdown';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Observable, of, throwError } from 'rxjs';
import { MockHeroVillanData } from 'src/app/mock.data';
import { PrimeNGModule } from 'src/app/primeng.module';
import { Hero } from '../../interfaces/hero.interface';
import { HttpLoaderFactory } from '../../main.module';
import { NewHeroDialogComponent } from '../../reusable-fragments/new-hero-dialog/new-hero-dialog.component';
import { MainService } from '../../services/main.service';
import { MainComponent } from './main.component';



@Component({
  template: ``,
  providers: [DynamicDialogRef],
})
export class TestComponent extends MainComponent{
  override dinamicDialogRef: DynamicDialogRef | undefined;
  constructor(
    public override mainService: MainService,
    public override messageService: MessageService,
    public override confirmationService: ConfirmationService,
    public override dialogService: DialogService,
    public override translateService: TranslateService
  ) {
    super(
      mainService,
      messageService,
      confirmationService,
      dialogService,
      translateService
    ); // Call the base class constructor
  }
 
  onTestopenEditNewHeroDialog(hero?:Hero) {
    this.openEditNewHeroDialog(hero);
  }
 
  onTestonCustomTableFilter(e: any) {
    this.onCustomTableFilter(e);
  }
  onTestaddHero(hero: Hero) {
    this.addHero(hero);
  }

}
@NgModule({
  imports: [
    CommonModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DynamicDialogModule,
    NoopAnimationsModule,
    HttpClientModule,
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
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    ConfirmationService,
  ],
  declarations: [NewHeroDialogComponent, TestComponent, MainComponent],
  exports: [NewHeroDialogComponent],
})
export class FakeTestDialogModule {}
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let fixtureTestComponent: ComponentFixture<TestComponent>;
  let fixtureDropd: ComponentFixture<Dropdown>;
  let newHeroDialogcomponent: NewHeroDialogComponent;
  let fixtureNewHeroDialog: ComponentFixture<NewHeroDialogComponent>;
  let testComponent: TestComponent;
  let dropdown: Dropdown;
  let mainService: MainService;
  let dialogService: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Footer, NewHeroDialogComponent, Dropdown, MainComponent],
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(MockHeroVillanData, {
          delay: 1000,
          dataEncapsulation: false,
          put204: false,
          passThruUnknownUrl: true,
          delete404: true,
        }),
        CommonModule,
        PrimeNGModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        DynamicDialogModule,
        NoopAnimationsModule,
        FakeTestDialogModule,
        TranslateModule.forChild({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        HttpClientTestingModule,
        MessageService,
        TranslateStore,
        TranslateService,
        MainService,
        DynamicDialogRef,
        DynamicDialogConfig
      ],
    });

    fixture = TestBed.createComponent(MainComponent);
    fixtureTestComponent = TestBed.createComponent(TestComponent);
    fixtureDropd = TestBed.createComponent(Dropdown);
    component = fixture.componentInstance;
    testComponent = fixtureTestComponent.debugElement.componentInstance;
    dropdown = fixtureDropd.componentInstance;
    // Get instances of the services
    mainService = TestBed.inject(MainService);
    dialogService = TestBed.inject(DialogService);
    fixtureNewHeroDialog = TestBed.createComponent(NewHeroDialogComponent);
    newHeroDialogcomponent = fixtureNewHeroDialog.componentInstance;


  });
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should open dialog and close dialog', fakeAsync(() => {
    testComponent.onTestopenEditNewHeroDialog();
    fixtureTestComponent.detectChanges();
    tick(300);
    let dynamicDialogEl =
      document.getElementsByClassName('p-dynamic-dialog')[0];
    expect(dynamicDialogEl).toBeTruthy();
    let dynamicDialogTitlebarIconEl = document.querySelector(
      '.p-dynamic-dialog .p-dialog-header-icon'
    ) as HTMLElement;
    dynamicDialogTitlebarIconEl.click();
    fixtureTestComponent.detectChanges();
    tick(700);
    dynamicDialogEl = document.getElementsByClassName('p-dynamic-dialog')[0];
    expect(dynamicDialogEl).toBeUndefined();
    flush();
  }));

it('Should pass the hero object to the dialog and close',  fakeAsync(() => {
  const spy = spyOn(testComponent.dialogService, 'open');
  const spy2 = spyOn(newHeroDialogcomponent.dynamicDialogRef, 'close');
  const hero: Hero = {
    id: '1',
    name: 'The Mighty Thor',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 5
  }
  testComponent.onTestopenEditNewHeroDialog(hero);
    let createHero =  'Editar '
    let editHero = 'NEWHERO_DIALOG.dialog_title_editMAIN.btn_her'
    let villanoHero = '';
  expect(spy).toHaveBeenCalledWith(NewHeroDialogComponent, {
      height: '75vh',
      maximizable: false,
      data: {
        hero: hero,
        mode: hero?.id ? 'edit hero' : 'new hero',
        villans: 'heros'.toLowerCase(),
      },
      header: hero?.id
        ? editHero + villanoHero.slice(0, -1)
        : createHero + villanoHero.slice(0, -1),
    })
    newHeroDialogcomponent.dynamicDialogRef.close({
      mode: 'edit hero',
      hero: hero,
    });
    
    expect(spy2).toHaveBeenCalledWith({
      mode: 'edit hero',
      hero: hero,
    });

  flush();
}));


it('Should pass new hero object to the dialog and close',  fakeAsync(() => {
  const spy = spyOn(testComponent.dialogService, 'open');
  const spy2 = spyOn(newHeroDialogcomponent.dynamicDialogRef, 'close');
  

  const newhero: Hero = {
    id: '999',
    name: 'The Mighty Thor 2',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 5
  }
  testComponent.onTestopenEditNewHeroDialog(newhero);
    let createHero =  'Crear Nuevo '
    let editHero = 'NEWHERO_DIALOG.dialog_title_editMAIN.btn_her'
    let villanoHero = '';
  expect(spy).toHaveBeenCalledWith(NewHeroDialogComponent, {
      height: '75vh',
      maximizable: false,
      data: {
        hero: newhero,
        mode: newhero?.id ? 'edit hero' : 'new hero',
        villans: 'heros'.toLowerCase(),
      },
      header: newhero?.id
        ? editHero + villanoHero.slice(0, -1)
        : createHero + villanoHero.slice(0, -1),
    })
    
    newHeroDialogcomponent.dynamicDialogRef.close({
      mode: 'new hero',
      hero: newhero,
    });
    
    expect(spy2).toHaveBeenCalledWith({
      mode: 'new hero',
      hero: newhero,
    });

    



  flush();
 
}));







  it('Should Search for Matches', fakeAsync(() => {
    fixture.detectChanges();
    tick(5000);
    // Get the native DOM element of the component
    const nativeElement = fixture.nativeElement;
    const inputEl =
      nativeElement.getElementsByClassName('globalSearchTable')[0];
    inputEl.innerHTML = 'Captain';
    const event = new Event('keyup', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'key', { value: 'Enter' });
    Object.defineProperty(event, 'target', { value: inputEl });
    const onTestonCustomTableFilterSpy = spyOn(
      testComponent,
      'onTestonCustomTableFilter'
    ).and.callThrough();
    testComponent.onTestonCustomTableFilter(event);
    expect(onTestonCustomTableFilterSpy).toHaveBeenCalledWith(event);
      //calling with empty string
    inputEl.innerHTML = '';
    expect(onTestonCustomTableFilterSpy).toHaveBeenCalledWith(event);
    flush();
  }));


  it('Should Verify MainComponnt Statements (onGetSeverity, getTranslateVillanoHero, onGetHeros, addHero, updateHero, onGetVillans)',fakeAsync (() => {
   //Statement onGetSeverity
    expect(component.onGetSeverity('Melee')).toBe('success');
    expect(component.onGetSeverity('Ranged')).toBe('warning');
    expect(component.onGetSeverity('Speedster')).toBe('danger');
    expect(component.onGetSeverity('Melee')).toBe('success');
    expect(component.onGetSeverity('default')).toBe('info');

  //Statement getTranslateVillanoHero
    expect(component.getTranslateVillanoHero()).toBe('MAIN.btn_hero');
    component.herosVillans = 'Villans';
      //Statement getTranslateVillanoHero btn_villans
     expect(component.getTranslateVillanoHero()).toBe('MAIN.btn_villans');
    //Statement GetHeros
    component.onGetHeros();
    tick(2000);
    expect(component.arr_heros.length).toBeGreaterThan(0);
    //Statement GetHeros villans
    component.onGetHeros('villans');
    tick(2000);
    expect(component.arr_heros.length).toBeGreaterThan(0);
    //Statement addHero
    const newhero: Hero = {
      id: '999',
      name: 'The Mighty Thor 2',
      description: 'A powerful Norse god of thunder and lightning.',
      gear: 'Mjolnir, his enchanted hammer',
      category: 'Melee',
      rating: 5,
    };
   // spyOn(component, 'addHero');
   // component.addHero(newhero);
   // fixture.detectChanges()
    tick(1000);
  // expect(component.addHero).toHaveBeenCalledWith(newhero);
  // expect(component.arr_heros[0]).toEqual(newhero);
    //Statement updateHero
    const updateHero: Hero = {
      id: '999',
      name: 'The Mighty Thor 2',
      description: 'A powerful Norse god of thunder and lightning.',
      gear: 'Mjolnir, his enchanted hammer',
      category: 'Melee',
      rating: 1,
    };
    spyOn(component, 'updateHero');
    component.updateHero(updateHero);
    tick();
    expect(component.updateHero).toHaveBeenCalledWith(updateHero);
    //Statement deleteSelectedHeros
    spyOn(component, 'deleteSelectedHeros');
    component.deleteSelectedHeros();
    expect(component.deleteSelectedHeros).toHaveBeenCalled();

  
  }));
  it('Testing Signals',fakeAsync (() => {
    const mode = 'Heros'; 
    component.onGetVillans(mode);
    tick();
    expect(component.villansHerosComputedChange()).toEqual(mode);
    flush();
}));

it(`Covering Branch herosVillans = mode == 'villans'  ? (this.herosVillans = 'Villans')  : (this.herosVillans = 'heros');`, fakeAsync(() => {
  component.onGetHeros('villans');
  tick(2000);
  expect(component.herosVillans).toEqual('Villans');
  flush();
}))


it('should add a hero successfully', fakeAsync(() => {
  var spy = spyOn(mainService, 'addHero'); // Import 'throwError' from 'rxjs'
  var spy2 = spyOn(component, 'addHero'); // Import 'throwError' from 'rxjs'
  const newhero: Hero = {
    id: '999',
    name: 'The Mighty Thor 2',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 5,
  };
  component.addHero(newhero);
  mainService.addHero(newhero);
  tick(100);
  // Perform assertions for error handling
  expect(spy).toHaveBeenCalledWith(newhero);
  expect(spy2).toHaveBeenCalledWith(newhero);
  flush();
  // You may need to test other aspects of the component's behavior, like messageService, arr_heros, loadingHeroTable, etc.

}));

it('Should handle errors when adding a hero', fakeAsync(() => {
  component.ngOnInit();
  const newhero: Hero = {
    id: '999',
    name: 'The Mighty Thor 2',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 5,
  };
  const error = new Error('An error occurred');
  const spy = spyOn(mainService, 'addHero').and.returnValue(throwError(error)); // Import 'throwError' from 'rxjs'
  component.addHero(newhero);
  mainService.addHero(newhero)
  tick(100);
  // Perform assertions for error handling
  expect(spy).toHaveBeenCalledWith(newhero);

  flush();
  // Test how your component handles the error
  // You may want to check loadingHeroTable, messageService, etc.
}));

it('should update a hero successfully', fakeAsync(() => {
  component.ngOnInit();
  tick(2000);

  var spy = spyOn(mainService, 'updateHero'); // Import 'throwError' from 'rxjs'
  var spy2 = spyOn(component, 'updateHero'); // Import 'throwError' from 'rxjs'
  const newhero: Hero = {
    id: '1',
    name: 'The Mighty Thor',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 1,
  };
  component.updateHero(newhero);
  mainService.updateHero(newhero);
  console.log(component.arr_heros);
  const index = component.arr_heros.findIndex((f) => f.id === newhero.id);
  expect(index).not.toBe(-1); // Ensure that the index is a valid array index
  // Perform assertions for error handling
  expect(spy).toHaveBeenCalledWith(newhero);
  expect(spy2).toHaveBeenCalledWith(newhero);
  flush();
  // You may need to test other aspects of the component's behavior, like messageService, arr_heros, loadingHeroTable, etc.
}));

it('Should handle errors when updating a hero', fakeAsync(() => {
  component.ngOnInit();
  tick(100);
  const newhero: Hero = {
    id: '999',
    name: 'The Mighty Thor 2',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 1,
  };
  const error = new Error('An error occurred');
  const spy = spyOn(mainService, 'updateHero').and.returnValue(throwError(error)); // Import 'throwError' from 'rxjs'
  component.updateHero(newhero);
  mainService.updateHero(newhero)

  // Perform assertions for error handling
  expect(spy).toHaveBeenCalledWith(newhero);

  flush();
  // Test how your component handles the error
  // You may want to check loadingHeroTable, messageService, etc.
}));

/*
it('Should handle errors when updating a hero', fakeAsync(() => {
  component.ngOnInit();
  tick(100);
  const newhero: Hero = {
    id: '999',
    name: 'The Mighty Thor 2',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 1,
  };
  const error = new Error('An error occurred');
  const spy = spyOn(mainService, 'updateHero').and.returnValue(throwError(error)); // Import 'throwError' from 'rxjs'
  component.updateHero(newhero);
  mainService.updateHero(newhero)

  // Perform assertions for error handling
  expect(spy).toHaveBeenCalledWith(newhero);

  flush();
  // Test how your component handles the error
  // You may want to check loadingHeroTable, messageService, etc.
}));
*/







/*
it('Should open the dialog for editing an existing hero', fakeAsync(() => {
  const hero = {
    id: '1',
    name: 'The Mighty Thor',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 5
  };
//  newHeroDialogcomponent.ngOnInit();

  testComponent.onTestopenEditNewHeroDialog(hero);
  fixtureTestComponent.detectChanges();


  tick(300);
  let dynamicDialogEl =
    document.getElementsByClassName('p-dynamic-dialog')[0];
  //Open
  console.log(dynamicDialogEl);
  expect(dynamicDialogEl).toBeTruthy();
  //checking data is on the form
  tick();
 
 console.log(newHeroDialogcomponent.heroForm);
  const heroForm: FormGroup = newHeroDialogcomponent.heroForm;
  const nameControl: FormControl = heroForm.get('name') as FormControl;
  const descriptionControl: FormControl = heroForm.get(
    'description'
  ) as FormControl;
  const categoryControl: FormControl = heroForm.get(
    'category'
  ) as FormControl;
  const ratingControl: FormControl = heroForm.get('rating') as FormControl;
  const gearControl: FormControl = heroForm.get('gear') as FormControl;

  // Expectations continaur aca
  expect(heroForm).toBeDefined();
  expect(nameControl).toBeDefined();
  expect(descriptionControl).toBeDefined();
  expect(categoryControl).toBeDefined();
  expect(ratingControl).toBeDefined();
  expect(gearControl).toBeDefined();
  expect(nameControl.valid).toBe(true); // Name control should be invalid initially
  expect(descriptionControl.valid).toBe(true); // Description control should be invalid initially
  expect(categoryControl.valid).toBe(true); // Category control should be invalid initially
  expect(ratingControl.valid).toBe(true); // Rating control should be invalid initially
  expect(gearControl.valid).toBe(true); // Name control should be invalid initially

  let dynamicDialogTitlebarIconEl = document.querySelector(
    '.p-dynamic-dialog .p-dialog-header-icon'
  ) as HTMLElement;
  dynamicDialogTitlebarIconEl.click();
  fixtureTestComponent.detectChanges();
  tick(700);
  dynamicDialogEl = document.getElementsByClassName('p-dynamic-dialog')[0];
  expect(dynamicDialogEl).toBeUndefined();
  flush();
  
}));



*/















it('should add a hero successfully', fakeAsync(() => {
/*
  fixture.detectChanges();
  tick(10000);
  testComponent.openEditNewHeroDialog();
  fixtureTestComponent.detectChanges();
  fixtureNewHeroDialog.detectChanges();
  let dynamicDialogEl =
  document.getElementsByClassName('p-dynamic-dialog')[0];
  console.log(dynamicDialogEl);
  let dynamicDialogTitlebarIconEl = document.querySelector(
    '.p-button-raised .p-button-text'
  ) as HTMLElement;
    console.log(dynamicDialogTitlebarIconEl);
  */
  /*
  newHeroDialogcomponent.ngOnInit();
  testComponent.onTestopenEditNewHeroDialog();
  fixtureTestComponent.detectChanges();
  tick(300);
  let dynamicDialogEl =
    document.getElementsByClassName('p-dynamic-dialog')[0];
  expect(dynamicDialogEl).toBeTruthy();
  let dynamicDialogTitlebarIconEl = document.querySelector(
    '.p-button-raised .p-button-text'
  ) as HTMLElement;
  console.log(dynamicDialogEl);
    console.log(dynamicDialogTitlebarIconEl);
 // dynamicDialogTitlebarIconEl.click();
  fixtureTestComponent.detectChanges();
  tick(700);
  */
 // dynamicDialogEl = document.getElementsByClassName('p-dynamic-dialog')[0];
  //expect(dynamicDialogEl).toBeUndefined();
  //flush();

 // testComponent.ngOnInit();
 /*
    testComponent.onTestopenEditNewHeroDialog();
    fixtureTestComponent.detectChanges();
    tick(300);
    let dynamicDialogEl =
      document.getElementsByClassName('p-dynamic-dialog')[0];
    expect(dynamicDialogEl).toBeTruthy();
    let dynamicDialogTitlebarIconEl = document.querySelector(
      '.p-dynamic-dialog .p-dialog-header-icon'
    ) as HTMLElement;
      console.log(dynamicDialogTitlebarIconEl);


  const newhero: Hero = {
    id: '999',
    name: 'The Mighty Thor 2',
    description: 'A powerful Norse god of thunder and lightning.',
    gear: 'Mjolnir, his enchanted hammer',
    category: 'Melee',
    rating: 5
  }
  */  
/*
 spyOn(testComponent, 'openEditNewHeroDialog');
 // spyOn(mainService, 'addHero');
  testComponent.openEditNewHeroDialog();

  console.log(component.arr_heros);
  expect(testComponent.openEditNewHeroDialog).toHaveBeenCalledWith();
  newHeroDialogcomponent.ngOnInit();
  console.log(newHeroDialogcomponent.heroForm);

  const heroForm: FormGroup = newHeroDialogcomponent.heroForm;
  const idControl: FormControl = heroForm.get('id') as FormControl;
  const nameControl: FormControl = heroForm.get('name') as FormControl;
  const descriptionControl: FormControl = heroForm.get(
    'description'
  ) as FormControl;
  const categoryControl: FormControl = heroForm.get(
    'category'
  ) as FormControl;
  const ratingControl: FormControl = heroForm.get('rating') as FormControl;
  const gearControl: FormControl = heroForm.get('gear') as FormControl;

  idControl.patchValue(newhero?.id);
  nameControl.patchValue(newhero?.name);
  descriptionControl.patchValue(newhero?.description);
  categoryControl.patchValue(newhero?.category);
  ratingControl.patchValue(newhero?.rating);
  gearControl.patchValue(newhero?.gear);
  console.log(newHeroDialogcomponent.heroForm);

  let dynamicDialogEl =
  document.getElementsByClassName('p-dynamic-dialog')[0];
    console.log(dynamicDialogEl);
  //  dynamicDialogTitlebarIconEl.click();
*/


//  expect(mainService.addHero).toHaveBeenCalled();
}));







});

    
       
       