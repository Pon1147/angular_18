import { Component, OnInit } from '@angular/core';
import { PaginationModel, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { provideIcons } from '@ng-icons/core';
import { typFilter } from '@ng-icons/typicons';
import { SharedModule } from '../../../../shared/shared.module';
import { Task } from '../../../../shared/models/todo.model';
import { ModalAddTodoItemComponent } from '../../../../shared/components/modal-add-todo-item/modal-add-todo-item.component';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [SharedModule, ModalAddTodoItemComponent],
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
  tasks: Task[] = []; // chứa toàn bộ thông tin gốc
  initialModelData: TableItem[][] = []; // Dữ liệu gốc, không thay đổi khi lọc (không chứa ID)
  filteredData: TableItem[][] = []; // Dữ liệu sau khi lọc để hiển thị phân trang
  currentSearchString = ''; // Giá trị tìm kiếm hiện tại
  currentSelectedDateString: string | null = null; // Ngày được chọn để lọc
  isModalOpen = false; // Trạng thái mở/đóng của modal
  private nextId = 8; // Bắt đầu từ 8 vì đã có 7 task ban đầu
  modalMode: 'add' | 'edit' = 'add';
  selectedTask: Task | null = null;

  //Phân trang
  paginationModel = new PaginationModel();
  itemsPerPageOptions = [5, 10, 15];

  getEndIndex(): number {
    return Math.min(
      this.paginationModel.currentPage * this.paginationModel.pageLength!,
      this.paginationModel.totalDataLength,
    );
  }

  constructor() {
    // Khởi tạo header cho bảng
    this.model.header = [
      new TableHeaderItem({ data: 'Name', title: 'Table header title' }),
      new TableHeaderItem({ data: 'Status' }),
      new TableHeaderItem({ data: 'Date' }),
    ];

    // Dữ liệu gốc với `date` là mảng chuỗi
    const rawData: Task[] = [
      { id: 1, name: 'Research About Table', status: 'processing', date: ['28/03/2025'] },
      { id: 2, name: 'Add Button addNewData to table', status: 'done', date: ['31/03/2025'] },
      { id: 3, name: 'Complete Angular Assignment', status: 'pending', date: ['02/04/2025'] },
      { id: 4, name: 'Meet with Team', status: 'processing', date: ['03/04/2025'] },
      { id: 5, name: 'Write Report', status: 'done', date: ['04/04/2025'] },
      { id: 6, name: 'Plan Project Timeline', status: 'pending', date: ['05/04/2025'] },
      { id: 7, name: 'Review Code', status: 'processing', date: ['06/04/2025'] },
    ];

    // Chuyển dữ liệu thô thành TableItem để sử dụng trong TableModel
    this.initialModelData = rawData.map(row => [
      new TableItem({ data: row.name, title: 'Task details' }),
      new TableItem({ data: row.status, title: 'Task status' }),
      new TableItem({ data: row.date[0], title: 'Date' }),
    ]);
    this.model.data = [...this.initialModelData]; // Gán dữ liệu ban đầu cho model
    this.tasks = rawData;

    this.paginationModel.pageLength = this.itemsPerPageOptions[0];
    this.paginationModel.currentPage = 1;
    this.filteredData = [...this.initialModelData];
    this.updateTotalPages();
    this.updateTableData();
  }

  ngOnInit(): void {
    // Đăng ký sự kiện khi trạng thái chọn của các dòng thay đổi
    this.model.rowsSelectedChange.subscribe((selectedRows: boolean[]) =>
      console.log('Trạng thái chọn các dòng (view hiện tại):', selectedRows),
    );
    // Đăng ký sự kiện khi chọn/bỏ chọn tất cả
    this.model.selectAllChange.subscribe(event =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!'),
    );
  }

  // **Phương thức phân trang**
  private updateTotalPages() {
    this.paginationModel.totalDataLength = this.filteredData.length;
  }

  private updateTableData() {
    const startIndex = (this.paginationModel.currentPage - 1) * this.paginationModel.pageLength!;
    const endIndex = startIndex + this.paginationModel.pageLength!;
    this.model.data = this.filteredData.slice(startIndex, endIndex);
  }

  selectPage(page: number) {
    this.paginationModel.currentPage = page;
    this.updateTableData();
  }

  onPageLengthChange(event: any) {
    this.paginationModel.pageLength = event.value; // Lấy giá trị từ event.value
    this.paginationModel.currentPage = 1; // Quay về trang 1
    this.updateTableData();
  }

  // Mở modal để thêm task mới
  openAddModal() {
    this.modalMode = 'add';
    this.selectedTask = null;
    this.isModalOpen = true;
  }
  openEditModal(task: Task) {
    this.modalMode = 'edit';
    this.selectedTask = task;
    this.isModalOpen = true;
  }
  // Đóng modal
  closeAddModal() {
    this.isModalOpen = false;
  }
  handleAddTask(task: Task) {
    if (this.modalMode === 'add') {
      const newId = this.nextId++;
      const formattedTask: Task = { ...task, id: newId };
      this.tasks = [...this.tasks, formattedTask];
      const newTableRow = [
        new TableItem({ data: formattedTask.name }),
        new TableItem({ data: formattedTask.status }),
        new TableItem({ data: formattedTask.date[0] }),
      ];
      this.initialModelData = [...this.initialModelData, newTableRow];
      console.log('initialModelData', this.initialModelData);
      this.model.data = [...this.initialModelData];
    } else if (this.modalMode === 'edit' && task.id) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
        const tableIndex = this.initialModelData.findIndex(
          row => row[0].data === this.selectedTask?.name,
        );
        if (tableIndex !== -1) {
          this.initialModelData[tableIndex] = [
            new TableItem({ data: task.name }),
            new TableItem({ data: task.status }),
            new TableItem({ data: task.date[0] }),
          ];
        }
      }
    }
    this.filteredData = [...this.initialModelData];
    this.applyFilters();
    this.isModalOpen = false;
  }
  // Thêm một hàng mới vào bảng
  addNewData() {
    const newId = this.nextId++; // Tăng nextId sau khi sử dụng
    const newRawRow: Task = {
      id: newId,
      name: `Task ${this.initialModelData.length + 1}`,
      status: 'pending',
      date: ['07/04/2025'],
    };
    const newTableRow = [
      new TableItem({ data: newRawRow.name }),
      new TableItem({ data: newRawRow.status }),
      new TableItem({ data: newRawRow.date[0] }),
    ];
    this.initialModelData = [...this.initialModelData, newTableRow];
    this.tasks = [...this.tasks, newRawRow]; // Thêm task mới vào mảng tasks
    this.filteredData = [...this.initialModelData];
    this.applyFilters();
    console.log('Danh sách tasks với ID:', this.tasks);
  }

  // Định dạng ngày từ Date sang chuỗi DD/MM/YYYY
  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Chuyển đổi định dạng ngày từ YYYY-MM-DD sang DD/MM/YYYY
  private convertDateFormat(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  // Hàm tập trung để áp dụng tất cả các bộ lọc (tìm kiếm theo tên và lọc theo ngày)
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
    this.paginationModel.currentPage = 1;
    this.updateTotalPages();
    this.updateTableData();
    this.model.data = filteredData;
    this.model.selectAll(false);
  }

  // Xử lý sự kiện tìm kiếm theo tên
  filterNodeNames(searchString: string | null) {
    this.currentSearchString = searchString ?? '';
    this.applyFilters();
  }

  // Xử lý sự kiện khi chọn ngày từ cds-date-picker
  onDateChange(selectedDates: Date[] | null) {
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      this.currentSelectedDateString = this.formatDate(selectedDates[0]);
    } else {
      this.currentSelectedDateString = null;
    }
    this.applyFilters();
  }
  // Xóa các hàng được chọn
  deleteSelected() {
    const selectedRowsData = this.getSelectedRowsData();
    if (selectedRowsData.length === 0) return;

    const namesToDelete = new Set(selectedRowsData.map(row => row[0].data));
    this.tasks = this.tasks.filter(task => !namesToDelete.has(task.name));
    this.initialModelData = this.initialModelData.filter(row => !namesToDelete.has(row[0].data));
    this.filteredData = this.filteredData.filter(row => !namesToDelete.has(row[0].data));
    this.applyFilters();
    this.model.selectAll(false);
  }

  editSelected() {
    const selectedData = this.getSelectedRowsData(); // Lấy dữ liệu hàng được chọn
    if (selectedData.length === 1) {
      const selectedTask = this.tasks.find(task => task.name === selectedData[0][0].data);
      if (selectedTask) {
        this.modalMode = 'edit'; // Đặt chế độ modal là edit
        this.selectedTask = selectedTask; // Lưu task được chọn
        this.isModalOpen = true; // Mở modal
      }
    } else {
      console.log('Vui lòng chọn đúng một hàng để chỉnh sửa.');
    }
  }

  // Tải xuống các hàng được chọn
  downloadSelected() {
    const selectedData = this.getSelectedRowsData();
    if (selectedData.length > 0) {
      console.log(
        'Tải xuống các dòng được chọn:',
        selectedData.map(row => row.map(item => item.data)),
      );
      // Thêm logic tải xuống thực tế nếu cần
    } else {
      console.log('Không có dòng nào được chọn để tải xuống.');
    }
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
}
