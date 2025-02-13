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
  description: string;
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
