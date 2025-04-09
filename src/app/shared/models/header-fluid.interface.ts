export interface HeaderItem {
    type: 'item' | 'menu';
    content?: string;
    title?: string;
    isCurrentPage?: boolean;
    route?: any[]; // Thay đổi từ string thành any[] để khớp với NavigationItem
    menuItems?: HeaderItem[];
  }