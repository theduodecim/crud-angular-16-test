import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AccordionModule,
    AutoCompleteModule,
    TableModule,
    SelectButtonModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    ToolbarModule,
    TooltipModule,
    DialogModule,
    RadioButtonModule,
    DynamicDialogModule,
    RatingModule,
    TagModule,
    ToastModule,
    CardModule,
    DropdownModule
  ],
  exports: [
    BrowserModule,
    AccordionModule,
    AutoCompleteModule,
    TableModule,
    SelectButtonModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    ToolbarModule,
    TooltipModule,
    DialogModule,
    RadioButtonModule,
    DynamicDialogModule,
    RatingModule,
    TagModule,
    ToastModule,
    CardModule,
    DropdownModule
  ]
})
export class PrimeNGModule { }
