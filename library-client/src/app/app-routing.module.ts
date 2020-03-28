import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReaderPageComponent} from './reader-page/reader-page.component';
import {StaticPageComponent} from './static-page/static-page.component';


const routes: Routes = [
  { path: 'main', component: StaticPageComponent},
  { path: 'reader/:id', component: ReaderPageComponent},
  { path: 'reader/:id/:path', component: ReaderPageComponent},
  { path: 'contacts', component: StaticPageComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: '**', redirectTo: '/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
