import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PaginationModule,
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
  HeaderModule,
} from 'carbon-components-angular';
import { RouterLink } from '@angular/router';

// import { AppCdsIconService } from './services/cds-icon-service';
@NgModule({
  imports: [
    HeaderModule,
    PaginationModule,
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
    RouterLink
    // Add other common import modules hereFormsModule
  ],
  exports: [
    HeaderModule,
    PaginationModule,
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
    RouterLink
    // Add other common export modules here
  ],
  // providers: [AppCdsIconService],
})
export class SharedModule {}