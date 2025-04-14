import { Params } from "@angular/router";

export interface HeaderItem {
    type: 'item' | 'menu';
    content?: string;
    title?: string;
    isCurrentPage?: boolean;
    route?: (string | number | Params)[]; // Thay đổi từ string thành any[] để khớp với NavigationItem
    menuItems?: HeaderItem[];
  }