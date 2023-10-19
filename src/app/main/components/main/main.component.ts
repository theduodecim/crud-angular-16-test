
import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Hero } from '../../interfaces/hero.interface';
import { MainService } from '../../services/main.service';
import * as FileSaver from 'file-saver';
import { Column, ExportColumn } from '../../interfaces/export-column.interface';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import * as moment from 'moment'; 
import { Table } from 'primeng/table';
import { NewHeroDialogComponent } from 'src/app/main/reusable-fragments/new-hero-dialog/new-hero-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

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
    totalRecords!:any;
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
    languageBind: any;

    constructor(
      private mainService: MainService, 
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      public dialogService: DialogService,
      public translateService: TranslateService
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
  this.languageBind = this.translateService.getDefaultLang();
  this.onGetHeros();
  this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
}


onChangeLanguages(e: DropdownChangeEvent) {
  var language = e.value;
  this.translateService.use(language);

}

onGetVillans(mode:string) {
  this.villansSignal.set(mode);

}

onGetHeros(mode?:string) {
  this.arr_heros = [];
  this.loadingHeroTable = true;
  this.herosVillans = mode == 'villans' ? this.herosVillans = 'Villans' : this.herosVillans = 'Heros';
  
  
  this.mainService.getHeroData(mode).subscribe((res: any) => {

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


getTranslation(key: string): string {
  return this.translateService.instant(key);
}

getVillanoHero() {
  var villanoHero;
  if(this.herosVillans == 'Heros') {
    villanoHero  = this.getTranslation('MAIN.btn_hero');
  }else {
    villanoHero =  this.getTranslation('MAIN.btn_villans'); 
  }
  return villanoHero;
}



openEditNewHeroDialog(hero?:Hero) {
  this.hero = {};
  this.submitted = false;

  var createHero = this.getTranslation('NEWHERO_DIALOG.dialog_title_create');
  var editHero= this.getTranslation('NEWHERO_DIALOG.dialog_title_edit');
 
  var villanoHero = this.getVillanoHero();

 
  this.dinamicDialogRef = this.dialogService.open(NewHeroDialogComponent, {
    height: '75vh',
    maximizable: false,
    data: {
         hero: hero,
         mode: hero?.id ? 'edit hero' : 'new hero',
         villans: this.herosVillans.toLowerCase()
     },
       header: hero?.id ? editHero + villanoHero.slice(0, -1) : createHero + villanoHero.slice(0, -1)
     });
     this.dinamicDialogRef.onClose.subscribe((data: any) => {
      if(typeof data?.hero !== 'undefined') {
        if (data?.mode == 'new hero') {
          this.addHero(data?.hero);
      }else {
          this.updateHero(data.hero);
      } 
   }
     
  });
}
addHero(hero:Hero) {
  this.loadingHeroTable = true;
    var heroVillan = this.getVillanoHero();
    var addString =  this.getTranslation('MAIN.add_message');


  this.mainService.addHero(hero).subscribe({
    next: () => {
        this.messageService.add({ severity: 'success', summary: addString, detail: heroVillan.slice(0, -1) + ' ' + hero.name + addString});
        this.arr_heros.unshift(hero);
        this.loadingHeroTable = false;
      },
    error: (err) => {
      
       this.loadingHeroTable = false;
    }
  });

}


updateHero(hero:Hero) {
  this.loadingHeroTable = true;
  const index = this.arr_heros.findIndex(f => f.id === hero.id);
    var heroVillan = this.getVillanoHero();
    var updateString =  this.getTranslation('MAIN.edit_message');


    if(index !== -1) {
      this.mainService.updateHero(hero!).subscribe({
        next: () => {
            this.messageService.add({ severity: 'success', summary: updateString, detail: heroVillan.slice(0, -1) + updateString, life: 3000 });
            this.arr_heros[index] = hero;
            this.loadingHeroTable = false;
          },
        error: (err) => {
          
          this.loadingHeroTable = false;
        }
      });
    }
}
onGetSeverity(status: string) {
    return this.mainService.getSeverity(status);
}
deleteSelectedHeros() {
  var confirmMessage = this.getTranslation('MAIN.confirm_message');
  var confirmMessageTitle = this.getTranslation('MAIN.confirm_message_title');
  var villanoHero = this.getVillanoHero();
  var delete_message = this.getTranslation('MAIN.delete_message');


  this.confirmationService.confirm({
      message: confirmMessage + villanoHero + '?',
      header: confirmMessageTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.arr_heros = this.arr_heros.filter((val) => !this.selectedHeros?.includes(val));
        this.messageService.add({ severity: 'success', summary: delete_message, detail: villanoHero.slice(0, -1)+ delete_message, life: 3000 });
        this.selectedHeros = null; 
      }
  });
}

exportExcel() {
  var villanoHero = this.getVillanoHero();
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.arr_heros);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, villanoHero);
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




