import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFluidComponent } from './header-fluid.component';

describe('HeaderFluidComponent', () => {
  let component: HeaderFluidComponent;
  let fixture: ComponentFixture<HeaderFluidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFluidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFluidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
