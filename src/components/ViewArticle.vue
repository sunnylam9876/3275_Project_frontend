<template>
    <div class="container">
        <!-- Insert a Navbar on the top of webpage -->
        <ApplyNavbar :userName="userName" :userRole="userRole" />
    </div>

    <!--Back Button-->
    <div class="back-button">
        <router-link to="/article" class="btn btn-primary">Back</router-link>
    </div>

    <div v-if="article">
        
        <!--Article's Details-->
        <h1>{{ article.title }}</h1>
        <!--To display the three set of data by setting article-info to flex in style-->
        <div class="article-content">    
            <div class="article-info">
                <div class="info-group">
                    <p><strong>Author's user ID:</strong> <span class="info">{{ article.userId }}</span></p>
                </div>
                <div class="info-group">
                    <p><strong>No. of Views:</strong> <span class="info" style="color: violet">{{ article.noOfView }}</span></p>
                </div>
                <div class="info-group">
                    <p><strong>No. of Likes:</strong> <span class="info" style="color: lightcoral">{{ article.noOfLike }}</span></p>
                </div>
            </div>
        
            <!--Article's Content-->
            <div class="content-border">
                <p><strong>Content:</strong></p>
                <p><span style="color: navy">{{ article.content }}</span></p>
            </div>

            <!--Comment's Part-->
            <div class="comments-container" v-if="comments && comments.length > 0">
                <h2>Comments</h2>
                <ul>
                    <!--Loop the comments-->
                    <li v-for="comment in comments" :key="comment.id" class="comment">
                        <p><strong>Comment's User ID:</strong> {{ comment.userId }}</p>
                        <p><strong>Comments: </strong><span style="color: blue">{{ comment.content }}</span></p>                        
                        <p><strong>Commented at:</strong> {{ convertToLocalTime(comment.createdTime) }}</p>
                    </li>
                </ul>
            </div>
            <!--Show no comment for zero comment article-->
            <div v-else>
                <p><span style="color: red">No comment available.</span></p>
            </div>

            <!--Levaing Comment Part-->
            <div>
                <h2>Leave a Comment</h2>
                <form @submit.prevent="submitComment">
                    <textarea v-model="newCommentContent" rows="4" cols="50" placeholder="Enter your comment here please."></textarea>
                    <button type="submit" class="btn btn-primary">Post Comment</button>
                </form>
            </div>

        </div>

    </div>

    <!--show no content if there is no such article-->
    <div v-else>
        <p><span style="color: red">No Content</span></p>
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
            article: null,
            comments: [],
            newCommentContent: '' // The content of the new comment
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
        },

        submitComment() {
            if (this.newCommentContent.trim() !== '') {
                const articleId = this.$route.params.id;
                const newComment = {
                    userId: this.userId,
                    articleId: articleId,
                    content: this.newCommentContent
                };

                CommentServices.createComment(newComment)
                .then(() => {
                    // clean the input box after posting
                    this.newCommentContent = '';
                    // reflect the new added comment to the comments.
                    this.fetchCommentsData(articleId);
                })
                .catch(error => {
                    console.error("Error posting comment: ", error);
                });
            }
        },

        convertToLocalTime(utcTime) {
            const localTime = new Date(utcTime).toLocaleString();
            return localTime;
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
    margin: 0 20px;
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
    border: 1px solid black;
    padding: 10px;
    background-color: lightcyan;
}

.comments-container {
    padding: 10px;
    margin-top: 20px;
}

.comment {
    border: 1px solid lightseagreen;
    padding: 10px;
    margin-bottom: 15px;
    background-color: lightgray;
}

textarea {
    width: calc(100% - 24px);
    margin-bottom: 10px;
}

.btn-primary {
    margin-top: 10px;
}
</style>