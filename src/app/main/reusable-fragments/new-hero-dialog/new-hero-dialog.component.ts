import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Hero } from '../../interfaces/hero.interface';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-new-hero-dialog',
  templateUrl: './new-hero-dialog.component.html',
  styleUrls: ['./new-hero-dialog.component.css']
})
export class NewHeroDialogComponent implements OnInit {
  Heros!: Hero[];
  hero!: Hero;
  submitted: boolean = false;
  heroForm!:FormGroup;
  statuses: any[] = [
    "success", 
    "info",
    "warning",
    "danger"
  ];

  arr_category_options: any[] = [
    {id: 1, label: "Melee"},
    {id: 2, label: "Speedster"},
    {id: 3, label: "Ranged"},
    {id: 4, label: "Caster"},
    {id: 5, label: "Other"}
  ];

  selCategory:any = {id: 1, label: "Melee"}
  testBind!:any;
  mode: string = 'new hero';
  selAutoComplete!: any;
  arr_autoCompleteOpt: any[] = [];
  arr_heros!: Hero[];
 
  constructor(
    private messageService: MessageService, 
    public mainService: MainService, 
    public dynamicDialogRef: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig
    ) {
    
  }

  ngOnInit(): void {
      this.createForm();
      if(this.dialogConfig.data.mode == 'edit hero') {
        this.mode = this.dialogConfig.data.mode;
        this.loadHeroData(this.dialogConfig.data.hero);
      }
      console.log(this.dialogConfig.data.villans);
      this.onGetHeros(this.dialogConfig.data.villans);
  }

  onGetHeros(mode?: string) {
    this.mainService.getHeroData(mode).subscribe((res: any) => {
      var arr_temp = [];
      if(res) {
        for(let hero of res) {
          arr_temp.push(hero);
        }
        this.arr_heros = arr_temp;
      
      }
    });
  }


  onAutocompleteChange(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.arr_heros as Hero[]).length; i++) {
      let hero = (this.arr_heros as Hero[])[i];
      const hasSymbols = /[-!@#$%^&*()]/.test(hero.name!);
      if(hasSymbols) {
       var outputText = hero?.name!.replace(/-/g, " ");
        if (outputText?.toUpperCase().includes(query.toUpperCase())) filtered.push(hero);
      }else {
        if (hero.name?.toUpperCase().includes(query.toUpperCase())) filtered.push(hero);
      }
       
  }
    this.arr_autoCompleteOpt = filtered;
}
  onSelectAutoCompleteHero(event:any) {
      var name = event.name;
      this.heroForm.controls['name'].patchValue(name);
  }



  createForm() {
    this.heroForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      gear: new FormControl(''),
      category:  new FormControl('Melee', [Validators.required]),
      rating:  new FormControl('', [Validators.required] )
    });
  }

  loadHeroData(hero: Hero) {
    this.heroForm.controls['id'].patchValue(hero?.id);
    this.heroForm.controls['name'].patchValue(hero?.name);
    this.selAutoComplete = hero;
    
    this.heroForm.controls['description'].patchValue(hero?.description);
    this.heroForm.controls['gear'].patchValue(hero?.gear);
    this.heroForm.controls['category'].patchValue(hero?.category);
    var categoryFound = this.arr_category_options.find(f => f.label == hero?.category)
    this.selCategory = categoryFound;
    this.heroForm.controls['rating'].patchValue(hero?.rating);
   
  }


  onSaveNewHero() {
    if(this.mode == 'edit hero') {
      this.dynamicDialogRef.close({mode: 'edit hero', hero: this.heroForm.value});
    }else {
      const newId = this.createId();
      this.heroForm.controls['id'].patchValue(newId);
      this.dynamicDialogRef.close({mode: 'new hero', hero: this.heroForm.value});
    }
 
  }
 
  onGetSeverity(status: string) {
      return this.mainService.getSeverity(status);
  }

  onChangeCategory(event: any) {
        
        this.selCategory = event.value;
        this.heroForm.controls['category'].patchValue(this.selCategory?.label);
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  
 

}
