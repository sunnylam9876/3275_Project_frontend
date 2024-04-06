<template>
    <div>
        <h1>Writer's Functions Demo</h1>

        <!-- Create a new article -->
        <h3>Create A New Article</h3>
        <form @submit.prevent="uploadArticle">
            <div>
                <label>Title:</label>
                <input type="text" v-model="newTitle" name="newTitle">
            </div>
            <div>
                <label>Content:</label>
                <textarea v-model="newContent" name="newContent" rows="5" cols="100"></textarea>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        <p v-if="uploadMessage" class="error-message">{{ uploadMessage }}</p>    

        <p></p>
        <p></p>

        <!-- Display all articles in a table -->
        <h3>List All Articles</h3>
        <button @click="getAllArticles()">Reload All Articles</button>
        <p></p>
        <p v-if="readMessage" class="error-message">{{ readMessage }}</p>
        <div class="table-container"> 
            <table class="bordered-table">
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
                        <td><button @click="loadArticle(article)">View Details / Update</button></td>
                        <td><button @click="deleteArticle(article.articleId)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
              
        </div>
        <p v-if="deleteMessage" class="error-message">{{ deleteMessage }}</p>

        <p></p>
        <p></p>
        <h3>View / Update An Article</h3>
        <form @submit.prevent="updateArticle(articleId)">
            <div>
                <label>Title:</label>
                <input type="text" v-model="title" name="title">
            </div>
            <div>
                <label>Content:</label>
                <textarea v-model="content" name="content" rows="5" cols="100"></textarea>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>    
        <p v-if="updateMessage" class="error-message">{{ updateMessage }}</p>
    </div>
</template>

<script>
import ArticleService from "../services/ArticleService";
export default {
  name: 'ArticleFunction',
  data() {
    return {
        // Variable for a new article
        newTitle:"",
        newContent: "",
        uploadMessage: "", // feedback message after creating a new article

        // Variable for view / update an existing article
        articles: [],    // Store fetched articles from server
        title: "",
        content: "",
        articleId: null,
        readMessage: "",
        updateMessage: "",  // feedback message after updating an article
        deleteMessage:""   // feedback message after deleting an article 

        
    };
  },

  methods: {
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
    }
  },

  mounted() {
    // Call getAllArticles method when the component is mounted to fetch articles
    this.getAllArticles();
  }
}
</script>

<style scoped>
.table-container {
    display: flex;
    justify-content: center;
}

.bordered-table {
    border-collapse: collapse;
}

.bordered-table th, .bordered-table td {
    border: 1px solid #ddd; /* Change the color as needed */
    padding: 8px;
    text-align: left;
}

.bordered-table th {
    background-color: #f2f2f2; /* Change the background color as needed */
}

.error-message {
    color: red;
}

</style>