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
