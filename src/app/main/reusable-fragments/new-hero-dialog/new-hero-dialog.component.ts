import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Hero } from '../../interfaces/hero.interface';

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
  constructor(private messageService: MessageService) {
    
  }

  ngOnInit(): void {
      this.createForm();
  }
  onGetSeverity() {
  
  }

  createForm() {
    this.heroForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      gear: new FormControl('',),
      category:  new FormControl('', ),
      rating:  new FormControl('', ),
    });
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Heros.length; i++) {
        if (this.Heros[i].id === id) {
            index = i;
            break;
        }
    }
  
    return index;
  }

  saveHero() {
    this.submitted = true;
  
    if (this.hero.name?.trim()) {
        if (this.hero.id) {
            this.Heros[this.findIndexById(this.hero.id)] = this.hero;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Hero Updated', life: 3000 });
        } else {
            this.hero.id = this.createId();
          //  this.Hero.image = 'Hero-placeholder.svg';
            this.Heros.push(this.hero);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Hero Created', life: 3000 });
        }
  
        this.Heros = [...this.Heros];
      
        this.hero = {};
    }
  }

}
