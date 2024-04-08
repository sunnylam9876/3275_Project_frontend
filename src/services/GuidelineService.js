import http from "../http-common.js";

class GuidelineService {
    uploadGuideline(content, guidelineId) { 
        // Create a JSON body
        const data = {
            content: content,
            guidelineId: guidelineId
        };

        // Send a POST request
        return http.post('/guidelines', data);
    }

    getAllGuidelines() {
        // Send a GET request to API
        return http.get('/guidelines');
    }

    deleteGuideline(guidelineId) {
        // Send a DELETE request to API
        return http.delete(`/guidelines/${guidelineId}`);
    }

    updateGuideline(content, guidelineId) {
        // Create a JSON body
        const data = {
            content: content,
            guidelineId: guidelineId
        };

        // Send a PUT request
        return http.put(`/guidelines/${guidelineId}`, data);
    }
}

export default new GuidelineService();
