import http from "../http-common.js";

class CommentServices {

    getCommentsByArticleId(articleId) {
        return http.get(`/comments/article/${articleId}`);
    }

    createComment(commentData) {
        return http.post('/comments', commentData);
    }

    updateComment(commentId, content) {
        const data = {
            content: content,
        };        
        return http.put(`/comments/${commentId}`, data);
    }

    deleteComment(commentId){
        return http.delete(`/comments/${commentId}`);
    }

}

export default new CommentServices();