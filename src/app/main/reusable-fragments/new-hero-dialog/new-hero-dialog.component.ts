import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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

  selCategory:any = {id: 5, label: "Other"}
  testBind!:any;
  mode: string = 'new hero';
  constructor(
    private messageService: MessageService, 
    public mainService: MainService, 
    public dynamicDialogRef: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig
    ) {
    
  }

  ngOnInit(): void {
      this.createForm();
      console.log(this.dialogConfig.data);
      if(this.dialogConfig.data.mode == 'edit hero') {
        this.mode = this.dialogConfig.data.mode;
        this.loadHeroData(this.dialogConfig.data.hero);
      }
  }

  createForm() {
    this.heroForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      gear: new FormControl(''),
      category:  new FormControl('', [Validators.required]),
      rating:  new FormControl('', [Validators.required] )
    });
  }

  loadHeroData(hero: Hero) {
    this.heroForm.controls['id'].patchValue(hero?.id);
    this.heroForm.controls['name'].patchValue(hero?.name);
    this.heroForm.controls['description'].patchValue(hero?.description);
    this.heroForm.controls['gear'].patchValue(hero?.gear);
    this.heroForm.controls['category'].patchValue(hero?.category);
    var categoryFound = this.arr_category_options.find(f => f.label == hero?.category)
    this.selCategory = categoryFound;
    this.heroForm.controls['rating'].patchValue(hero?.rating);
  }


  onSaveNewHero() {
    if(this.mode == 'edit hero') {
      console.log(this.dialogConfig.data)
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
        console.log(event.value);
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
