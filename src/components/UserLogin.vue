<template>
    <section class="vh-100 gradient-custom">
        <form @submit.prevent="login">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-80">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-white text-black" style="border-radius: 1rem;">
                            <div class="card-body p-5 text-center">
                                <div class="mb-md-5 mt-md-4 pb-5">
                                    <h2 class="fw-bold mb-2 text-uppercase">Welcome to BookBridges</h2>
                                    <p class="text-black-50 mb-5">Please enter your user name and password</p>

                                    <div class="form-outline form-white mb-4">
                                        <input type="text" v-model="userName" id="userName" name="userName" class="form-control form-control-lg" placeholder="User Name"/>                
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="password" v-model="password" id="password" name="password" class="form-control form-control-lg" placeholder="Password"/>                
                                    </div>
                                    <p v-if="loginMessage" class="error-message">{{ loginMessage }}</p>

                                    <button class="btn btn-primary" type="submit">Login</button>

                                </div>

                                <div>
                                    <p class="mb-0">Don't have an account? <router-link to="/register">Sign Up</router-link></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import LoginService from "../services/LoginService";

    export default {
    name: "userLogin",
    data() {            // data or variables used
        return {
            userName: "",
            password: "",
            loginMessage: ""
        };
    },
    methods: {
        login() {
            // Check if title and content are empty
            if (!this.userName.trim() || !this.password.trim()) {
                this.loginMessage = "User name and password cannot be empty.";
                return; // Stop further execution
            }

            // clear the previous login record
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("role");

            LoginService.login(this.userName, this.password)
                .then(response => {       // HttpStatus.OK
                    var user = response.data;
                    //console.log(user);                    
                    localStorage.setItem("userId", user.userId);
                    localStorage.setItem("userName", user.username);
                    localStorage.setItem("role", user.role);
                    
                    // Redirect to the "/writer" route
                    if (user.role == "writer"){
                        this.$router.push("/writer");
                    }

                    // Redirect to the "/reader" route
                    if (user.role == "reader"){
                        this.$router.push("/reader");
                    }

                    // Redirect to the "/admin" route
                    if (user.role == "admin"){
                        this.$router.push("/admin");
                    }
                    
                    
                })
                .catch(e => {
                    //this.userLoginRequest.userId = "";
                    //this.userLoginRequest.password = "";
                    //this.message = e.response.data.message;
                    this.loginMessage = "Login error: Please check user name and password." + e.response.data;
                });
        }
    },
    mounted() {   // called when component is loaded
        this.loginMessage = "";
    }
};
    
</script>

<style scoped>

.error-message {
    color: red;
}

</style>