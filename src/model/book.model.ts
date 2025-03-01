import { chapterResponse } from "./chapter.model";
import { GetGenreResponse } from "./genre.model";

export class CreateBookRequest {
  cover: string;
  title: string;
  author: string;
  description: string;
  status: BookStatus;
  language: Language;
  realaseDate: number;
}

enum Language {
  English = "English",
  Japanese = "Japanese",
  Korean = "Korean",
}

enum BookStatus {
  Completed = "Completed",
  Drop = "Drop",
  Ongoing = "Ongoing",
}
export class CreateBookResponse {
  id: string;
  title: string;
  author: string;
  cover: string;
  status: string;
  language: string;
  realaseDate: number;
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
  status?: BookStatus;
  language?: Language;
  realaseDate?: number;
}


export class UpdateBookResponse {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  asset: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  language: string;
  realaseDate: number;
}
