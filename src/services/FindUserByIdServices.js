import http from "../http-common.js";

class FindUserByIdServicesrvices {

    findUserById(userId) {
        return http.get(`/${userId}`);
    }

}

export default new FindUserByIdServices();