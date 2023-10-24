import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Directive } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive'; // Replace with the correct path

@Component({
  template: `<div uppercase>lowercase text</div>`,
})
class TestComponent {}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, UppercaseDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
  });

  it('Should transform text to uppercase', () => {
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector('div');
    expect(div.textContent).toBe('LOWERCASE TEXT');
  });
});
