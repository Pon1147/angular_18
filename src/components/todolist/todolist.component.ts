import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../app/share/shared.module';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { typFilter } from '@ng-icons/typicons';
import { Task } from '../../app/share/models/todo.model';
import { ModalAddTodoItemComponent } from '../../app/share/components/modal-add-todo-item/modal-add-todo-item.component';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [SharedModule, NgIcon, ModalAddTodoItemComponent],
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
  initialModelData: TableItem[][] = []; // Dữ liệu gốc, không thay đổi khi lọc
  currentSearchString = ''; // Giá trị tìm kiếm hiện tại
  currentSelectedDateString: string | null = null; // Ngày được chọn để lọc
  isModalOpen = false; // Trạng thái mở/đóng của modal

  constructor() {
    // Khởi tạo header cho bảng
    this.model.header = [
      new TableHeaderItem({ data: 'Name', title: 'Table header title' }),
      new TableHeaderItem({ data: 'Status' }),
      new TableHeaderItem({ data: 'Date' }),
    ];

    // Dữ liệu gốc với `date` là mảng chuỗi
    const rawData: Task[] = [
      { name: 'Research About Table', status: 'processing', date: ['28/03/2025'] },
      { name: 'Add Button addNewData to table', status: 'done', date: ['31/03/2025'] },
      { name: 'Complete Angular Assignment', status: 'pending', date: ['02/04/2025'] },
      { name: 'Meet with Team', status: 'processing', date: ['03/04/2025'] },
      { name: 'Write Report', status: 'done', date: ['04/04/2025'] },
      { name: 'Plan Project Timeline', status: 'pending', date: ['05/04/2025'] },
      { name: 'Review Code', status: 'processing', date: ['06/04/2025'] },
    ];

    // Chuyển dữ liệu thô thành TableItem để sử dụng trong TableModel
    this.initialModelData = rawData.map(row => [
      new TableItem({ data: row.name, title: 'Task details' }),
      new TableItem({ data: row.status, title: 'Task status' }),
      new TableItem({ data: row.date, title: 'Date' }),
    ]);
    this.model.data = [...this.initialModelData]; // Gán dữ liệu ban đầu cho model
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
  // Mở modal để thêm task mới
  openAddModal() {
    this.isModalOpen = true;
  }

  // Đóng modal
  closeAddModal() {
    this.isModalOpen = false;
  }
  handleAddTask(task: Task) {
    // task.date là mảng chuỗi, lấy phần tử đầu tiên để chuyển đổi định dạng
    const formattedDate = this.convertDateFormat(task.date[0]); // Từ yyyy-mm-dd sang dd/mm/yyyy
    const formattedTask: Task = {
      ...task,
      date: [formattedDate], // Đặt lại thành mảng chứa một chuỗi
    };
  
    const newTableRow = [
      new TableItem({ data: formattedTask.name }),
      new TableItem({ data: formattedTask.status }),
      new TableItem({ data: formattedTask.date[0] }), // Hiển thị ngày đầu tiên
    ];
    this.initialModelData = [...this.initialModelData, newTableRow];
    this.applyFilters();
  }
  // Thêm một hàng mới vào bảng
  addNewData() {
    const newRawRow: Task = {
      name: `Task ${this.initialModelData.length + 1}`,
      status: 'pending',
      date: ['07/04/2025'],
    };
    const newTableRow = [
      new TableItem({ data: newRawRow.name }),
      new TableItem({ data: newRawRow.status }),
      new TableItem({ data: newRawRow.date }),
    ];
    this.initialModelData = [...this.initialModelData, newTableRow];
    this.applyFilters();
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
    let filteredData = [...this.initialModelData]; // Bắt đầu từ dữ liệu gốc

    // Lọc theo tên (nếu có giá trị tìm kiếm)
    if (this.currentSearchString.trim() !== '') {
      const searchLower = this.currentSearchString.toLowerCase().trim();
      filteredData = filteredData.filter(row => {
        const name = (row[0]?.data as string)?.toLowerCase() ?? '';
        return name.includes(searchLower);
      });
      console.log('Sau khi lọc theo tên:', filteredData.length, 'rows');
    }

    // Lọc theo ngày (nếu có ngày được chọn)
    if (this.currentSelectedDateString) {
      filteredData = filteredData.filter(row => {
        const itemDate = (row[2]?.data as string) ?? '';
        return itemDate === this.currentSelectedDateString;
      });
      console.log('Sau khi lọc theo ngày:', filteredData.length, 'rows');
    }

    // Cập nhật dữ liệu hiển thị trong bảng
    this.model.data = filteredData;
    // Reset trạng thái chọn để tránh lỗi không đồng bộ
    this.model.selectAll(false);
    console.log('Đã áp dụng bộ lọc. Dữ liệu mới:', this.model.data.length, 'rows');
  }

  // Xử lý sự kiện tìm kiếm theo tên
  filterNodeNames(searchString: string | null) {
    this.currentSearchString = searchString ?? '';
    console.log('Tìm kiếm theo tên:', this.currentSearchString);
    this.applyFilters();
  }

  // Xử lý sự kiện khi chọn ngày từ cds-date-picker
  onDateChange(selectedDates: Date[] | null) {
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      this.currentSelectedDateString = this.formatDate(selectedDates[0]);
      console.log('Ngày được chọn:', this.currentSelectedDateString);
    } else {
      this.currentSelectedDateString = null;
      console.log('Không có ngày được chọn, reset bộ lọc ngày');
    }
    this.applyFilters();
  }

  // Xóa các hàng được chọn
  deleteSelected() {
    const selectedRowsData = this.getSelectedRowsData();
    if (selectedRowsData.length === 0) {
      console.log('Không có dòng nào được chọn để xóa.');
      return;
    }
    console.log(
      'Đang xóa các dòng có dữ liệu:',
      selectedRowsData.map(row => row[0].data),
    );

    // Tạo Set chứa định danh (tên task) của các hàng cần xóa
    const identifiersToDelete = new Set(selectedRowsData.map(row => row[0].data));

    // Lọc dữ liệu gốc, giữ lại các hàng không nằm trong Set cần xóa
    this.initialModelData = this.initialModelData.filter(
      initialRow => !identifiersToDelete.has(initialRow[0].data),
    );

    // Áp dụng lại bộ lọc để cập nhật view
    this.applyFilters();

    // Reset trạng thái chọn
    this.model.selectAll(false);
    console.log('Đã xóa các mục được chọn.');
  }

  // Lưu các hàng được chọn
  saveSelected() {
    const selectedData = this.getSelectedRowsData();
    if (selectedData.length > 0) {
      console.log(
        'Lưu các dòng được chọn:',
        selectedData.map(row => row.map(item => item.data)),
      );
      // Thêm logic lưu thực tế nếu cần
    } else {
      console.log('Không có dòng nào được chọn để lưu.');
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

  // Lấy dữ liệu của các hàng được chọn
  private getSelectedRowsData(): TableItem[][] {
    const rowsSelectionStatus = this.model.rowsSelected; // Mảng boolean trạng thái chọn
    const currentViewData = this.model.data; // Dữ liệu hiện tại trong bảng
    const selectedData: TableItem[][] = [];

    // Duyệt qua trạng thái chọn và lấy dữ liệu của các hàng được chọn
    rowsSelectionStatus.forEach((isSelected, index) => {
      if (isSelected && index < currentViewData.length) {
        selectedData.push(currentViewData[index]);
      }
    });

    console.log('Dữ liệu các hàng được chọn:', selectedData);
    return selectedData;
  }
}
