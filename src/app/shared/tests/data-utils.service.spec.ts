import { TestBed } from '@angular/core/testing';
import { DateUtilsService } from '../service/date-utils.service';

describe('DateUtilsService', () => {
  let service: DateUtilsService;
  let sampleDates: Date[];

  beforeAll(() => {
    sampleDates = [
      new Date(2025, 3, 17),
      new Date(2025, 0, 1),
      new Date(2025, 11, 31),
      new Date(2024, 1, 29),
    ];
    console.log('beforeAll: Initialized sample dates for testing');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateUtilsService],
    });
    service = TestBed.inject(DateUtilsService);
  });

  afterAll(() => {
    sampleDates = [];
    console.log('afterAll: Cleaned up sample dates');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format date correctly for a standard date', () => {
    const result = service.formatDate(sampleDates[0]);
    expect(result).toBe('17/04/2025');
  });

  it('should pad single-digit day and month with leading zero', () => {
    const result = service.formatDate(sampleDates[1]);
    expect(result).toBe('01/01/2025');
  });

  it('should handle end of month correctly', () => {
    const result = service.formatDate(sampleDates[2]);
    expect(result).toBe('31/12/2025');
  });

  it('should format date correctly for a leap year', () => {
    const result = service.formatDate(sampleDates[3]);
    expect(result).toBe('29/02/2024');
  });

  it('should throw  error for invalid date input',()=>{
    expect(() => service.formatDate(null as any)).toThrow();
    expect(()=> service.formatDate(undefined as any)).toThrow();
  })
});
