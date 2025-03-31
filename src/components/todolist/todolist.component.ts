import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../app/share/shared.module';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [SharedModule],
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
      new TableHeaderItem({ data: 'Date', sortable: true }),
    ];
    // Khai báo giá trị các hàng dựa trên cột tương ứng bằng biến TableItem
    this.model.data = [
      [
        new TableItem({ data: 'Research About Table', title: 'Table item title' }),
        new TableItem({ data: 'processing' }),
        new TableItem({ data: 'Mar.28.2025' }),
      ],
      [
        new TableItem({ data: 'Add Button addNewData to table' }),
        new TableItem({ data: 'done' }),
        new TableItem({ data: 'Mar.31.2025' }),
      ],
      [
        new TableItem({ data: 'Complete Angular Assignment' }),
        new TableItem({ data: 'pending' }),
        new TableItem({ data: 'Apr.02.2025' }),
      ],
      [
        new TableItem({ data: 'Meet with Team' }),
        new TableItem({ data: 'processing' }),
        new TableItem({ data: 'Apr.03.2025' }),
      ],
      [
        new TableItem({ data: 'Write Report' }),
        new TableItem({ data: 'done' }),
        new TableItem({ data: 'Apr.04.2025' }),
      ],
      [
        new TableItem({ data: 'Plan Project Timeline' }),
        new TableItem({ data: 'pending' }),
        new TableItem({ data: 'Apr.05.2025' }),
      ],
      [
        new TableItem({ data: 'Review Code' }),
        new TableItem({ data: 'processing' }),
        new TableItem({ data: 'Apr.06.2025' }),
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
      new TableItem({ data: 'Edit' }),
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
}