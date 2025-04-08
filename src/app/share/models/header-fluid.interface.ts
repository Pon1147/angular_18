export interface HeaderItem {
    type: 'item' | 'menu';
    content?: string;
    title?: string;
    isCurrentPage?: boolean;
    menuItems?: HeaderItem[];
}