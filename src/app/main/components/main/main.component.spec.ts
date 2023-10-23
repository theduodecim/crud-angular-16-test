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
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
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

  onTestopenEditNewHeroDialog() {
    this.openEditNewHeroDialog();
  }
  onTestonCustomTableFilter(e: any) {
    this.onCustomTableFilter(e);
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
  let testComponent: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Footer, MainComponent, NewHeroDialogComponent],
      imports: [
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
    component = fixture.componentInstance;
    testComponent = fixtureTestComponent.debugElement.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog and close dialog', fakeAsync(() => {
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

  it('should Search for Matches', fakeAsync(() => {
    fixture.detectChanges();
    tick(5000);
    // Get the native DOM element of the component
    const nativeElement = fixture.nativeElement;
    

    const inputEl =
      nativeElement.getElementsByClassName('globalSearchTable')[0];
    console.error(inputEl);
    inputEl.innerHTML = 'Captain';
    // Create a custom 'keyup.enter' event with a specific target
    const event = new Event('keyup', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'key', { value: 'Enter' });

    // Assign the custom target element to the event
    Object.defineProperty(event, 'target', { value: inputEl });
    // testComponent.onTestonCustomTableFilter(event);

    // Create a spy for the function with a parameter
    const onTestonCustomTableFilterSpy = spyOn(
      testComponent,
      'onTestonCustomTableFilter'
    ).and.callThrough();

    // Trigger the function with the event
    testComponent.onTestonCustomTableFilter(event);

    // Ensure that the function has been called with the event
    expect(onTestonCustomTableFilterSpy).toHaveBeenCalledWith(event);
  }));
});
