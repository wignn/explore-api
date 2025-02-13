

export class CreateBookmarkRequest {
    bookId: string;
    userId: string;
}

export class CreateBookmarkResponse {
    id: string;
    bookId: string;
    userId: string;
}

export class DeleteBookmarkRequest {
    id: string;
}

export class GetBookmarkRequest {
    userid: string;
    bookid: string;
}

export class GetBookmarkResponse {
    id: string;
    bookId: string;
    userId: string;
}

