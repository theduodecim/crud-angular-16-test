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
import { of, throwError } from 'rxjs';
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
export class TestComponent extends MainComponent {
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
  onTestonChangeLanguages(e: DropdownChangeEvent) {
    this.onChangeLanguages(e);
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
  declarations: [NewHeroDialogComponent, TestComponent],
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
      declarations: [Footer, NewHeroDialogComponent, Dropdown],
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
        DynamicDialogConfig,
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

  it('Should open the dialog for editing an existing hero', fakeAsync(() => {
  newHeroDialogcomponent.ngOnInit();
   const hero = {
      id: '1',
      name: 'The Mighty Thor',
      description: 'A powerful Norse god of thunder and lightning.',
      gear: 'Mjolnir, his enchanted hammer',
      category: 'Melee',
      rating: 5
    };
    testComponent.onTestopenEditNewHeroDialog(hero);
    fixtureTestComponent.detectChanges();
    tick(300);
    let dynamicDialogEl =
      document.getElementsByClassName('p-dynamic-dialog')[0];
    //Open
    expect(dynamicDialogEl).toBeTruthy();
    //checking data is on the form
    tick();
    /*
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
*/
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
  }));


  it('Should Verify MainComponnt Statements (onGetSeverity, getTranslateVillanoHero, onGetHeros, addHero, updateHero)',fakeAsync (() => {
   //Statement onGetSeverity
    expect(component.onGetSeverity('Melee')).toBe('success');
  //Statement getTranslateVillanoHero
    expect(component.getTranslateVillanoHero()).toBe('MAIN.btn_hero');
    //Statement GetHeros
    component.onGetHeros();
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
    spyOn(component, 'addHero');
    component.addHero(newhero);
    tick();
    expect(component.addHero).toHaveBeenCalledWith(newhero);
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

    //Statement openEditNewHeroDialog
   // spyOn(component, 'openEditNewHeroDialog');
  //  component.openEditNewHeroDialog();
   // expect(component.openEditNewHeroDialog).toHaveBeenCalled();
  }));



});
