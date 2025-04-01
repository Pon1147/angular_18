import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../app/share/shared.module';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { typFilter } from '@ng-icons/typicons';

class CustomHeaderItem extends TableHeaderItem {
  isRowFiltered(item: TableItem): boolean {
    if (!this.filterData?.data) {
      return false; // Không có ngày lọc, không lọc hàng
    }

    const rowDateStr = item.data; // Giá trị ngày, ví dụ: "2025-03-28"
    const filterDateStr = this.filterData.data; // Giá trị từ cds-date-picker, ví dụ: "03/28/2025"

    // Chuyển đổi định dạng từ cds-date-picker (mm/dd/yyyy) sang YYYY-MM-DD
    const [month, day, year] = filterDateStr.split('/');
    const filterDate = new Date(`${year}-${month}-${day}`);

    const rowDate = new Date(rowDateStr);

    // So sánh ngày (bỏ qua thời gian)
    return !(
      rowDate.getFullYear() === filterDate.getFullYear() &&
      rowDate.getMonth() === filterDate.getMonth() &&
      rowDate.getDate() === filterDate.getDate()
    );
  }
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [SharedModule, NgIcon],
  viewProviders: [provideIcons ({typFilter})],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})


export class TodolistComponent implements OnInit {
  // Binding các properties for the table header
  title = 'Todo List !!!';
  description = 'Below are Todo List';
  // Binding giá trị cho 2 biến của properties batchText thuộc CDS
  batchText = {
    SINGLE: '1 item selected',
    MULTIPLE: '{{count}} items selected',
  };

  // Khai báo TableModel() để sử dụng
  model = new TableModel();
  // Khai báo mảng dữ liệu cho TableModel() và là Hàm 2 chiều
  initialModelData: TableItem[][] = [];

  constructor() {
    // Khai báo giá trị cho header model với 3 cột Name, Status, Date bằng biến TableHeaderItem
    this.model.header = [
      new TableHeaderItem({ data: 'Name', title: 'Table header title', sortable: true }),
      new TableHeaderItem({ data: 'Status', className: 'my-class', sortable: true }),
      new CustomHeaderItem({ data: 'Date', sortable: true }), // Sử dụng CustomHeaderItem cho cột Date
    ];
    
    // Khai báo giá trị các hàng dựa trên cột tương ứng bằng biến TableItem
    this.model.data = [
      [
        new TableItem({ data: 'Research About Table', title: 'Table item title' }),
        new TableItem({ data: 'processing' }),
        new TableItem({ data: '2025-03-28' }), // Đổi định dạng
      ],
      [
        new TableItem({ data: 'Add Button addNewData to table' }),
        new TableItem({ data: 'done' }),
        new TableItem({ data: '2025-03-31' }),
      ],
      [
        new TableItem({ data: 'Complete Angular Assignment' }),
        new TableItem({ data: 'pending' }),
        new TableItem({ data: '2025-04-02' }),
      ],
      [
        new TableItem({ data: 'Meet with Team' }),
        new TableItem({ data: 'processing' }),
        new TableItem({ data: '2025-04-03' }),
      ],
      [
        new TableItem({ data: 'Write Report' }),
        new TableItem({ data: 'done' }),
        new TableItem({ data: '2025-04-04' }),
      ],
      [
        new TableItem({ data: 'Plan Project Timeline' }),
        new TableItem({ data: 'pending' }),
        new TableItem({ data: '2025-04-05' }),
      ],
      [
        new TableItem({ data: 'Review Code' }),
        new TableItem({ data: 'processing' }),
        new TableItem({ data: '2025-04-06' }),
      ],
    ];
    // Khởi tạo mảng ban đầu cho initialModelData để lưu dữ liệu ban đầu của model.data
    this.initialModelData = [...this.model.data];
  }

  ngOnInit(): void {
    // Xử lý sự kiện khi chọn một dòng hoặc tất cả các dòng
    this.model.rowsSelectedChange.subscribe(event =>
      console.log('Bạn đang chọn dòng ' + (event + 1)),
    );
    this.model.selectAllChange.subscribe(event =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!'),
    );
  }

  addNewData() {
    // Tạo dòng mới có dữ liệu mặc định cho Name, Status và Date
    const newRow = [
      new TableItem({ data: `Task ${this.model.data.length + 1}` }),
      new TableItem({ data: 'Pending' }),
      new TableItem({ data: '2025-04-07' }), // Định dạng mới
    ];
    // Thêm dòng mới vào model.data
    this.model.data = [...this.model.data, newRow];
    // Cập nhật lại table
    this.initialModelData = [...this.model.data];
  }

  // Xử lý sự kiện khi nhập vào input search
  filterNodeNames(searchString: string) {
    // Xử lý code tìm kiếm và lọc dữ liệu theo tên task
    console.log('searchString:', searchString);
    console.log('model.data before filtering:', this.model.data);
    // Nếu giá trị trả về là rỗng thì model.data bằng giá trị table ban đầu
    if (searchString.trim() === '') {
      this.model.data = [...this.initialModelData];
    } else {
      this.model.data = this.initialModelData.filter(row => {
        const name = (row[0].data as string).toLowerCase();
        return name.includes(searchString.toLowerCase().trim());
      });
    }
    console.log('model.data after filtering:', this.model.data);
  }

  onDateChange(dateValue: string) {
    this.model.header[2].filterData = { data: dateValue }; // Cột Date là cột thứ 3 (index 2)
    this.model.data = [...this.model.data]; // Trigger change detection
  }
}
