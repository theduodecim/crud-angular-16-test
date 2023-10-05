
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import * as FileSaver from 'file-saver';

import { Column, ExportColumn } from '../../interfaces/export-column.interface';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
//import { NewHeroDialogComponent } from '../../reusable-fragments/new-hero-dialog/new-hero-dialog.component';
import * as moment from 'moment'; 
import { Table } from 'primeng/table';
import { NewHeroDialogComponent } from 'src/app/main/reusable-fragments/new-hero-dialog/new-hero-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [HeroService,MessageService, ConfirmationService, DialogService]
})
export class MainComponent implements OnInit{


    arr_heros!: Hero[];
   

    hero!: Hero;

    selectedHeros!: Hero[] | null;

    submitted: boolean = false;

    statuses!: any[];

    cols!: Column[];

    exportColumns!: ExportColumn[];
    dinamicDialogRef: DynamicDialogRef | undefined;
  
    constructor(
      private HeroService: HeroService, 
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      public dialogService: DialogService
      ) {}

ngOnInit(): void {
  this.HeroService.getHeroData().subscribe((res: any) => {
    console.log(res);
    var arr_temp = [];
    if(res) {
      for(let hero of res) {
        arr_temp.push(hero);
      }
      this.arr_heros = arr_temp;
    }
  });
  this.cols = [
    { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' }
  ];

  this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
}


show() {
  /*

      */
}

openNew() {
  this.hero = {};
  this.submitted = false;
  console.error('checkear esto');
  this.dinamicDialogRef = this.dialogService.open(NewHeroDialogComponent, {
    data: {
         id: '51gF3'
     },
       header: 'Create a new Hero'
     });


//  this.HeroDialog = true;
}





editHero(hero: Hero) {
  this.hero = { ...hero };
// this.HeroDialog = true;
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}



getSeverity(status: string) {
  /*
  switch (status) {
      case 'INSTOCK':
          return 'success';
      case 'LOWSTOCK':
          return 'warning';
      case 'OUTOFSTOCK':
          return 'danger';
  }
  */
}


deleteSelectedHeros() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Heros?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.arr_heros = this.arr_heros.filter((val) => !this.selectedHeros?.includes(val));
          this.selectedHeros = null;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Heros Deleted', life: 3000 });
      }
  });
}

deleteHero(Hero: Hero) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + Hero.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.arr_heros = this.arr_heros.filter((val) => val.id !== Hero.id);
          this.hero = {};
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Hero Deleted', life: 3000 });
      }
  });
}




exportPdf() {
  var currentDate = moment().format('DD-MM-YYYY');
  import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
          const doc = new jsPDF.default('p', 'px', 'a4');
          (doc as any).autoTable(this.exportColumns, this.arr_heros);

          doc.save('heros-' + currentDate + '.pdf');
      });
  });
}

exportExcel() {
  
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.arr_heros);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'heros');
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  var currentDate = moment().format('DD-MM-YYYY');
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + currentDate + EXCEL_EXTENSION);
}

applyFilterGlobal($event:any, stringVal:string, tableEl:Table) {
    tableEl.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
}

}




