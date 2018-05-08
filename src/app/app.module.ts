import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestaurantsModule } from './restaurants/restaurant.module';
import {HttpModule} from '@angular/http';
import { AppHttpService } from './app-http.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RestaurantsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppHttpService, //Todos os services têm de ser registados nos providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
