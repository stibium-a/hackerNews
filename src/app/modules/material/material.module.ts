import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';

/* Modules of Angular Material, plugged in into components */
const material:any = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatTooltipModule,
  MatDividerModule,
  MatBadgeModule
];

@NgModule({
  imports: [ material ],
  exports: [ material ]
})
export class MaterialModule { }
