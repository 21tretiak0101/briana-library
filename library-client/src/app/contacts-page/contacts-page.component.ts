import { Component, OnInit } from '@angular/core';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-contacts-page',
  template: `
    <div class="container text-justify mt-3" *ngIf="contactsContent">
      <div class="row">
        <div class="col-md-8 col-md-12">
          <div [innerHTML]="contactsContent | safeHtml"></div>
        </div>
      </div>
    </div>
  `
})
export class ContactsPageComponent implements OnInit {

  public contactsContent: string;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentService.getContactsContent().subscribe( content => {
      this.contactsContent = content;
    })
  }

}
