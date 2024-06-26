<template>
    <div class="container">
        <!-- Insert a Navbar on the top of webpage -->
        <ApplyNavbar :userName="userName" :userRole="userRole" />

        <p></p>
        <!-- <h3><router-link to="/article"><button @click="navigate" role="link" class="btn btn-primary btn-lg">Browse All Articles</button></router-link></h3>       -->
        
        <p></p>
        <h3><router-link to="/createarticle"><button @click="navigate" role="link" class="btn btn-primary btn-lg">Create A New Article</button></router-link></h3>              
        
        <p></p>
        <p v-if="readMessage" class="error-message">{{ readMessage }}</p>
        
        <!-- Conditionally render the table based on whether articles are present or not -->
        <div v-if="articles.length > 0" class="mb-3"> 
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
                        <!-- Display only the first 50 characters of article.content -->
                        <td>{{ article.content.substring(0, 50) + (article.content.length > 50 ? '...' : '') }}</td>
                        <td><button @click="loadArticle(article)" class="btn btn-success">View / Update</button></td>
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
                    <input type="text" v-model="title" id="title" name="title" class="form-control" placeholder="Title">
                </div>
                <div class="mb-3">
                    <textarea v-model="content" id="content" name="content" rows="15" class="form-control" placeholder="Content"></textarea>
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
  name: 'WriterPage',
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
    },    

    getAllArticles() {
        ArticleService.getAllArticles()
            .then(response => {
                this.articles = response.data;
            })
            .catch(error => {
                this.readMessage = "Error fetching article: " + error;
            });
    },

    getArticlesbyUserId(userId) {
    ArticleService.getArticlesbyUserId(userId)
        .then(response => {
            if (response.status === 204) {
                this.clearAllMessage();
                this.readMessage = "No article found!";
                this.articles = []; // Clear articles array
            } else {
                this.articles = response.data;
            }
        })
        .catch(error => {
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
                    this.getArticlesbyUserId(localStorage.getItem("userId"));
                    this.hideUpdateForm();
            })
            .catch(error => {
                // Handle error
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
        ArticleService.updateArticle(this.title, this.content, this.userId, articleId)
            .then(() => {
                this.clearAllMessage();
                this.updateMessage = "Article updated successfully.";
                this.getArticlesbyUserId(this.userId);
            })
            .catch(error => {
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

    hideUpdateForm() {
        // Hide the update form when creating a new article
        this.showUpdateForm = false;       
        
    },
  },  

  mounted() {
    this.getArticlesbyUserId(localStorage.getItem("userId"));
    this.readLocalStorageItem();
  }
}
</script>

<style scoped>


.error-message {
    color: red;
}
</style>

