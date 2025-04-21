import { TestBed } from '@angular/core/testing';
import { TaskService } from '../service/task.service';
import { Task } from '../models/todo.model';
import { TableItem, PaginationModel, TableModel } from 'carbon-components-angular';

describe('TaskService', () => {
  let service: TaskService;
  let mockTask: Task;
  let mockTableItem: TableItem;
  let mockTableData: TableItem[][];
  let mockPaginationModel: PaginationModel;
  let mockTableModel: TableModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);

    // Setup mock data
    mockTask = {
      id: 8,
      name: 'Test Task',
      status: 'pending',
      date: ['10/04/2025']
    };

    mockTableItem = new TableItem({ data: 'Test Task' });
    mockTableData = [
      [
        new TableItem({ data: 'Task 1' }),
        new TableItem({ data: 'processing' }),
        new TableItem({ data: '01/04/2025' })
      ],
      [
        new TableItem({ data: 'Task 2' }),
        new TableItem({ data: 'done' }),
        new TableItem({ data: '02/04/2025' })
      ],
      [
        new TableItem({ data: 'Task 3' }),
        new TableItem({ data: 'pending' }),
        new TableItem({ data: '03/04/2025' })
      ]
    ];

    mockPaginationModel = {
      pageLength: 2,
      currentPage: 1,
      totalDataLength: 3
    };

    mockTableModel = new TableModel();
    mockTableModel.data = [];
    mockTableModel.header = [];
    mockTableModel.rowsSelected = [false, false, false];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('CRUD Operations', () => {
    it('should get initial tasks', () => {
      const tasks = service.getTasks();
      expect(tasks.length).toBeGreaterThan(0);
      expect(tasks[0].name).toBe('Research About Table');
    });

    it('should add a new task', () => {
      const initialTasksCount = service.getTasks().length;
      service.addTask(mockTask);
      const updatedTasks = service.getTasks();
      
      expect(updatedTasks.length).toBe(initialTasksCount + 1);
      expect(updatedTasks[updatedTasks.length - 1].name).toBe('Test Task');
    });

    it('should generate a new ID when adding a task', () => {
      const initialTasks = service.getTasks();
      const maxId = Math.max(...initialTasks.map(t => t.id));
      
      const taskWithoutId = { ...mockTask, id: undefined as any };
      service.addTask(taskWithoutId);
      
      const updatedTasks = service.getTasks();
      const addedTask = updatedTasks[updatedTasks.length - 1];
      
      expect(addedTask.id).toBe(maxId + 1);
    });

    it('should throw error when adding null task', () => {
      expect(() => service.addTask(null as any)).toThrow('Failed to add task');
    });

    it('should update an existing task', () => {
      const initialTasks = service.getTasks();
      const taskToUpdate = { ...initialTasks[0], name: 'Updated Task Name' };
      
      service.updateTask(taskToUpdate);
      const updatedTasks = service.getTasks();
      
      expect(updatedTasks[0].name).toBe('Updated Task Name');
      expect(updatedTasks.length).toBe(initialTasks.length);
    });

    it('should throw error when updating with invalid task ID', () => {
      const invalidTask = { ...mockTask, id: 999 };
      expect(() => service.updateTask(invalidTask)).toThrow('Failed to update task');
    });

    it('should throw error when updating with null task', () => {
      expect(() => service.updateTask(null as any)).toThrow('Failed to update task');
    });
  });

  describe('Filter Operations', () => {
    it('should filter data by search string', () => {
      const filteredData = service.applyFilters(mockTableData, 'Task 1', null);
      expect(filteredData.length).toBe(1);
      expect(filteredData[0][0].data).toBe('Task 1');
    });

    it('should filter data by date', () => {
      const filteredData = service.applyFilters(mockTableData, '', '02/04/2025');
      expect(filteredData.length).toBe(1);
      expect(filteredData[0][0].data).toBe('Task 2');
    });

    it('should handle empty initial data', () => {
      const filteredData = service.applyFilters([], 'test', null);
      expect(filteredData.length).toBe(0);
    });

    it('should handle invalid date format', () => {
      const filteredData = service.applyFilters(mockTableData, '', 'invalid-date');
      expect(filteredData.length).toBe(mockTableData.length);
    });

    it('should apply both search and date filters', () => {
      // Add two rows that match both criteria
      mockTableData.push([
        new TableItem({ data: 'Task 1 Special' }),
        new TableItem({ data: 'pending' }),
        new TableItem({ data: '01/04/2025' })
      ]);
      mockTableData.push([
        new TableItem({ data: 'Task 1 Extra' }),
        new TableItem({ data: 'done' }),
        new TableItem({ data: '01/04/2025' })
      ]);
      
      const filteredData = service.applyFilters(mockTableData, 'Task 1', '01/04/2025');
      expect(filteredData.length).toBe(3);
      expect(filteredData[0][0].data).toBe('Task 1');
      expect(filteredData[1][0].data).toBe('Task 1 Special');
      expect(filteredData[2][0].data).toBe('Task 1 Extra');
    });

    it('should return original data on error', () => {
      // Force an error by passing invalid data
      const result = service.applyFilters(null as any, 'test', null);
      expect(result).toEqual([]);

    });
  });

  describe('Pagination Operations', () => {
    it('should update total pages', () => {
      service.updateTotalPages(mockTableData, mockPaginationModel);
      expect(mockPaginationModel.totalDataLength).toBe(mockTableData.length);
    });

    it('should handle null pagination model when updating total pages', () => {
      expect(() => service.updateTotalPages(mockTableData, null as any)).not.toThrow();
    });

    it('should update table data based on pagination', () => {
      service.updateTableData(mockTableData, mockPaginationModel, mockTableModel);
      expect(mockTableModel.data.length).toBe(2); // pageLength is 2
      expect(mockTableModel.data[0][0].data).toBe('Task 1');
      expect(mockTableModel.data[1][0].data).toBe('Task 2');
    });

    it('should update table data for second page', () => {
      mockPaginationModel.currentPage = 2;
      service.updateTableData(mockTableData, mockPaginationModel, mockTableModel);
      expect(mockTableModel.data.length).toBe(1); // Only one item on the second page
      expect(mockTableModel.data[0][0].data).toBe('Task 3');
    });

    it('should handle invalid parameters when updating table data', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      service.updateTableData(null as any, mockPaginationModel, mockTableModel);
      expect(consoleSpy).toHaveBeenCalled();
      expect(mockTableModel.data).toEqual([[]]);
      consoleSpy.mockRestore();

    });
    it('should navigate to last page', () => {
      const tasks: Task[] = [
        { id: 1, name: 'Task 1', status: 'pending', date: ['01/04/2025'] },
        { id: 2, name: 'Task 2', status: 'done', date: ['02/04/2025'] },
        { id: 3, name: 'Task 3', status: 'processing', date: ['03/04/2025'] }
      ];
      
      service.navigateToLastPage(tasks, 2, mockPaginationModel, mockTableModel, mockTableData);
      expect(mockPaginationModel.currentPage).toBe(2); // With pageLength 2, 3 items means 2 pages
    });

    it('should handle invalid parameters when navigating to last page', () => {
      mockPaginationModel.currentPage = 1;
      service.navigateToLastPage(null as any, 2, mockPaginationModel, mockTableModel, mockTableData);
      expect(mockPaginationModel.currentPage).toBe(1);
    });


    it('should select a specific page', () => {
      service.selectPage(2, mockPaginationModel, mockTableData, mockTableModel);
      expect(mockPaginationModel.currentPage).toBe(2);
    });

    it('should not select an invalid page number', () => {
      mockPaginationModel.currentPage = 1;
      service.selectPage(0, mockPaginationModel, mockTableData, mockTableModel);
      expect(mockPaginationModel.currentPage).toBe(1); // Should not change
    });

    it('should handle page length change', () => {
      service.onPageLengthChange(3, mockPaginationModel, mockTableData, mockTableModel);
      expect(mockPaginationModel.pageLength).toBe(3);
      expect(mockPaginationModel.currentPage).toBe(1); // Reset to first page
    });

    it('should not change page length to invalid value', () => {
      mockPaginationModel.pageLength = 2;
      service.onPageLengthChange(0, mockPaginationModel, mockTableData, mockTableModel);
      expect(mockPaginationModel.pageLength).toBe(2); // Should not change
    });
  });

  describe('Selection Operations', () => {
    it('should get selected rows data', () => {
      mockTableModel.data = mockTableData;
      mockTableModel.rowsSelected = [true, false, true];
      
      const selectedData = service.getSelectedRowsData(mockTableModel);
      expect(selectedData.length).toBe(2);
      expect(selectedData[0][0].data).toBe('Task 1');
      expect(selectedData[1][0].data).toBe('Task 3');
    });

    it('should handle no selections', () => {
      mockTableModel.data = mockTableData;
      mockTableModel.rowsSelected = [false, false, false];
      
      const selectedData = service.getSelectedRowsData(mockTableModel);
      expect(selectedData.length).toBe(0);
    });

    it('should handle invalid table model', () => {
      const selectedData = service.getSelectedRowsData(null as any);
      expect(selectedData).toEqual([]);
    });

    it('should handle rowsSelected indices out of bounds', () => {
      mockTableModel.data = [mockTableData[0]]; // Only one row
      mockTableModel.rowsSelected = [true, true]; // But two selections
      
      const selectedData = service.getSelectedRowsData(mockTableModel);
      expect(selectedData.length).toBe(1); // Should only get one valid row
    });
  });

  describe('Utility Methods', () => {
    it('should standardize date format', () => {
      // Use private method testing technique
      const result = (service as any).standardizeDate('1/4/2025');
      expect(result).toBe('01/04/2025');
    });

    it('should handle different date separators', () => {
      const result = (service as any).standardizeDate('1-4-2025');
      expect(result).toBe('01/04/2025');
    });

    it('should return null for invalid date format', () => {
      const result = (service as any).standardizeDate('invalid-date');
      expect(result).toBeNull();
    });

    it('should return null for date with wrong number of parts', () => {
      const result = (service as any).standardizeDate('01/2025');
      expect(result).toBeNull();
    });
  });
});