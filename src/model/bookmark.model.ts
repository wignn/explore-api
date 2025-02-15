

export class CreateBookmarkRequest {
    bookId: string;
    userId: string;
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

