import http from "../http-common.js";

class CommentServices {

    getCommentsByArticleId(articleId) {
        return http.get(`/comments/article/${articleId}`);
    }
}

export default new CommentServices();