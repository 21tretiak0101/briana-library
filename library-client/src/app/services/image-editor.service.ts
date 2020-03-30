import { Injectable } from '@angular/core';
import * as parser from 'angular-html-parser'

import {BOOKS_URL, STATIC_URL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageEditorService {
  /**
   * This service works with content images.
   * It replaces all relative paths with absolute ones
   */
  private REG_EXP: RegExp = /<img.*>/g;

  private URL: string = STATIC_URL;

  constructor() {}

  public replaceImages(content: string, bookId?: number): string {

    const oldImages: string[] = content.match(this.REG_EXP);

    if (oldImages === null || oldImages.length === 0) return content;

    oldImages.forEach( oldImg => {
      const attrs: string[] = parser.parse(oldImg).rootNodes[0]['attrs'];

      const src: string = attrs[0]['value'];
      const style: string = attrs.length > 1 ? attrs[1]['value'] : '';

      if(bookId) this.URL = `${BOOKS_URL}/${bookId}`;

      const path: string = `${this.URL}/${src}`;
      const newImg: string = `<img src="${path}" alt="${src}" style="${style}">`;

      content = content.replace(oldImg, newImg);
    });

    return content;
  }
}
