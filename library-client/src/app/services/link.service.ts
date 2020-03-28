import { Injectable } from '@angular/core';
import {Content} from '../interfaces/content';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private linkList: string[];

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
    for(let content of contentList) {
      this.linkList.push(content.path);
      if(content.content.length > 0) this.setLinkList(content.content);
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
}
