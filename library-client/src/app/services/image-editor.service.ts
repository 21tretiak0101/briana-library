import { Injectable } from '@angular/core';
import * as parser from 'angular-html-parser'

import {BOOKS_URL, STATIC_URL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageEditorService {

  private REG_EXP: RegExp = /<myimg.*>/g;

  private URL: string = STATIC_URL;

  constructor() {}

  public replaceImages(content: string, bookId?: number): string {

    const myImages: string[] = content.match(this.REG_EXP);

    if (myImages === null || myImages.length === 0) return content;

    myImages.forEach( myImg => {
      const attrs: string[] = parser.parse(myImg).rootNodes[0]['attrs'];

      const src: string = attrs[0]['value'];
      const style: string = attrs.length > 1 ? attrs[1]['value'] : '';

      if(bookId) this.URL = `${BOOKS_URL}/${bookId}`;

      const path: string = `${this.URL}/${src}`;
      const realImg: string = `<img src="${path}" alt="${src}" style="${style}"/>`;

      content = content.replace(myImg, realImg);
      console.log(realImg);
    });

    return content;
  }
}
