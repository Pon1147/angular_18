// task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableItem, PaginationModel, TableModel } from 'carbon-components-angular';
import { Task } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly task: Task[] = [];

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

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;
    const newId = currentTasks.length ? Math.max(...currentTasks.map(t => t.id)) + 1 : 1;
    const newTask = { ...task, id: newId };
    this.tasksSubject.next([...currentTasks, newTask]);
  }
  updateTask(updatedTask: Task) {
    const currentTasks = this.tasksSubject.value;
    const index = currentTasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      currentTasks[index] = updatedTask;
      this.tasksSubject.next([...currentTasks]);
    }
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }
  // Filter logic
  applyFilters(
    initialData: TableItem[][],
    searchString: string,
    selectedDate: string | null,
  ): TableItem[][] {
    let filteredData = [...initialData];
    if (searchString.trim() !== '') {
      const searchLower = searchString.toLowerCase().trim();
      filteredData = filteredData.filter(row =>
        (row[0]?.data as string)?.toLowerCase().includes(searchLower),
      );
    }
    if (selectedDate) {
      filteredData = filteredData.filter(row => (row[2]?.data as string) === selectedDate);
    }
    return filteredData;
  }

  // Pagination logic
  updateTotalPages(filteredData: TableItem[][], paginationModel: PaginationModel): void {
    paginationModel.totalDataLength = filteredData.length;
  }

  updateTableData(
    filteredData: TableItem[][],
    paginationModel: PaginationModel,
    tableModel: TableModel,
  ): void {
    const startIndex = (paginationModel.currentPage - 1) * paginationModel.pageLength!;
    const endIndex = startIndex + paginationModel.pageLength!;
    tableModel.data = filteredData.slice(startIndex, endIndex);
  }

  navigateToLastPageIfNewTaskAdded(
    tasks: Task[],
    initialDataLength: number,
    paginationModel: PaginationModel,
    tableModel: TableModel,
    filteredData: TableItem[][],
  ): void {
    const totalPages = Math.ceil(tasks.length / paginationModel.pageLength!);
    if (tasks.length > initialDataLength) {
      paginationModel.currentPage = totalPages;
      this.updateTableData(filteredData, paginationModel, tableModel);
    }
  }

  selectPage(
    page: number,
    paginationModel: PaginationModel,
    filteredData: TableItem[][],
    tableModel: TableModel,
  ): void {
    paginationModel.currentPage = page;
    this.updateTableData(filteredData, paginationModel, tableModel);
  }

  onPageLengthChange(
    pageLength: number,
    paginationModel: PaginationModel,
    filteredData: TableItem[][],
    tableModel: TableModel,
  ): void {
    paginationModel.pageLength = pageLength;
    paginationModel.currentPage = 1;
    this.updateTableData(filteredData, paginationModel, tableModel);
  }
  // Selection logic
  getSelectedRowsData(tableModel: TableModel): TableItem[][] {
    const rowsSelectionStatus = tableModel.rowsSelected;
    const currentViewData = tableModel.data;
    const selectedData: TableItem[][] = [];
    rowsSelectionStatus.forEach((isSelected, index) => {
      if (isSelected && index < currentViewData.length) {
        selectedData.push(currentViewData[index]);
      }
    });
    return selectedData;
  }
}
