<template>
    <section class="vh-100 gradient-custom">
        <form @submit.prevent="register">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-80">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-white text-black" style="border-radius: 1rem;">
                            <div class="card-body p-5 text-center">
                                <div class="mb-md-5 mt-md-4 pb-5">
                                    <h2 class="fw-bold mb-2 text-uppercase">Register a new account</h2>
                                    <p class="text-black-50 mb-5">Please enter your user name and password</p>

                                    <div class="form-outline form-white mb-4">
                                        <input type="text" v-model="userName" id="userName" name="userName" class="form-control form-control-lg" placeholder="User Name"/>                
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="password" v-model="password" id="password" name="password" class="form-control form-control-lg" placeholder="Password"/>                
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <label class="text-black-50">Please choose a role</label>                                        
                                        <select v-model="role" class="form-select form-select-lg mb-3" aria-label="Large select example">                                            
                                            <option value="admin">Administrator</option>
                                            <option value="writer">Writer</option>
                                            <option value="reader">Reader</option>                                            
                                        </select> 
                                    </div>



                                    <p v-if="registerMessage" class="error-message">{{ registerMessage }}</p>

                                    <button class="btn btn-primary" type="submit">Register</button>

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
    import RegisterService from "../services/RegisterService";

    export default {
    name: "userRegister",
    data() {            // data or variables used
        return {
            userName: "",
            password: "",
            role: "",
            registerMessage: ""
        };
    },
    methods: {
        register() {
            // Check if title and content are empty
            if (!this.userName.trim() || !this.password.trim() || !this.role.trim()) {
                this.registerMessage = "User name, password and role cannot be empty.";
                return; // Stop further execution
            }

            // clear the previous login record
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("role");

            RegisterService.register(this.userName, this.password, this.role, 0)
                .then(response => {       // HttpStatus.OK
                    var user = response.data;
                    //console.log(user);                   

                    // Display a message if register successfully
                    window.alert("Hello " + user.username + "! Your account is created successfully. Please login.")
                    
                    // Redirect to the "/login" route                    
                    this.$router.push("/login");
                })
                .catch(e => {
                    //this.userLoginRequest.userId = "";
                    //this.userLoginRequest.password = "";
                    //this.message = e.response.data.message;
                    this.registerMessage = "Login error: Please check user name and password." + e.response.data;
                });
        }
    },
    mounted() {   // called when component is loaded
        this.registerMessage = "";
    }
};
    
</script>

<style scoped>

.error-message {
    color: red;
}

</style>