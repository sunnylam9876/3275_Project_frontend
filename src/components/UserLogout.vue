<script>
export default {
    name: "userLogin",
    methods: {
        logout() {
            let userName = localStorage.getItem("userName");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("role");

            window.alert("User: " + userName + " logged out successfully.")

            // Redirect to the "/login" route                    
            this.$router.push("/login");
        }
    },

    mounted() {   // called when component is loaded
        this.logout();
    }
}

</script>