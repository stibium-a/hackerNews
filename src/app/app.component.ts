import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './services/http.service';
import { takeWhile } from 'rxjs';
import { commonArray, pseudoResponce } from './models/paramsHolder';
import { PassDataService } from './services/pass-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'hackerNews';

  isHttpAlive: boolean = true;
  endOfReseiving:boolean = false;
  searchInputValue: string = '';

  arrayOfArticlesId: any[] = [];
  articlesCount: number = 50;

  constructor(
    private httpService: HttpService,
    private passDataService: PassDataService
  ) { }

  ngOnInit() {

    this.getTotalListOfNewsId();
  }

  ngOnDestroy(): void {
    this.isHttpAlive = false;    
  }

  /* Getting list of articles ID`s  */
  getTotalListOfNewsId() {

    this.endOfReseiving = true;

    this.httpService.getNewsIdsList()
      .pipe(takeWhile(() => this.isHttpAlive))
      .subscribe(newsListResponce => (this.defineCountOfNewsInArray(newsListResponce, this.articlesCount)));
  }

  /* Define count of articles wants to get  */
  defineCountOfNewsInArray(news: any, count: number) {

    this.arrayOfArticlesId = news;
    this.arrayOfArticlesId.length = count;
    this.newsListing(this.arrayOfArticlesId);
    
  }

  /* receiving objects with articles data  */
  async newsListing(news: any) {

    for (let element of news) {
      const res = await this.httpService.getList(element)
      .catch(e=> {
        pseudoResponce.title = e;
      return pseudoResponce});
      commonArray.push(res);
    }
    this.endOfReseiving = false;
  }

  /* Passing out to passDataService value for search articles by title  */
  setSearchNewsValue(){
    this.passDataService.defineStringValue(this.searchInputValue);    
  }

  /* Update list of articles  */
  refreshNewsList(){

    this.searchInputValue = '';
    
    this.passDataService.defineStringValue('');
    
    this.arrayOfArticlesId = [];
    commonArray.splice(0, commonArray.length);

    this.getTotalListOfNewsId();
   
  }

}


