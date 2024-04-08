<template>
    <div class="container">
        <!-- Insert a Navbar on the top of webpage -->
        <ApplyNavbar :userName="userName" :userRole="userRole" />
    </div>

    <p>This is reader's page</p>
    <p>Pending.....</p>

</template>

<script>
import ApplyNavbar from '@/components/ApplyNavbar.vue';
//import ArticleService from "../services/ArticleService";
export default {
  name: 'ReaderPage',
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
            console.log(this.userName);
            console.log(this.useRolef);
        },
    },

    mounted() {
    this.readLocalStorageItem();
  }
}

</script>
