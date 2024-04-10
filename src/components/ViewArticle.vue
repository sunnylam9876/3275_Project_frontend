<template>
    <div class="container">
        <!-- Insert a Navbar on the top of webpage -->
        <ApplyNavbar :userName="userName" :userRole="userRole" />
    </div>

    <div class="back-button">
        <router-link to="/article" class="btn btn-primary">Back</router-link>
    </div>

    <div v-if="article">

        <h1>{{ article.title }}</h1>
        <div class="article-content">    
            <div class="article-info">
                <div class="info-group">
                    <p><strong>User ID:</strong> <span class="info">{{ article.userId }}</span></p>
                </div>
                <div class="info-group">
                    <p><strong>No. of Views:</strong> <span class="info">{{ article.noOfView }}</span></p>
                </div>
                <div class="info-group">
                    <p><strong>No. of Likes:</strong> <span class="info">{{ article.noOfLike }}</span></p>
                </div>
            </div>
        
            <div class="content-border">
                <p><strong>Content:</strong></p>
                <p>{{ article.content }}</p>
            </div>

            <div class="comments-container" v-if="comments && comments.length > 0">
                <h2>Comments</h2>
                <ul>
                    <li v-for="comment in comments" :key="comment.id" class="comment">
                        <p><strong>User ID:</strong> {{ comment.userId }}</p>
                        <p><strong>Comments: </strong>{{ comment.content }}</p>                        
                        <p><strong>Created at:</strong> {{ comment.createdTime }}</p>
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>No comments available.</p>
            </div>
        </div>

    </div>

    <div v-else>
        <p>No Content</p>
    </div>
    
</template>
  
<script>
import ApplyNavbar from '@/components/ApplyNavbar.vue';
import ArticleService from "../services/ArticleService";
import CommentServices from "../services/CommentServices";

export default {
    name: 'ViewArticle',
    components: {
        ApplyNavbar  // Register the Navbar component
    },
  
    data() {
        return {
            // Variable for user info from localStorage
            userId: 0,
            userName: "",
            userRole: "",
            article: null, // Store article data
            comments: []
        };
    },

    methods: {
        readLocalStorageItem() {
            this.userId = localStorage.getItem("userId");
            this.userName = localStorage.getItem("userName");
            this.userRole = localStorage.getItem("role");
        }, 
       
        fetchArticleData() {
            const articleId = this.$route.params.id;
            ArticleService.getArticleById(articleId)
            .then(response => {
                this.article = response.data;
                // fetch comments after fetching article.
                this.fetchCommentsData(articleId); // Pass articleId to fetchCommentsData
            })
            .catch(error => {
                console.error("Error fetching article data: ", error);
            });
        },

        fetchCommentsData(articleId) { 
            CommentServices.getCommentsByArticleId(articleId)
            .then(response => {
                this.comments = response.data;
            })
            .catch(error => {
                console.error("Error fetching comments data: ", error);
            });
        }
    },
    
    mounted() {
        this.readLocalStorageItem();
        this.fetchArticleData();
    }
}
</script>


<style scoped>
.back-button {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    max-width: 1900px;
    width: 100%;
    padding-right: 20px;
}

.article-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.info-group {
    margin: 0 20px; /* Adjust spacing between info groups */
}

.info {
    font-size: 18px;
    font-weight: bold;
    margin-left: 10px;
}

.article-content {
    max-width: 1300px; 
    margin: 0 auto;
}

.content-border {
    border: 1px solid #ccc;
    padding: 10px;
}

.comments-container {
    padding: 10px;
    margin-top: 20px;
}

.comment {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 15px;
}
</style>