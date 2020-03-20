import {Part} from './part';
import {Image} from './image';

export interface Chapter {
  id: number;
  bookId: number;
  title: string;
  images: [Image];
  parts: [Part];
}
