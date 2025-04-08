import { Component, Input, OnInit } from '@angular/core';
import { HeaderItem } from '../../models/header-fluid.interface';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-header-fluid',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header-fluid.component.html',
  styleUrl: './header-fluid.component.scss',
})
export class HeaderFluidComponent implements OnInit {

  @Input() headerItems: HeaderItem[] = [];

  ngOnInit() {
    console.log('Header Items:', this.headerItems); // Kiểm tra dữ liệu
  }

  public isMenuItem(item: HeaderItem): boolean {
    return item.type === 'menu';
  }

  public onItemClick(item: HeaderItem): void {
    if (item.isCurrentPage) {
      console.log(`${item.content} is the current page`);
    } else {
      console.log(`Navigating to ${item.content}`);
    }
  }
  
}
