import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShoppingCardComponent } from "macrostore-lib";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    CommonModule,
    CarouselModule,
    RouterModule.forChild([
        {
            path: '',
            component: HomeComponent
        }
    ]),
    ShoppingCardComponent
]
})
export class HomeModule { }
