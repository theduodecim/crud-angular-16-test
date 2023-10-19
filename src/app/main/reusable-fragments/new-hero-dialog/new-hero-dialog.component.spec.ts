import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
      declarations: [
        MainComponent,
        NewHeroDialogComponent
      ],
      imports: [
        CommonModule,
        PrimeNGModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ], providers: [
        MessageService,
        TranslateStore,
        TranslateService,
        MainService,
        DynamicDialogRef,
        DynamicDialogConfig
      ]
    });
    fixture = TestBed.createComponent(NewHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
