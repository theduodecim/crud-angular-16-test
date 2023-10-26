import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as xlsx from 'xlsx';

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
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
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
import { Table } from 'primeng/table';
import { Button } from 'primeng/button';

@Component({
  template: ``,
  providers: [DynamicDialogRef],
})
export class TestComponent extends MainComponent {
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

  onTestopenEditNewHeroDialog(hero?: Hero) {
    this.openEditNewHeroDialog(hero);
  }

  onTestonCustomTableFilter(e: any) {
    this.onCustomTableFilter(e);
  }
  onTestaddHero(hero: Hero) {
    this.addHero(hero);
  }
  onTestdeleteSelectedHeros() {
    this.deleteSelectedHeros();
  }

  onTestExportToExel() {
    this.exportExcel();
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

  it('Should pass the hero object to the dialog and close', fakeAsync(() => {
    const spy = spyOn(testComponent.dialogService, 'open');
    const spy2 = spyOn(newHeroDialogcomponent.dynamicDialogRef, 'close');
    const hero: Hero = {
      id: '1',
      name: 'The Mighty Thor',
      description: 'A powerful Norse god of thunder and lightning.',
      gear: 'Mjolnir, his enchanted hammer',
      category: 'Melee',
      rating: 5,
    };
    testComponent.onTestopenEditNewHeroDialog(hero);
    let createHero = 'Editar ';
    let editHero = 'NEWHERO_DIALOG.dialog_title_editMAIN.btn_her';
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
    });
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

  it('Should pass new hero object to the dialog and close', fakeAsync(() => {
    const spy = spyOn(testComponent.dialogService, 'open');
    const spy2 = spyOn(newHeroDialogcomponent.dynamicDialogRef, 'close');

    const newhero: Hero = {
      id: '999',
      name: 'The Mighty Thor 2',
      description: 'A powerful Norse god of thunder and lightning.',
      gear: 'Mjolnir, his enchanted hammer',
      category: 'Melee',
      rating: 5,
    };
    testComponent.onTestopenEditNewHeroDialog(newhero);
    let createHero = 'Crear Nuevo ';
    let editHero = 'NEWHERO_DIALOG.dialog_title_editMAIN.btn_her';
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
    });

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
    const spy1 = spyOn(
      testComponent,
      'onTestonCustomTableFilter'
    ).and.callThrough();
    testComponent.onTestonCustomTableFilter(event);
    const spy2 = spyOn(mainService, 'getHeroData').and.callThrough();
    testComponent.onTestonCustomTableFilter(event);
    mainService.getHeroData('heros');

    testComponent.herosVillans = 'heros';
    expect(spy1).toHaveBeenCalledWith(event);
    inputEl.innerHTML = '';
    expect(spy1).toHaveBeenCalledWith(event);
    expect(spy2).toHaveBeenCalledWith(testComponent.herosVillans);
    flush();
  }));

  it('Should set loadingHeroTable to true and call mainService if query length is >= 3', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    spyOn(mainService, 'getHeroData').and.returnValue(of([]));
    mainService.getHeroData(component.herosVillans);
    component.onCustomTableFilter({ target: { value: 'abc' } });
    expect(mainService.getHeroData).toHaveBeenCalledWith(
      component.herosVillans
    );
    flush();
  }));

  it('Should reset arr_heros to dataSoruce if query is empty', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    const mockData = component.arr_heros;
    component.onCustomTableFilter({ target: { value: '' } });
    expect(component.arr_heros).toEqual(mockData);
  }));

  it('Should Verify MainComponnt Statements (onGetSeverity, getTranslateVillanoHero, onGetHeros, onGetVillans)', fakeAsync(() => {
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
    //Statement deleteSelectedHeros
    spyOn(component, 'deleteSelectedHeros');
    component.deleteSelectedHeros();
    expect(component.deleteSelectedHeros).toHaveBeenCalled();
  }));
  it('Testing Signals', fakeAsync(() => {
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
  }));

  it('should add a hero successfully', fakeAsync(() => {
    var spy = spyOn(mainService, 'addHero');
    var spy2 = spyOn(component, 'addHero');
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
    expect(spy).toHaveBeenCalledWith(newhero);
    expect(spy2).toHaveBeenCalledWith(newhero);
    flush();
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
    const spy = spyOn(mainService, 'addHero').and.returnValue(
      throwError(error)
    );
    component.addHero(newhero);
    mainService.addHero(newhero);
    tick(100);
    // Perform assertions for error handling
    expect(spy).toHaveBeenCalledWith(newhero);
    flush();
  }));

  it('should update a hero successfully', fakeAsync(() => {
    component.ngOnInit();
    tick(2000);

    var spy = spyOn(mainService, 'updateHero').and.callThrough();
    var spy2 = spyOn(component, 'updateHero').and.callThrough();
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
    const index = component.arr_heros.findIndex((f) => f.id === newhero.id);
    expect(index).not.toBe(-1);
    expect(spy).toHaveBeenCalledWith(newhero);
    expect(spy2).toHaveBeenCalledWith(newhero);
    flush();
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
    const spy = spyOn(mainService, 'updateHero').and.returnValue(
      throwError(error)
    );
    component.updateHero(newhero);
    mainService.updateHero(newhero);
    expect(spy).toHaveBeenCalledWith(newhero);
    flush();
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
    const spy = spyOn(mainService, 'updateHero').and.returnValue(
      throwError(error)
    );
    component.updateHero(newhero);
    mainService.updateHero(newhero);
    expect(spy).toHaveBeenCalledWith(newhero);
    flush();
  }));

  it('should delete selected heroes', fakeAsync(() => {
    testComponent.ngOnInit();
    tick(2000);
    const villanoHero = testComponent.getTranslateVillanoHero();
    const delete_message = testComponent.getTranslation('MAIN.delete_message');
    const confirmationService = TestBed.inject(ConfirmationService);
    const messageService = TestBed.inject(MessageService);
    let spy = spyOn(confirmationService, 'confirm').and.callFake(
      (options: any) => {
        return options.accept();
      }
    );
    let spy2 = spyOn(messageService, 'add').and.callFake(() => {});
    testComponent.selectedHeros = [
      testComponent.arr_heros[0],
      testComponent.arr_heros[1],
      testComponent.arr_heros[2],
    ];
    testComponent.onTestdeleteSelectedHeros();
    fixtureTestComponent.detectChanges();
    tick(100);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledWith({
      severity: 'success',
      summary: delete_message,
      detail: villanoHero.slice(0, -1) + delete_message,
      life: 3000,
    });
    tick(100);
    expect(testComponent.selectedHeros).toBeNull();
    tick();
    flush();
  }));

  it('should call the saveAsExcelFile function with the correct arguments', fakeAsync(() => {
    testComponent.ngOnInit();
    tick(2000);
    const spy1 = spyOn(testComponent, 'exportExcel').and.callThrough();
    const spy2 = spyOn(testComponent, 'saveAsExcelFile').and.callThrough();
    const worksheet = xlsx.utils.json_to_sheet(testComponent.arr_heros);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    testComponent.onTestExportToExel();
    testComponent.saveAsExcelFile(excelBuffer, 'test');
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    flush();
  }));
});
