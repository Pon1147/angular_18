import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableItem, PaginationModel, TableModel } from 'carbon-components-angular';
import { Task } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    const initialTasks: Task[] = [
      { id: 1, name: 'Research About Table', status: 'processing', date: ['28/03/2025'] },
      { id: 2, name: 'Add Button addNewData to table', status: 'done', date: ['31/03/2025'] },
      { id: 3, name: 'Complete Angular Assignment', status: 'pending', date: ['02/04/2025'] },
      { id: 4, name: 'Meet with Team', status: 'processing', date: ['03/04/2025'] },
      { id: 5, name: 'Write Report', status: 'done', date: ['04/04/2025'] },
      { id: 6, name: 'Plan Project Timeline', status: 'pending', date: ['05/04/2025'] },
      { id: 7, name: 'Review Code', status: 'processing', date: ['06/04/2025'] },
    ];
    this.tasksSubject.next(initialTasks);
  }

  private standardizeDate(dateStr: string): string | null {
    try {
      const parts = dateStr.replace(/[-\/]/g, '/').split('/');
      if (parts.length !== 3) return null;

      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2];
      const date = new Date(`${year}-${month}-${day}`);
      if (isNaN(date.getTime())) return null;

      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error standardizing date:', dateStr, error);
      return null;
    }
  }

  // CRUD Operations
  addTask(task: Task): void {
    try {
      if (!task) throw new Error('Task cannot be null or undefined');
      const currentTasks = this.tasksSubject.value;
      const newId = currentTasks.length ? Math.max(...currentTasks.map(t => t.id)) + 1 : 1;
      const newTask = { ...task, id: newId };
      this.tasksSubject.next([...currentTasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
      throw new Error('Failed to add task');
    }
  }

  updateTask(updatedTask: Task): void {
    try {
      if (!updatedTask || !updatedTask.id) throw new Error('Invalid task or task ID');
      const currentTasks = this.tasksSubject.value;
      const index = currentTasks.findIndex(t => t.id === updatedTask.id);
      if (index === -1) throw new Error('Task not found');
      currentTasks[index] = updatedTask;
      this.tasksSubject.next([...currentTasks]);
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  }

  getTasks(): Task[] {
    return [...this.tasksSubject.value];
  }

  // Filter Operations
  applyFilters(
    initialData: TableItem[][],
    searchString: string,
    selectedDate: string | null,
  ): TableItem[][] {
    try {
      if (!initialData) return [];
      let filteredData = [...initialData];

      // Lọc theo search string
      if (searchString?.trim()) {
        const searchLower = searchString.toLowerCase().trim();
        filteredData = filteredData.filter(row => {
          const name = row[0]?.data;
          return name && typeof name === 'string' && name.toLowerCase().includes(searchLower);
        });
      }

      // Lọc theo ngày
      if (selectedDate) {
        const standardizedSelectedDate = this.standardizeDate(selectedDate);
        if (standardizedSelectedDate) {
          filteredData = filteredData.filter(row => {
            const date = row[2]?.data;
            if (!date || typeof date !== 'string') return false;
            const standardizedRowDate = this.standardizeDate(date);
            console.log(
              `Comparing: row date=${standardizedRowDate}, selected date=${standardizedSelectedDate}`,
            );
            return standardizedRowDate === standardizedSelectedDate;
          });
        } else {
          console.warn('Invalid selected date, skipping date filter:', selectedDate);
        }
      }

      return filteredData;
    } catch (error) {
      console.error('Error applying filters:', error);
      return initialData;
    }
  }

  // Pagination Operations
  updateTotalPages(filteredData: TableItem[][], paginationModel: PaginationModel): void {
    if (!paginationModel) return;
    paginationModel.totalDataLength = filteredData?.length || 0;
  }

  updateTableData(
    filteredData: TableItem[][],
    paginationModel: PaginationModel,
    tableModel: TableModel,
  ): void {
    try {
      if (!filteredData || !paginationModel || !tableModel) {
        throw new Error('Invalid parameters');
      }
      const pageLength = paginationModel.pageLength ?? 1;
      const startIndex = (paginationModel.currentPage - 1) * pageLength;
      const endIndex = startIndex + pageLength;
      tableModel.data = filteredData.slice(startIndex, endIndex);
    } catch (error) {
      console.error('Error updating table data:', error);
      tableModel.data = [];
    }
  }

  navigateToLastPage(
    tasks: Task[],
    initialDataLength: number,
    paginationModel: PaginationModel,
    tableModel: TableModel,
    filteredData: TableItem[][],
  ): void {
    try {
      if (!tasks || !paginationModel || !tableModel || !filteredData) return;
      const totalPages = Math.ceil(tasks.length / (paginationModel.pageLength ?? 1));
      if (tasks.length > initialDataLength) {
        paginationModel.currentPage = totalPages;
        this.updateTableData(filteredData, paginationModel, tableModel);
      }
    } catch (error) {
      console.error('Error navigating to last page:', error);
    }
  }

  selectPage(
    page: number,
    paginationModel: PaginationModel,
    filteredData: TableItem[][],
    tableModel: TableModel,
  ): void {
    try {
      if (page < 1 || !paginationModel || !filteredData || !tableModel) return;
      paginationModel.currentPage = page;
      this.updateTableData(filteredData, paginationModel, tableModel);
    } catch (error) {
      console.error('Error selecting page:', error);
    }
  }

  onPageLengthChange(
    pageLength: number,
    paginationModel: PaginationModel,
    filteredData: TableItem[][],
    tableModel: TableModel,
  ): void {
    try {
      if (pageLength < 1 || !paginationModel || !filteredData || !tableModel) return;
      paginationModel.pageLength = pageLength;
      paginationModel.currentPage = 1;
      this.updateTableData(filteredData, paginationModel, tableModel);
    } catch (error) {
      console.error('Error changing page length:', error);
    }
  }

  // Selection Operations
  getSelectedRowsData(tableModel: TableModel): TableItem[][] {
    try {
      if (!tableModel || !tableModel.rowsSelected || !tableModel.data) return [];
      const selectedData: TableItem[][] = [];
      tableModel.rowsSelected.forEach((isSelected, index) => {
        if (isSelected && index < tableModel.data.length) {
          selectedData.push(tableModel.data[index]);
        }
      });
      return selectedData;
    } catch (error) {
      console.error('Error getting selected rows:', error);
      return [];
    }
  }
}