import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../app/share/shared.module';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { typFilter } from '@ng-icons/typicons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [SharedModule, NgIcon, CommonModule],
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

  constructor() {
    // Khởi tạo header cho bảng
    this.model.header = [
      new TableHeaderItem({ data: 'Name', title: 'Table header title', sortable: true }),
      new TableHeaderItem({ data: 'Status', className: 'my-class', sortable: true }),
      new TableHeaderItem({ data: 'Date', sortable: true }),
    ];

    // Dữ liệu gốc dạng mảng thô
    const rawData = [
      ['Research About Table', 'processing', '2025-03-28'],
      ['Add Button addNewData to table', 'done', '2025-03-31'],
      ['Complete Angular Assignment', 'pending', '2025-04-02'],
      ['Meet with Team', 'processing', '2025-04-03'],
      ['Write Report', 'done', '2025-04-04'],
      ['Plan Project Timeline', 'pending', '2025-04-05'],
      ['Review Code', 'processing', '2025-04-06'],
    ];

    // Chuyển dữ liệu thô thành TableItem để sử dụng trong TableModel
    this.initialModelData = rawData.map(row => [
      new TableItem({ data: row[0], title: 'Task details' }),
      new TableItem({ data: row[1] }),
      new TableItem({ data: row[2] }),
    ]);
    this.model.data = [...this.initialModelData]; // Gán dữ liệu ban đầu cho model
  }

  ngOnInit(): void {
    // Đăng ký sự kiện khi trạng thái chọn của các dòng thay đổi
    this.model.rowsSelectedChange.subscribe((selectedRows: boolean[]) =>
      console.log('Trạng thái chọn các dòng (view hiện tại):', selectedRows)
    );
    // Đăng ký sự kiện khi chọn/bỏ chọn tất cả
    this.model.selectAllChange.subscribe(event =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );
  }

  // Thêm một hàng mới vào bảng
  addNewData() {
    // Tạo dữ liệu mới cho hàng
    const newRawRow = [`Task ${this.initialModelData.length + 1}`, 'Pending', '2025-04-07'];
    const newTableRow = [
      new TableItem({ data: newRawRow[0] }),
      new TableItem({ data: newRawRow[1] }),
      new TableItem({ data: newRawRow[2] }),
    ];
    // Thêm hàng mới vào dữ liệu gốc
    this.initialModelData = [...this.initialModelData, newTableRow];
    // Áp dụng lại bộ lọc để cập nhật view
    this.applyFilters();
  }

  // Định dạng ngày từ Date sang chuỗi YYYY-MM-DD
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
    console.log('Đang xóa các dòng có dữ liệu:', selectedRowsData.map(row => row[0].data));

    // Tạo Set chứa định danh (tên task) của các hàng cần xóa
    const identifiersToDelete = new Set(selectedRowsData.map(row => row[0].data));
    // Lọc dữ liệu gốc, giữ lại các hàng không nằm trong Set cần xóa
    this.initialModelData = this.initialModelData.filter(initialRow =>
      !identifiersToDelete.has(initialRow[0].data)
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
      console.log('Lưu các dòng được chọn:', selectedData.map(row => row.map(item => item.data)));
      // Thêm logic lưu thực tế nếu cần
    } else {
      console.log('Không có dòng nào được chọn để lưu.');
    }
  }

  // Tải xuống các hàng được chọn
  downloadSelected() {
    const selectedData = this.getSelectedRowsData();
    if (selectedData.length > 0) {
      console.log('Tải xuống các dòng được chọn:', selectedData.map(row => row.map(item => item.data)));
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