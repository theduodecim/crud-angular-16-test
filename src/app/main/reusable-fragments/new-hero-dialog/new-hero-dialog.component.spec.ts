import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeroDialogComponent } from './new-hero-dialog.component';

describe('MainComponent', () => {
  let component: NewHeroDialogComponent;
  let fixture: ComponentFixture<NewHeroDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewHeroDialogComponent]
    });
    fixture = TestBed.createComponent(NewHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
