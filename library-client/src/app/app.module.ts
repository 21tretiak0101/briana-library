import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import { MainPageComponent } from './main-page/main-page.component';
import { ReaderPageComponent } from './reader-page/reader-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    MainPageComponent,
    ReaderPageComponent,
    ContactsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
