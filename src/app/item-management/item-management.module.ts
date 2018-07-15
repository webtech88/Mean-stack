import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemManagementComponent } from './item-management.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { routing } from './item-management.routing';
import { ItemTypeComponent } from './item-type/item-type.component';
import { ItemCategoryComponent } from './item-category/item-category.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    routing
  ],
  declarations: [ItemManagementComponent, ItemTypeComponent, ItemCategoryComponent]
})
export class ItemManagementModule { }
