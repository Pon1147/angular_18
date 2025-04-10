// todolist.component.ts
import { Component, OnInit } from '@angular/core';
import { PaginationModel, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { provideIcons } from '@ng-icons/core';
import { typFilter } from '@ng-icons/typicons';
import { SharedModule } from '../../../../shared/shared.module';
import { Task } from '../../../../shared/models/todo.model';
import { Router, RouterOutlet } from '@angular/router';
import { TaskService } from '../../../../shared/service/task.service';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [SharedModule, RouterOutlet],
  viewProviders: [provideIcons({ typFilter })],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  title = 'Todo List !!!';
  description = 'Below are Todo List';
  batchText = {
    SINGLE: '1 item selected',
    MULTIPLE: '{{count}} items selected',
  };

  model = new TableModel();
  tasks: Task[] = [];
  initialModelData: TableItem[][] = [];
  filteredData: TableItem[][] = [];
  currentSearchString = '';
  currentSelectedDateString: string | null = null;

  paginationModel = new PaginationModel();
  itemsPerPageOptions = [5, 10, 15];

  constructor(
    private readonly router: Router,
    private readonly taskService: TaskService,
  ) {
    this.model.header = [
      new TableHeaderItem({ data: 'Name', title: 'Table header title' }),
      new TableHeaderItem({ data: 'Status' }),
      new TableHeaderItem({ data: 'Date' }),
    ];

    this.tasks = this.taskService.getTasks();
    this.initialModelData = this.tasks.map(row => [
      new TableItem({ data: row.name, title: 'Task details' }),
      new TableItem({ data: row.status, title: 'Task status' }),
      new TableItem({ data: row.date[0], title: 'Date' }),
    ]);
    this.model.data = [...this.initialModelData];
    this.filteredData = [...this.initialModelData];

    this.paginationModel.pageLength = this.itemsPerPageOptions[0];
    this.paginationModel.currentPage = 1;
    this.updateTotalPages();
    this.updateTableData();
  }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.initialModelData = tasks.map(row => [
        new TableItem({ data: row.name }),
        new TableItem({ data: row.status }),
        new TableItem({ data: row.date[0] }),
      ]);
      this.filteredData = [...this.initialModelData];
      this.applyFilters();
      this.navigateToLastPageIfNewTaskAdded(tasks); // Check if a new task was added
    });
  }

  openAddModal() {
    this.router.navigate(['/todo/add']);
  }

  editSelected() {
    const selectedData = this.getSelectedRowsData();
    if (selectedData.length === 1) {
      const selectedTask = this.tasks.find(task => task.name === selectedData[0][0].data);
      if (selectedTask) {
        this.router.navigate(['/todo/edit', selectedTask.id]);
      }
    } else {
      console.log('Please select exactly one row to edit.');
    }
  }

  selectPage(page: number) {
    this.paginationModel.currentPage = page;
    this.updateTableData();
  }

  onPageLengthChange(event: any) {
    this.paginationModel.pageLength = event.value;
    this.paginationModel.currentPage = 1;
    this.updateTableData();
  }

  private updateTotalPages() {
    this.paginationModel.totalDataLength = this.filteredData.length;
  }

  private updateTableData() {
    const startIndex = (this.paginationModel.currentPage - 1) * this.paginationModel.pageLength!;
    const endIndex = startIndex + this.paginationModel.pageLength!;
    this.model.data = this.filteredData.slice(startIndex, endIndex);
  }

  private navigateToLastPageIfNewTaskAdded(tasks: Task[]) {
    const totalPages = Math.ceil(tasks.length / this.paginationModel.pageLength!);
    if (tasks.length > this.initialModelData.length) {
      // Check if a new task was added
      this.paginationModel.currentPage = totalPages;
      this.updateTableData();
    }
  }

  applyFilters() {
    let filteredData = [...this.initialModelData];
    if (this.currentSearchString.trim() !== '') {
      const searchLower = this.currentSearchString.toLowerCase().trim();
      filteredData = filteredData.filter(row =>
        (row[0]?.data as string)?.toLowerCase().includes(searchLower),
      );
    }
    if (this.currentSelectedDateString) {
      filteredData = filteredData.filter(
        row => (row[2]?.data as string) === this.currentSelectedDateString,
      );
    }
    this.filteredData = filteredData;
    this.updateTotalPages();
    this.updateTableData();
  }

  filterNodeNames(searchString: string | null) {
    this.currentSearchString = searchString ?? '';
    this.applyFilters();
  }

  onDateChange(selectedDates: Date[] | null) {
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      this.currentSelectedDateString = this.formatDate(selectedDates[0]);
    } else {
      this.currentSelectedDateString = null;
    }
    this.applyFilters();
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private getSelectedRowsData(): TableItem[][] {
    const rowsSelectionStatus = this.model.rowsSelected;
    const currentViewData = this.model.data;
    const selectedData: TableItem[][] = [];
    rowsSelectionStatus.forEach((isSelected, index) => {
      if (isSelected && index < currentViewData.length) {
        selectedData.push(currentViewData[index]);
      }
    });
    return selectedData;
  }
  deleteSelected() {
    throw new Error('Method not implemented.');
    }
    downloadSelected() {
    throw new Error('Method not implemented.');
    }
}
