import {Component, OnInit} from '@angular/core';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-main-page',
  template: `
    <div class="container text-justify mt-3" *ngIf="mainContent">
      <div class="row">
        <div class="col-md-8 col-md-12">
          <div [innerHTML]="mainContent | safeHtml"></div>
        </div>
      </div>
    </div>
  `
})
export class MainPageComponent implements OnInit {

  public mainContent: string;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getMainContent().subscribe( content => {
      this.mainContent = content;
    })
  }
}
