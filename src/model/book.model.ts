import { chapterResponse } from "./chapter.model";
import { GetGenreResponse } from "./genre.model";

export class CreateBookRequest {
  cover: string;
  title: string;
  author: string;
  description: string;
}

export class CreateBookResponse {
  id: string;
  title: string;
  author: string;
  cover: string;
}


export class BookRes {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  asset: string;
  createdAt: Date;
  updatedAt: Date;
}


export class updateBookRequest {
  title?: string;
  description?: string;
  asset?: string;
  cover?: string;
  author?: string;
}


export class UpdateBookResponse {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  asset: string;

}
