import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { BookingIconComponent } from '../../../../icons/BookingIcon';
import { OperationsIconComponent } from '../../../../icons/OperationsIcon';
import { AccountsIconComponent } from '../../../../icons/AccountsIcon';
import { MarkUpIconComponent } from '../../../../icons/MarkUpIcon';
import { LogoutIconComponent } from '../../../../icons/LogoutIcon';

interface MenuItem {
  label: string;
  icon: Type<any> | string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isSidebarOpen = false;
  menuItems: MenuItem[] = [
    {
      label: 'Bookings',
      icon: BookingIconComponent,
      expanded: false,
      children: [
        { label: 'My Bookings', icon: '', route: '/bookings/my-bookings' },
        { label: 'My Quotations', icon: '', route: '/bookings/quotations' },
      ],
    },
    {
      label: 'My Operations',
      icon: OperationsIconComponent,
      expanded: false,
      children: [
        { label: 'Activities Operations', icon: '', route: '/operations/activities' },
        { label: 'Hotels Operations', icon: '', route: '/operations/hotels' },
        { label: 'Cruises Operations', icon: '', route: '/operations/cruises' },
        { label: 'Holidays Operations', icon: '', route: '/operations/holidays' },
        { label: 'Visas Operations', icon: '', route: '/operations/visas' },
        { label: 'Yachts Operations', icon: '', route: '/operations/yachts' },
      ],
    },
    {
      label: 'Accounts',
      icon: AccountsIconComponent,
      route: '/accounts',
    },
    {
      label: 'Markup',
      icon: MarkUpIconComponent,
      route: '/markup',
    },
    {
      label: 'Logout',
      icon: LogoutIconComponent,
      route: '/logout',
    },
  ];

  ngOnInit(): void {}

  isComponent(icon: any): boolean {
    return typeof icon === 'function';
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleMenuItem(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
