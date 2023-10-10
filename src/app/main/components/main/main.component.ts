
import { Component, computed, effect, OnInit, signal } from '@angular/core';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Hero } from '../../interfaces/hero.interface';
import { MainService } from '../../services/main.service';
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
  providers: [MainService,MessageService, ConfirmationService, DialogService]
})
export class MainComponent implements OnInit{
    arr_heros!: Hero[];
    hero!: Hero;
    selectedHeros!: Hero[] | null;
    submitted: boolean = false;
  
    exportColumns!: ExportColumn[];
    dinamicDialogRef: DynamicDialogRef | undefined;
    cols: Column[] = [
      { field: 'name', header: 'Name'},
      { field: 'description', header: 'Description' },
      { field: 'gear', header: 'Gear' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Rating' }
    ];
    loadingHeroTable = false;
    villansSignal = signal<any>('');
    villansHerosComputedChange: any;
    herosVillans: string = 'Heros';
    constructor(
      private mainService: MainService, 
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      public dialogService: DialogService
      ) {
        this.villansHerosComputedChange = computed(() => this.villansSignal());
        effect(() => {
          if(this.villansHerosComputedChange() == 'Heros') {
            this.onGetHeros('villans');  
          }else {
            this.onGetHeros();  
          }
        });
      }

ngOnInit(): void {
  // this.slidersSignal.set(true);
  this.onGetHeros();
  this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

  this.mainService.getHerosById(1).subscribe(res => {
    console.log(res);
  });

  this.mainService.getHeroData().subscribe((res) => {
        console.log(res);
  });

}

onGetVillans(mode:string) {
  this.villansSignal.set(mode);
}

onGetHeros(mode?:string) {
  this.arr_heros = [];
  this.loadingHeroTable = true;
  this.herosVillans = mode == 'villans' ? this.herosVillans = 'Villans' : this.herosVillans = 'Heros';
  
  
  this.mainService.getHeroData(mode).subscribe((res: any) => {
    console.log(res);
    var arr_temp = [];
    if(res) {
      for(let hero of res) {
        arr_temp.push(hero);
      }
      this.arr_heros = arr_temp;
    
    }
    this.loadingHeroTable = false;
  });


  
}


openEditNewHeroDialog(hero?:Hero) {
  this.hero = {};
  this.submitted = false;

  this.dinamicDialogRef = this.dialogService.open(NewHeroDialogComponent, {
    height: '70vh',
    maximizable: false,
    data: {
         hero: hero,
         mode: hero?.id ? 'edit hero' : 'new hero',
         villans: this.herosVillans.toLowerCase()
     },
       header: hero?.id ? 'Edit ' + this.herosVillans.slice(0, -1) : 'Create a new ' + this.herosVillans.slice(0, -1)
     });

     this.dinamicDialogRef.onClose.subscribe((data: any) => {
      if(typeof data?.hero !== 'undefined') {
        if (data?.mode == 'new hero') {
          this.messageService.add({ severity: 'success', summary: 'Ok', detail: this.herosVillans.slice(0, -1) + ' ' + data.hero.name + ' Saved'});
          this.addHero(data?.hero);
      }else {
          
          this.updateHero(data.hero);
      } 
   }
     
  });

//  this.HeroDialog = true;
}

addHero(hero:Hero) {
  this.arr_heros.unshift(hero);
}


updateHero(hero:Hero) {
 
  const index = this.arr_heros.findIndex(f => f.id === hero.id);
    
    if(index !== -1) {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.herosVillans.slice(0, -1) +' Updated', life: 3000 });
      this.arr_heros[index] = hero;
    }
    
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



onGetSeverity(status: string) {

return this.mainService.getSeverity(status);
 
}


deleteSelectedHeros() {
  
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected ' +this.herosVillans+ '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.arr_heros = this.arr_heros.filter((val) => !this.selectedHeros?.includes(val));
          this.selectedHeros = null;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.herosVillans.slice(0, -1)+' Deleted', life: 3000 });
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
          this.messageService.add({ severity: 'success', summary: 'Successful', detail:  this.herosVillans.slice(0, -1) + ' Deleted', life: 3000 });
      }
  });
}



/*
exportPdf() {
  var currentDate = moment().format('DD-MM-YYYY');
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  const doc = new jsPDF('portrait', 'px', 'a4');
    var temparr:any = [];   
  this.arr_heros.map(m => {
          temparr.push(m);
    })
    
  autoTable(doc, {columns: this.exportColumns , body: temparr });
  doc.save('products.pdf');
}
*/

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




