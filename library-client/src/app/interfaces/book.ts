import {Content} from './content';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  content: Content[];
}
