import http from "../http-common.js";

class RegisterService {

    register(userName, password, role, status) { 
        // Create a JSON body
        const data = {
            username: userName,
            password: password,
            role: role,
            status: status
        };

        //console.log(data.username);
        //console.log(data.password);

        // Send a POST request
        return http.post("/users/register", data);
    }
    
}

export default new RegisterService();
