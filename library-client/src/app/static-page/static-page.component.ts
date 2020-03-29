import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {ContentService} from '../services/content.service';
import {ImageEditorService} from '../services/image-editor.service';

@Component({
  selector: 'app-static-page',
  template: `
    <div class="container text-justify mt-3" *ngIf="pageContent">
      <div class="row">
        <div class="col-md-8 col-md-12">
          <div [innerHTML]="pageContent | safeHtml"></div>
        </div>
      </div>
    </div>
  `
})
export class StaticPageComponent implements OnInit {

  public pageContent: string = '';

  constructor(private contentService: ContentService,
              private route: ActivatedRoute,
              private imageEditorService: ImageEditorService,
              private titleService: Title ) { }

  ngOnInit(): void {
    this.route.url.subscribe( value => {
      this.getStaticContentByPageName(value[0].path);
    })
  }

  getStaticContentByPageName(pageName: string): void {
    this.contentService.getStaticContentByPageName(pageName).subscribe( content => {
      this.pageContent = this.imageEditorService.replaceImages(content);
      this.setTitle();
    })
  }

  public setTitle() {
    const newTitle = this.contentService.staticTitle;
    this.titleService.setTitle( newTitle );
  }
}
