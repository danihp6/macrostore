import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ShoppingCardComponent } from "macrostore-lib";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    ShoppingCardComponent,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ]
})
export class HomeModule { }
