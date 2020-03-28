import { Injectable } from '@angular/core';
import {Content} from '../interfaces/content';

export interface BookTitle {
  title: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class PageViewer {

  private linkList: string[];
  private bookTitles: BookTitle[] = [];

  constructor() { }

  public getNextLink(contentList: Content[], path: string) {
    this.linkList = [];
    this.setLinkList(contentList);
    return this.nextLink(path);
  }

  public getPreviousLink(contentList: Content[], path: string) {
    this.linkList = [];
    this.setLinkList(contentList);
    return this.previousLink(path);
  }

  private setLinkList(contentList: Content[]): void {
    for(let c of contentList) {
      this.linkList.push(c.path);
      this.bookTitles.push({title: c.title, path: c.path})
      if(c.content) this.setLinkList(c.content);
    }
  }

  private previousLink(path: string): string {
    for (let i = 0; i < this.linkList.length; i++) {
      if(this.linkList[i] === path){
        return i === 0
          ? ''
          : this.linkList[i - 1];
      }
    }
    return '';
  }

  private nextLink(path: string): string {
    for (let i = 0; i < this.linkList.length; i++) {
      if(this.linkList[i] === path){
        return i + 1 < this.linkList.length
          ? this.linkList[i + 1]
          : '';
      }
    }
    return '';
  }

  getPageTitleByPath(path): string {
    let title: string = '';
    this.bookTitles.forEach( t => {
      if(t.path === path) title = t.title
    });
    return title;
  }

}
