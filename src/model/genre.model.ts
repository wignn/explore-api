export class CreateGenreRequest {
  title: string;
  description: string;
}

export class CreateGenreResponse {
  id: string;
  title: string;
  description: string;
}

export class UpdateGenreRequest {
  title?: string;
  description?: string;
}

export class UpdateGenreResponse {
  id: string;
  title: string;
  description: string;
}

export class GetGenreResponse {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class DeleteGenreRequest {
  id: string;
}

export class ConnectGenreRequest {
  genreId: string;
  bookId: string;
}

export class DisconnectGenreRequest {
  genreId: string;
  bookId: string;
}


export class BookGenreResponse {
  bookId: string;
  genreId: string;
}

export class BookGenreRequest {
  bookId: string;
  genreId: string;
}


export class GenreBookListResponse {
  genreId: string;  // Seharusnya satu string, bukan array
  bookId: string[]; // Karena hasil dari map() adalah array
}
