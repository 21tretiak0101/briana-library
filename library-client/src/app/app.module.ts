import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import { ReaderPageComponent } from './reader-page/reader-page.component';
import { StaticPageComponent } from './static-page/static-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    ReaderPageComponent,
    StaticPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
