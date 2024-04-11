<template>
    <div class="container">
        <!-- Insert a Navbar on the top of webpage -->
        <ApplyNavbar :userName="userName" :userRole="userRole" />
    </div>

    <!--Back Button-->
    <div class="back-button">
        <router-link to="/reader" class="btn btn-primary">Back</router-link>
    </div>
    
    <h1>Browse All Articles</h1>

    <p></p>

    <p v-if="readMessage" class="error-message">{{ readMessage }}</p>

    <div v-if="articles.length > 0" class="mb-3"> 
        <div class="table-container">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th style="width: 30%;">Title</th>
                        <th style="width: 50%;">Content</th>
                        <th style="width: 20%;">Read Article</th>
                    </tr>
                </thead>
                <tbody>
                    <!--Loop all the articles-->
                    <tr v-for="article in articles" :key="article.articleId">
                        <td>{{ article.title }}</td>
                        <!-- Get the first 20 words of the content -->
                        <td>{{ getShortContent(article.content) }}</td>
                        <!--Link to the article-->
                        <td><router-link :to="{ name: 'ViewArticle', params: { id: article.articleId }}" class="btn btn-success">Read Full Article</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!--If no articles, deisplay this paragraph.-->
    <div v-else>
        <p><span style="color: red">No articles available.</span></p>
    </div>
</template>
  
<script>
import ApplyNavbar from '@/components/ApplyNavbar.vue';
import ArticleService from "../services/ArticleService";

export default {
    name: 'BrowseAllArticle',
    components: {
        ApplyNavbar  // Register the Navbar component
    },
  
    data() {
        return {

            // Variable for user info from localStorage
            userId: 0,
            userName: "",
            userRole: "",

            // Variable for view / update an existing article
            articles: [],    // Store fetched articles from server
            title: "",
            content: "",
            articleId: null,
            readMessage: "",    // feedback message after fetching articles from server   
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
                    this.readMessage = "Error fetching articles: " + error;
                });
        },
  
        // Get the first 20 words of the content
        getShortContent(content) {
            return content.split(' ').slice(0, 20).join(' ');
        },
    },
  
    mounted() {
        this.readLocalStorageItem();
        this.getAllArticles(); // Fetch all articles when component is mounted
    }
}
</script>
  
<style scoped>

.error-message {
    color: red;
}

.back-button {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    max-width: 1900px;
    width: 100%;
    padding-right: 20px;
}

.table-container {
    margin-left: auto;
    margin-right: auto;
    max-width: 1300px;
}
</style>