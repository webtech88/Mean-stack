import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { ItemManagementComponent } from './item-management.component';
import { ItemCategoryComponent } from './item-category/item-category.component';
import { ItemTypeComponent } from './item-type/item-type.component';

const itemManagementRouting = [
  {
    path: '',
    component: ItemManagementComponent,
    children: [
      { path: '', redirectTo: 'category', terminal: true },
      { path: 'category', component: ItemCategoryComponent },
      { path: 'type', component: ItemTypeComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(itemManagementRouting);
