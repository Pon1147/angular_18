import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonModule,
  InputModule,
  GridModule,
  UIShellModule,
  TableModule,
  LinkModule,
  LoadingModule,
  NotificationModule,
  SearchModule,
  TabsModule,
  DropdownModule,
  IconModule,
  CheckboxModule,
  TooltipModule,
  DatePickerModule,
  LayerModule,
  RadioModule,
  PopoverModule,
} from 'carbon-components-angular';
import { TableModel } from 'carbon-components-angular';
// import { AppCdsIconService } from './services/cds-icon-service';
@NgModule({
  imports: [
      CommonModule,
    ButtonModule,
    InputModule,
    GridModule,
    ReactiveFormsModule,
    FormsModule,
    UIShellModule,
    TableModule,
    LinkModule,
    LoadingModule,
    NotificationModule,
    SearchModule,
    TabsModule,
    DropdownModule,
    IconModule,
    CheckboxModule,
    TooltipModule,
    DatePickerModule,
    LayerModule,
    RadioModule,
    PopoverModule,
    // Add other common import modules here
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputModule,
    GridModule,
    UIShellModule,
    TableModule,
    FormsModule,
    LinkModule,
    LoadingModule,
    NotificationModule,
    SearchModule,
    TabsModule,
    DropdownModule,
    IconModule,
    CheckboxModule,
    TooltipModule,
    DatePickerModule,
    LayerModule,
    RadioModule,
    PopoverModule,
    // Add other common export modules here
  ],
  // providers: [AppCdsIconService],
})
export class SharedModule {}
