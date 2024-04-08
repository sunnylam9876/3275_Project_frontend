<template>
    <!-- Insert a Navbar on the top of webpage -->
    <ApplyNavbar :userName="userName" :userRole="userRole" />

    <div class="container">
        
            <h3>Create A New Article</h3>
            <form @submit.prevent="uploadArticle">
                <div class="mb-3">                
                    <!-- <label for="newTitle" class="form-label">Title:</label> -->
                    <input type="text" v-model="newTitle" id="newTitle" name="newTitle" class="form-control" placeholder="Title">                
                </div>
                <div class="mb-3">                
                    <!-- <label for="newContent">Content:</label> -->
                    <textarea v-model="newContent" id="newContent" name="newContent" rows="15" class="form-control" placeholder="Content"></textarea>                    
                </div>
                <div>
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>
            <router-link to="/writer">Back</router-link>
            <p></p>
            <p v-if="uploadMessage" class="error-message">{{ uploadMessage }}</p>
            <p></p>
           
    </div>
</template>

<script>
import ApplyNavbar from '@/components/ApplyNavbar.vue';
import ArticleService from "../services/ArticleService";
export default {
  name: 'CreateArticle',
  components: {
    ApplyNavbar  // Register the Navbar component
  },

  data() {
    return {
        // Variable for user info from localStorage
        userId: 0,
        userName: "",
        userRole: "",

        // Variable for a new article
        newTitle:"",
        newContent: "",
        uploadMessage: "", // feedback message after creating a new article
    };
  },

  methods: {
    readLocalStorageItem() {
        this.userId = localStorage.getItem("userId");
        this.userName = localStorage.getItem("userName");
        this.userRole = localStorage.getItem("role");
        console.log(this.userName);
        console.log(this.useRolef);
    },

    uploadArticle() {
        // Check if title and content are empty
        if (!this.newTitle.trim() || !this.newContent.trim()) {
            this.uploadMessage = "Title and content cannot be empty.";
            return; // Stop further execution
        }

        // Call uploadArticle function from WriterService.js
        // Assume userID is 1
        ArticleService.uploadArticle(this.newTitle, this.newContent, this.userId)
            .then(() => {
                // Handle success response
                //console.log("Article created successfully:", response.data);
                this.clearAllMessage();
                //this.uploadMessage = "Article created successfully.";
                window.alert("Article created successfully.");

                // Redirect if article is created successfully
                this.$router.push("/writer");
                
            })
            .catch(error => {
                // Handle error
                //console.error("Error creating article: ", error);
                this.clearAllMessage();
                this.uploadMessage = "Error creating article: " + error;
            })
    },

    clearAllMessage() 
    {
        this.uploadMessage = "";
    }
    
  },  

  mounted() {
    this.readLocalStorageItem();
  }
}
</script>

<style scoped>

.error-message {
    color: red;
}

</style>