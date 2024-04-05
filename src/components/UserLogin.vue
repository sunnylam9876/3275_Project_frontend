<template>
    <div>
        <h4>Login</h4>
        <form>
            <div>
                <label for="userId">User ID:</label>
                <input type="type" id="userId" v-model="userLoginRequest.userId"/>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="userLoginRequest.password"/>
            </div>
            <div>
                <button type="submit" @click="login">Login</button>
            </div>
            
        </form>
            
        <p>{{message}}</p>
    </div>
</template>

<script>
    import LoginService from "../services/LoginService";

    export default {
    name: "userLogin",
    data() {            // data or variables used
        return {
            userLoginRequest: { userId: "", password: "" },  // json
            message: ""
        };
    },
    methods: {
        login(event) {
            event.preventDefault();
            LoginService.login(this.userLoginRequest)
                .then(response => {       // HttpStatus.OK
                    var user = response.data;
                    console.log(user);                    
                    localStorage.setItem("uid", user.id);
                    this.message=student;

                    //this.$router.push({ name: "studentProfile" });
                })
                .catch(e => {
                    this.userLoginRequest.userId = "";
                    this.userLoginRequest.password = "";
                    this.message = e.response.data.message;
                    console.log(e.response.data);
                });
        }
    },
    mounted() {   // called when component is loaded
        this.message = "";
    }
};
    
</script>

<style>

</style>