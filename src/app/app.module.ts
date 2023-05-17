import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './modules/material/material.module';
import { NewsTapeComponent } from './components/news-tape/news-tape.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpService } from './services/http.service';
import { PassDataService } from './services/pass-data.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsTapeComponent,
    NewsItemComponent,
    ErrorComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [HttpService, PassDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
