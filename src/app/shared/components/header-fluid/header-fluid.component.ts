import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { HeaderItem } from '../../models/header-fluid.interface';
import { SharedModule } from '../../shared.module';
import { Router } from '@angular/router';
import { typThMenu, typTimes } from '@ng-icons/typicons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-header-fluid',
  standalone: true,
  imports: [SharedModule, NgIcon],
  templateUrl: './header-fluid.component.html',
  styleUrls: ['./header-fluid.component.scss'],
  viewProviders: [provideIcons({ typThMenu, typTimes })],
})
export class HeaderFluidComponent implements OnInit {
  @Input() headerItems: HeaderItem[] = [];
  hasHamburger = false;
  showHamburger = false;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.checkWindowSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkWindowSize();
    this.cdr.detectChanges(); // Cần thiết để cập nhật giao diện
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as Node;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.hasHamburger = false;
      this.cdr.detectChanges();
    }
  }

  private checkWindowSize(): void {
    this.showHamburger = window.innerWidth < 1056;
    if (!this.showHamburger) {
      this.hasHamburger = false;
    }
  }

  onHamburgerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.hasHamburger = !this.hasHamburger;
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
