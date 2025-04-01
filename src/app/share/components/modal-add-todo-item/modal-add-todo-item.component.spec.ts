import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTodoItemComponent } from './modal-add-todo-item.component';

describe('ModalAddTodoItemComponent', () => {
  let component: ModalAddTodoItemComponent;
  let fixture: ComponentFixture<ModalAddTodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddTodoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
