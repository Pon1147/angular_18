import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
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
  @Input() headerItems: HeaderItem[] = []; // Đảm bảo khai báo @Input()
  hasHamburger: boolean = false;

  constructor(private readonly elementRef: ElementRef) {}
  ngOnInit() {
    console.log(this.headerItems); // Kiểm tra xem headerItems có được truyền vào không
  }

  //Handle click outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.hasHamburger = false;
    }
  }
  /**
   * Check if item is a menu type
   * @param item Header item to check
   * @returns boolean indicating if item is a menu
   */
  isMenuItem(item: HeaderItem): boolean {
    return item.type === 'menu';
  }

  /**
   * Handle item click events
   * @param item Clicked header item
   */
  onItemClick(item: HeaderItem): void {
    const content = item.content || 'unknown';
    console.log(item.isCurrentPage 
      ? `${content} is the current page`
      : `Navigating to ${content}`);
  }
/**
   * Handle keyboard navigation
   * @param event Keyboard event
   * @param item Associated header item
   */
onItemKeydown(event: KeyboardEvent, item: HeaderItem): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    this.onItemClick(item);
  }
}
}
