import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { pseudoResponce } from '../models/paramsHolder';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /* Receie list of article`s ID */
  getNewsIdsList(){

    return this.http.get(' https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');   
   
  }

  /* Receive list of objects with article`s data */
  getList = async (articleId:number): Promise<any> => {
    
      const responce = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`);
    
      if(!responce.ok){
      
        pseudoResponce.title = `Error: ${responce.statusText} 
        URL: ${responce.url}`;
                
        return pseudoResponce;
  
      } else {
        
        return await responce.json();
        
      }   
  }
}
