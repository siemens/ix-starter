import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  elementDashboard,
  elementDocument,
  elementHome,
  elementList,
} from '@siemens/element-icons';
import {
  SiApplicationHeaderComponent,
  SiHeaderAccountItemComponent,
  SiHeaderActionsDirective,
  SiHeaderBrandDirective,
  SiHeaderLogoDirective,
} from '@siemens/element-ng/application-header';
import {
  SiHeaderDropdownComponent,
  SiHeaderDropdownTriggerDirective,
} from '@siemens/element-ng/header-dropdown';
import { addIcons } from '@siemens/element-ng/icon';
import { NavbarVerticalItem, SiNavbarVerticalComponent } from '@siemens/element-ng/navbar-vertical';

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
    RouterOutlet,
    SiNavbarVerticalComponent,
    SiHeaderActionsDirective,
    SiHeaderAccountItemComponent,
    SiHeaderDropdownComponent,
    SiHeaderDropdownTriggerDirective,
    SiApplicationHeaderComponent,
    SiHeaderBrandDirective,
    SiHeaderLogoDirective,
  ],
  templateUrl: './main.html',
  host: {
    class: 'has-navbar-fixed-top si-layout-inner',
  },
})
export class Main {
  protected readonly icons = addIcons({
    elementDashboard,
    elementDocument,
    elementHome,
    elementList,
  });
  protected readonly menuItems: NavbarVerticalItem[] = [
    {
      type: 'router-link',
      label: 'NAV.GET-STARTED',
      id: 'get-started',
      icon: this.icons.elementHome,
      routerLink: 'get-started',
    },
    {
      type: 'router-link',
      label: 'NAV.FORMS',
      id: 'forms',
      icon: this.icons.elementDocument,
      routerLink: 'forms',
    },
    {
      type: 'router-link',
      label: 'NAV.CHARTS',
      id: 'charts',
      icon: this.icons.elementDashboard,
      routerLink: 'charts',
    },
    {
      type: 'router-link',
      label: 'NAV.GRIDS',
      id: 'grids',
      icon: this.icons.elementList,
      routerLink: 'grids',
    },
  ];
}
