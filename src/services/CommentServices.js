import http from "../http-common.js";

class CommentServices {

    getCommentsByArticleId(articleId) {
        return http.get(`/comments/article/${articleId}`);
    }

    createComment(commentData) {
        return http.post('/comments', commentData);
    }
}

export default new CommentServices();