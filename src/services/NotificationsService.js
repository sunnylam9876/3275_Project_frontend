import http from "../http-common.js";

class NotificationService {
    postNotification(title, content, userId) { 
        // Create a JSON body
        const data = { 
            userId: userId, 
            message: message, 
            creatorId: creatorId, 
            createdTime: createdTime 
        } ;

        // Send a POST request
        return http.post('/api/notifications', data);
    }

    getNotifications(userId) {
        return http.get(`/api/notifications/${userId}`);
    }

}

export default new ArticleService();