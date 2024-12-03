import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ]
})
export class HomeModule { }
