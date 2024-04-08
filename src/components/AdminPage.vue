<template>
    <div class="container">
        <!-- Insert a Navbar on the top of webpage -->
        <ApplyNavbar :userName="userName" :userRole="userRole" />
    </div>

    <p>This is admin's page</p>
    <p>Pending.....</p>

</template>

<script>
import ApplyNavbar from '@/components/ApplyNavbar.vue';
//import ArticleService from "../services/ArticleService";
export default {
  name: 'AdminPage',
  components: {
    ApplyNavbar  // Register the Navbar component
  },

  data() {
    return {
        // Variable for user info from localStorage
        userId: 0,
        userName: "",
        userRole: ""
    }
  },

    methods: {
        readLocalStorageItem() {
            this.userId = localStorage.getItem("userId");
            this.userName = localStorage.getItem("userName");
            this.userRole = localStorage.getItem("role");
            
        },
    },

    mounted() {
    this.readLocalStorageItem();
  }
}

</script>
