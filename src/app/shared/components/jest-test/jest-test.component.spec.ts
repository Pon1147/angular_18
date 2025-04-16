import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JestTestComponent } from './jest-test.component';

describe('JestTestComponent', () => {
  let component: JestTestComponent;
  let fixture: ComponentFixture<JestTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JestTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JestTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
