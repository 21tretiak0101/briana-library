import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {ReaderPageComponent} from './reader-page/reader-page.component';


const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: 'reader/:id', component: ReaderPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
