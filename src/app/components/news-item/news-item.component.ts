import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { commonArray } from 'src/app/models/paramsHolder';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit, OnDestroy {

  arrayOfNews: any[] = commonArray;
  arrayOfComments: any[] = [];
  arrayOfSubComments: any[] = [];

  newsElement: any;
  newsId: any;
  commentsCount: number = 0;
  btntitle: string = 'See answers';
  
  isCommentsPresent: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit() {

    this.getNewsArticle();
    this.commentsCount = this.defineCommentsCount(this.newsElement.kids);
  
    this.isCommentsPresent = this.newsElement.kids ? true : false;

    this.newsElement.kids ?  (this.getComments(this.newsElement.kids, this.arrayOfComments)) : 0;
    window.scrollTo(0, 0);
  
  }

  ngOnDestroy(): void {

    this.arrayOfSubComments = [];
  }
 /* Display replies for comments for article and changing title of button swithing replies */
  async showAnswers(comment: any, commentContainer: HTMLDivElement){

    const subCommentsArea = document.getElementById(commentContainer.children[1].id);
    subCommentsArea?.classList.toggle('hide');

    const subCommentsButton = document.getElementById(commentContainer.children[0].children[1].children[1].id);
    subCommentsButton!.innerText = subCommentsArea?.className.includes('hide') ? 'See answers' : 'Hide answers';

    await this.getSubComments(comment, comment.kids, this.arrayOfSubComments);

  }

  /* Receiving array of objects with data replies for comment to article */
  async getSubComments(comment:any, subcommentsIDsArray: any, resultArray:any){

    const serviceArray = [];

    for (let subComment of subcommentsIDsArray) {
      const res = await this.httpService.getList(subComment);

      serviceArray.push(res);
    }

    !this.checkArrayPresent(resultArray, comment) ? 
    resultArray.push(
      {
        id: comment.id,
        content:serviceArray
      }
    ) : 0;
  }

  /* Checking of existence object in array */
  checkArrayPresent(array:any, parametr:any){
    return array.some((arr:any) => arr.id == parametr.id);
  }

  /* Choosing array with replies for display */
  chooseArrayOfSubcomments(comment: any){
    
    if (this.checkArrayPresent(this.arrayOfSubComments, comment)){
      const array = this.arrayOfSubComments.filter((elem:any)=> elem.id == comment.id);
    
      return array[0].content || [{}];

    } else {
      return [{}];
    }
  }

  /* Reseiving array with objects storing data of comments for article */
  async getComments(commentsIdArray:any, outputArray:any){
  
      for (let comment of commentsIdArray) {
        const res = await this.httpService.getList(comment);
  
        outputArray.push(res);
      }
  }

  /* Seting count of comments for article */
  defineCommentsCount(kidsArray:any){
    
    let amountOfKids: number = 0;
  
    return  amountOfKids = kidsArray ? kidsArray.length : 0;
  }

  /* Reseiving data fom display article from route */
  getNewsArticle() {

    this.newsId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.newsElement = this.arrayOfNews.find((elem: any) => elem.id === this.newsId);

  }
}
