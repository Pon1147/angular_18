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
    } else {
      console.log('Please select exactly one row to edit.');
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
    console.log('Applying filters with:');
    console.log('Search string:', this.currentSearchString);
    console.log('Selected date:', this.currentSelectedDateString);
    console.log('Initial data:', this.initialModelData);

    this.filteredData = this.taskService.applyFilters(
      this.initialModelData,
      this.currentSearchString,
      this.currentSelectedDateString,
    );

    console.log('Filtered data:', this.filteredData);

    this.taskService.updateTotalPages(this.filteredData, this.paginationModel);
    this.taskService.updateTableData(this.filteredData, this.paginationModel, this.model);
  }

  filterNodeNames(searchString: string | null) {
    this.currentSearchString = searchString ?? '';
    this.applyFilters();
  }

  onDateChange(selectedDates: Date[] | null) {
    console.log('Selected dates from date picker:', selectedDates);
    try {
      if (selectedDates && selectedDates.length > 0) {
        const selectedDate = selectedDates[0];
        if (!isNaN(selectedDate.getTime())) {
          const day = String(selectedDate.getDate()).padStart(2, '0');
          const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
          const year = selectedDate.getFullYear();
          this.currentSelectedDateString = `${day}/${month}/${year}`;
        } else {
          throw new Error('Invalid date selected');
        }
      } else {
        this.currentSelectedDateString = null;
      }
      console.log('Formatted selected date:', this.currentSelectedDateString);
      this.applyFilters();
    } catch (error) {
      console.error('Error processing selected date:', error);
      this.currentSelectedDateString = null;
      this.applyFilters();
    }
  }

  // private getSelectedRowsData(): TableItem[][] {
  //   const rowsSelectionStatus = this.model.rowsSelected;
  //   const currentViewData = this.model.data;
  //   const selectedData: TableItem[][] = [];
  //   rowsSelectionStatus.forEach((isSelected, index) => {
  //     if (isSelected && index < currentViewData.length) {
  //       selectedData.push(currentViewData[index]);
  //     }
  //   });
  //   return selectedData;
  // }

  deleteSelected() {
    throw new Error('Method not implemented.');
  }

  downloadSelected() {
    throw new Error('Method not implemented.');
  }
}