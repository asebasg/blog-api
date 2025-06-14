export class CreateCommentDto {
  content: string;
  published: boolean;
  postId: number;
  authorId: number;
}