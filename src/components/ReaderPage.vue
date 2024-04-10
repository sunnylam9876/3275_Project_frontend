<template>
    <div class="container">
        <!-- Insert a Navbar on the top of webpage -->
        <ApplyNavbar :userName="userName" :userRole="userRole" />
    </div>

    <h3><router-link to="/article">Browse All Articles</router-link></h3>       

</template>

<script>
import ApplyNavbar from '@/components/ApplyNavbar.vue';

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
      userRole: "",
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

