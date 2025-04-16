import { Component, OnInit } from '@angular/core';
import {
  PaginationModel,
  TableHeaderItem,
  TableItem,
  TableModel,
  PaginationModule,
} from 'carbon-components-angular';
import { provideIcons } from '@ng-icons/core';
import { typFilter } from '@ng-icons/typicons';
import { Router, RouterOutlet } from '@angular/router';
import { Task } from '../../shared/models/todo.model';
import { DateUtilsService } from '../../shared/service/date-utils.service';
import { TaskService } from '../../shared/service/task.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [SharedModule, RouterOutlet, PaginationModule],
  viewProviders: [provideIcons({ typFilter })],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
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
    private readonly dateUtilsService: DateUtilsService,
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
    this.taskService.updateTotalPages(this.filteredData, this.paginationModel);
    this.taskService.updateTableData(this.filteredData, this.paginationModel, this.model);
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
      this.taskService.navigateToLastPage(
        tasks,
        this.initialModelData.length,
        this.paginationModel,
        this.model,
        this.filteredData,
      );
    });
  }

  openAddModal() {
    this.router.navigate(['/todo/add']);
  }

  getSelectedCount(): number {
    return this.model.rowsSelected.filter(isSelected => isSelected).length;
  }

  editSelected() {
    const selectedData = this.taskService.getSelectedRowsData(this.model);
    if (selectedData.length === 1) {
      const selectedTask = this.tasks.find(task => task.name === selectedData[0][0].data);
      if (selectedTask) {
        this.router.navigate(['/todo/edit', selectedTask.id]);
      }
    }
  }

  selectPage(page: number) {
    this.taskService.selectPage(page, this.paginationModel, this.filteredData, this.model);
  }

  onPageLengthChange(event: Event): void {
    const pageSelect = (event.target as HTMLSelectElement).value;
    const pageNumber = parseInt(pageSelect);
    this.taskService.onPageLengthChange(pageNumber, this.paginationModel, this.filteredData, this.model);
    console.log(123);
    
  }

  applyFilters() {
    this.filteredData = this.taskService.applyFilters(
      this.initialModelData,
      this.currentSearchString,
      this.currentSelectedDateString,
    );
    this.taskService.updateTotalPages(this.filteredData, this.paginationModel);
    this.taskService.updateTableData(this.filteredData, this.paginationModel, this.model);
  }

  filterNodeNames(searchString: string | null) {
    this.currentSearchString = searchString ?? '';
    this.applyFilters();
  }

  onDateChange(selectedDates: Date[] | null) {
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      this.currentSelectedDateString = this.dateUtilsService.formatDate(selectedDates[0]);
    } else {
      this.currentSelectedDateString = null;
    }
    this.applyFilters();
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