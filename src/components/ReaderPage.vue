<template>
  <div class="container">
      <!-- Insert a Navbar on the top of webpage -->
      <ApplyNavbar :userName="userName" :userRole="userRole" />
  </div>

  <p>This is reader's page</p>
  <p>Pending.....</p>

  <div v-if="articles.length > 0">
      <h2>Articles</h2>
      <ul>
          <li v-for="article in articles" :key="article.id">
              <h3>{{ article.title }}</h3>
              <p>{{ article.noOfView }} Views</p>
              <p>{{ article.noOfLike }} Likes</p>
              <p v-if="!article.expanded">{{ getShortContent(article.content) }}</p>
              <button @click="toggleExpand(article)">
                  {{ article.expanded ? 'Collapse' : 'Read Full Article' }}
              </button>
              <div v-if="article.expanded">
                  <p>{{ article.content }}</p>
              </div>
              <p>__________</p>
          </li>
      </ul>
  </div>
  <div v-else>
      <p>No articles available.</p>
  </div>
</template>

<script>
import ApplyNavbar from '@/components/ApplyNavbar.vue';
import ArticleService from "../services/ArticleService";

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
      articles: [] // Initialize articles as an empty array
  }
},

methods: {
    readLocalStorageItem() {
        this.userId = localStorage.getItem("userId");
        this.userName = localStorage.getItem("userName");
        this.userRole = localStorage.getItem("role");
    },

    // fetch articles
    async fetchArticles() {
        try {
            const response = await ArticleService.getAllArticles();
            this.articles = response.data.map(article => ({
                ...article,
                expanded: false // Add expanded property to each article
            }));
        } catch (error) {
            console.error("Error to fetch the articles:", error);
        }
    },

    // Get the first 20 words of the content
    getShortContent(content) {
        return content.split(' ').slice(0, 20).join(' ');
    },

    // Toggle article expansion
    async toggleExpand(article) {
    if (!article.expanded) {
      
      article.noOfView++; // Update view count locally
      await this.updateViewCount(article.id); // Update view count in the database
    }
    article.expanded = !article.expanded;
    },

    async updateViewCount(articleId) {
      try {
        // API call to update the view count in the database
        await ArticleService.updateArticleCount(articleId);
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    }
},

mounted() {
    this.readLocalStorageItem();
    this.fetchArticles();
}
}
</script>