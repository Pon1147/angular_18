import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JestTestComponent } from './jest-test.component';
import { SharedModule } from '../../shared.module';
import { IconService } from 'carbon-components-angular';

describe('JestTestComponent', () => {
  let component: JestTestComponent;
  let fixture: ComponentFixture<JestTestComponent>;

  // Setup toàn cục
  beforeAll(() => {
    console.log('Starting JestTestComponent test suite');
  });

  // Setup cho mỗi test
  beforeEach(async () => {
    const iconServiceMock = {
      registerAll: jest.fn(),
      register: jest.fn(),
      get: jest.fn().mockReturnValue({}),
      registerAs: jest.fn(), // Thêm phương thức registerAs để chắc chắn
      unregister: jest.fn(),
      getRegisteredIcons: jest.fn().mockReturnValue([])
    };

    await TestBed.configureTestingModule({
      imports: [JestTestComponent, SharedModule],
      providers: [
        { provide: IconService, useValue: iconServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JestTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Teardown cho mỗi test
  afterEach(() => {
    fixture.destroy();
    component.disabled = false;
    jest.clearAllMocks();
  });

  // Teardown toàn cục
  afterAll(() => {
    console.log('Finished JestTestComponent test suite');
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Component Properties', () => {
    it('should have type set to "submit"', () => {
      expect(component.type).toBe('submit');
    });

    it('should have disabled set to false', () => {
      expect(component.disabled).toBe(false);
    });
  });

  describe('DOM Rendering', () => {
    it('should render a button with type "submit"', () => {
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.getAttribute('type')).toBe('submit');
    });

    it('should render a button that is not disabled', () => {
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement.disabled).toBe(false);
    });

    it('should render a button with text "Click me"', () => {
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement.textContent).toContain('Click me');
    });
  });

  describe('Button Interaction', () => {
    it('should call onClick when button is clicked', () => {
      const onClickSpy = jest.spyOn(component, 'onClick');
      const buttonElement = fixture.nativeElement.querySelector('button');
      buttonElement.click();
      expect(onClickSpy).toHaveBeenCalled();
      onClickSpy.mockRestore();
    });
  });
});