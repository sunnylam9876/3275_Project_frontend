import http from "../http-common.js";

class ArticleService {
    uploadArticle(title, content, userId) { 
        // Create a JSON body
        const data = {
            title: title,
            content: content,
            userId: userId
        };

        // Send a POST request
        return http.post('/articles', data);
    }

    getAllArticles() {
        // Send a GET request to API
        return http.get('/articles');
    }

    getArticlesbyUserId(userId) {
        //console.log(userId);
        return http.get(`/articles/user/${userId}`);
    }

    deleteArticle(articleId) {
        // Send a DELETE request to API
        return http.delete(`/articles/${articleId}`);
    }

    updateArticle(title, content, userId, articleId) {
        // Create a JSON body
        const data = {
            title: title,
            content: content,
            userId: userId
        };

        // Send a PUT request
        return http.put(`/articles/${articleId}`, data);
    }

    updateArticleCount(articleId) {
        return http.put(`/articles/count/${articleId}`);
    }
}

export default new ArticleService();
