


export class createChapterRequest {
    title: string;
    bookId: string;
    content: string;
    description: string;
}


export class chapterResponse {
    id: string;
    title: string;
    bookId: string;
    content: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}