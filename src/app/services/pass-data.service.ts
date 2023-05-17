import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {

  /* Value for search articles */
  private stringSearchValue = new Subject<string>();
  stringSearchValue$ = this.stringSearchValue.asObservable();

  constructor() { }

  defineStringValue(str:string){
    this.stringSearchValue.next(str);
  }

}
