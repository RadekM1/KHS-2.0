import { z } from "zod";

export const basicCommentSchema = z.object({
    id: z.string(),
    article_slug: z.string(),
    comment: z.string(),
    avatar: z.string(),
    name: z.string(),
    nick_name: z.string(),
    account: z.string()
})


export const commentSchema = basicCommentSchema.extend({
    created: z.date(),
})
export const parsedCommentSchema = basicCommentSchema.extend({
    created: z.string(),
})
export const parsedCommentsSchema = z.array(parsedCommentSchema)

export const commentsSchema = z.array(commentSchema)

export type CommentSchema = z.infer<typeof commentSchema>
export type CommentsSchema = z.infer<typeof commentsSchema>
export type ParsedCommentsSchema = z.infer<typeof parsedCommentsSchema>