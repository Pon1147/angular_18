import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  
  PaginationModule ,
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
  ModalModule,
  
} from 'carbon-components-angular';

// import { AppCdsIconService } from './services/cds-icon-service';
@NgModule({
  imports: [
    
    PaginationModule ,
    ModalModule,
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
    // Add other common import modules hereFormsModule
  ],
  exports: [
    PaginationModule ,
    ModalModule,
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