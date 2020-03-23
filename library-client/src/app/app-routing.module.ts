import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {ReaderPageComponent} from './reader-page/reader-page.component';
import {ContactsPageComponent} from './contacts-page/contacts-page.component';


const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: 'reader/:id', component: ReaderPageComponent},
  {path: 'contacts', component: ContactsPageComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: '**', redirectTo: '/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
