import { Injectable } from '@angular/core';
import {BOOKS_URL} from '../../environments/environment';
import * as parser from 'angular-html-parser'

@Injectable({
  providedIn: 'root'
})
export class ImageEditorService {

  private REG_EXP: RegExp = /<myimg.*>/g;

  constructor() {}

  public replaceImages(bookId: number, content: string): string {

    const myImages: string[] = content.match(this.REG_EXP);

    if (myImages === null || myImages.length === 0) return content;

    myImages.forEach( myImg => {
      const attrs: string[] = parser.parse(myImg).rootNodes[0]['attrs'];

      const src: string = attrs[0]['value'];
      const style: string = attrs.length > 1 ? attrs[1]['value'] : '';

      const path: string = `${BOOKS_URL}/${bookId}/сontent/${src}`;
      const realImg: string = `<img src="${path}" alt="${src}" style="${style}"/>`;

      content = content.replace(myImg, realImg);
      console.log(realImg);
    });

    return content;
  }
}
