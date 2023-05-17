import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsTapeComponent } from './components/news-tape/news-tape.component';

const routes: Routes = [
  {path:"", component: NewsTapeComponent},
  {path:"itemNews/:id", component: NewsItemComponent},
  {path:"**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
