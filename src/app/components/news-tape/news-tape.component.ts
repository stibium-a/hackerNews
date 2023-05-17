import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { commonArray } from 'src/app/models/paramsHolder';
import { PassDataService } from 'src/app/services/pass-data.service';

@Component({
  selector: 'app-news-tape',
  templateUrl: './news-tape.component.html',
  styleUrls: ['./news-tape.component.css']
})
export class NewsTapeComponent implements OnInit, OnDestroy {

  newsArrayOfNewsTapeComp:any[] = commonArray;
  
  isAlive: boolean = true;

constructor(
  private router:Router,
  private passdataService: PassDataService){}

ngOnInit(){
  /* Receiving value for search article from passDataService */
  this.passdataService.stringSearchValue$
  .pipe(takeWhile(()=> this.isAlive))
  .subscribe((value)=> this.filterFunc(value));

 }

 ngOnDestroy(): void {
   this.isAlive = false;
 }

 /* Filtering articles by title */
 filterFunc(value:string){
  
  if(value == ''){
    this.newsArrayOfNewsTapeComp = commonArray;  
  } else{ 
    this.newsArrayOfNewsTapeComp = commonArray;  

    this.newsArrayOfNewsTapeComp = this.newsArrayOfNewsTapeComp.filter(item=> item.title.toLowerCase().includes(value));  
  }

 }
  
}
