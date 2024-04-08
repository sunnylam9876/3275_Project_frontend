<template>
    <div class="container">
        <!-- Insert a Navbar on the top of webpage -->
        <ApplyNavbar :userName="userName" :userRole="userRole" />

        <p></p>
        <h3><router-link to="/createarticle">Create A New Article</router-link></h3>       
        
        <!-- <button @click="getAllArticles()" class="btn btn-primary">Reload All Articles</button> -->
        <p></p>
        <p v-if="readMessage" class="error-message">{{ readMessage }}</p>
        <div class="mb-3"> 
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>View / Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="article in articles" :key="article.articleId">
                        <td>{{ article.title }}</td>
                        <!-- Display only the first 20 characters of article.content -->
                        <td>{{ article.content.substring(0, 50) + (article.content.length > 50 ? '...' : '') }}</td>
                        <td><button @click="loadArticle(article)" class="btn btn-success">View Details / Update</button></td>
                        <td><button @click="deleteArticle(article.articleId)" class="btn btn-danger">Delete</button></td>
                    </tr>
                </tbody>
            </table>
              
        </div>
        <p v-if="deleteMessage" class="error-message">{{ deleteMessage }}</p>

        <!-- View / Update An Article -->
        <div v-if="showUpdateForm">
            <h3>View / Update An Article</h3>
            <form @submit.prevent="updateArticle(articleId)">
                <div class="mb-3">
                    <!-- <label>Title:</label> -->
                    <input type="text" v-model="title" id="title" name="title" class="form-control" placeholder="Title">
                </div>
                <div class="mb-3">
                    <!-- <label>Content:</label> -->
                    <textarea v-model="content" id="content" name="content" rows="5" class="form-control" placeholder="Content"></textarea>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>    
            <p v-if="updateMessage" class="error-message">{{ updateMessage }}</p>
        </div>

        
       
        
    </div>
</template>

<script>

import ApplyNavbar from '@/components/ApplyNavbar.vue';
import ArticleService from "../services/ArticleService";
export default {
  name: 'WriterFunction',
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

        // Variable for view / update an existing article
        articles: [],    // Store fetched articles from server
        title: "",
        content: "",
        articleId: null,
        readMessage: "",    // feedback message after fetching articles from server
        updateMessage: "",  // feedback message after updating an article
        deleteMessage:"",   // feedback message after deleting an article         
        showUpdateForm: false,  // Boolean to control visibility of the update article form               
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
        ArticleService.uploadArticle(this.newTitle, this.newContent, 1)
            .then(() => {
                // Handle success response
                //console.log("Article created successfully:", response.data);
                this.clearAllMessage();
                this.uploadMessage = "Article created successfully.";
                this.getAllArticles();
            })
            .catch(error => {
                // Handle error
                //console.error("Error creating article: ", error);
                this.clearAllMessage();
                this.uploadMessage = "Error creating article: " + error;
            })
    },

    getAllArticles() {
        ArticleService.getAllArticles()
            .then(response => {
                this.articles = response.data;
            })
            .catch(error => {
                //console.error("Error fetching articles: ", error);
                this.readMessage = "Error fetching article: " + error;
            });
    },

    deleteArticle(articleId) {
        // Prompt the user for confirmation
        const confirmDelete = window.confirm("Are you sure to delete this article?");
        if (!confirmDelete) {
            return; // User canceled the deletion
        }

        // Proceed with article deletion
        ArticleService.deleteArticle(articleId)
            .then(() => {
                // Remove deleted article from articles array
                this.articles = this.articles.filter(article => article.articleId !== articleId);
                    //console.log("Article deleted successfully:", response.data);
                    this.clearAllMessage();
                    this.deleteMessage = "Article deleted successfully.";
                    this.getAllArticles();
            })
            .catch(error => {
                // Handle error
                //console.error("Error deleting article:", error);
                this.clearAllMessage();
                this.deleteMessage = "Error deleting article: " + error;
            });
    },

    loadArticle(article) {
        
        this.showUpdateForm = true; // Show the update form
        

        // Set the title and article content for updating
        this.title = article.title;
        this.content = article.content;
        this.articleId = article.articleId;
        
    },

    updateArticle(articleId) {
        if (!this.title.trim() || !this.content.trim()) {
            this.clearAllMessage();
            this.updateMessage = "Title and content cannot be empty.";
            return; // Stop further execution
        }
        ArticleService.updateArticle(this.title, this.content, 1, articleId)
            .then(() => {
                //console.log("Article updated successfully:", response.data);
                this.clearAllMessage();
                this.updateMessage = "Article updated successfully.";
                this.getAllArticles();
            })
            .catch(error => {
                //console.error("Error updating article:", error);
                this.clearAllMessage();
                this.updateMessage = "Error updating article: " + error;
            });
    },

    clearAllMessage() 
    {
        this.uploadMessage = "";
        this.readMessage = "";
        this.updateMessage = "";
        this.deleteMessage = "";
    },

    toggleNewArticleForm() {
        // Hide the update form when creating a new article
        this.showUpdateForm = false;       
        
    },
  },  

  mounted() {
    // Call getAllArticles method when the component is mounted to fetch articles
    this.getAllArticles();
    this.readLocalStorageItem();
  }
}
</script>

<style scoped>


.error-message {
    color: red;
}
</style>

