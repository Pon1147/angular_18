import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { HeaderItem } from '../../models/header-fluid.interface';
import { SharedModule } from '../../shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-fluid',
  standalone: true,
  imports: [SharedModule], 
  templateUrl: './header-fluid.component.html',
  styleUrls: ['./header-fluid.component.scss'],
})
export class HeaderFluidComponent implements OnInit {
  @Input() headerItems: HeaderItem[] = [];
  hasHamburger: boolean = false;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    console.log(this.headerItems);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.hasHamburger = false;
    }
  }

  isMenuItem(item: HeaderItem): boolean {
    return item.type === 'menu';
  }

  onItemClick(item: HeaderItem): void {
    const content = item.content ?? 'unknown';
    console.log(item.isCurrentPage ? `${content} is the current page` : `Navigating to ${content}`);
  }

  onItemKeydown(event: KeyboardEvent, item: HeaderItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onItemClick(item);
    }
  }
}
