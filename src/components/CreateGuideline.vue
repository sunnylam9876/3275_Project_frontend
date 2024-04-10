<template>
    <!-- Insert a Navbar on the top of webpage -->
    <ApplyNavbar :userName="userName" :userRole="userRole" />

    <div class="container">
        <h3>Create A New Guideline</h3>
        <form @submit.prevent="uploadGuideline">
            <div class="mb-3">                
                <textarea v-model="newContent" id="newContent" name="newContent" rows="15" class="form-control" placeholder="Content"></textarea>                    
            </div>
            <div>
                <button type="submit" class="btn btn-primary">Create</button>
            </div>
        </form>
        <router-link to="/admin">Back</router-link>
        <p></p>
        <p v-if="uploadMessage" class="error-message">{{ uploadMessage }}</p>
        <p></p>   
    </div>
</template>

<script>
import ApplyNavbar from '@/components/ApplyNavbar.vue';
import GuidelineService from "../services/GuidelineService";
export default {
    name: 'CreateGuideline',
    components: {
        ApplyNavbar  // Register the Navbar component
    },

    data() {
        return {
            // Variable for user info from localStorage
            userId: 0,
            userName: "",
            userRole: "",

            // Variable for a new guideline
            newContent: "",
            uploadMessage: "", // feedback message after creating a new guideline
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

        uploadGuideline() {
            // Check if title and content are empty
            if (!this.newContent.trim()) {
                this.uploadMessage = "Content cannot be empty.";
                return; // Stop further execution
            }

            // Call uploadGuideline function from GuidelineService.js
            GuidelineService.uploadGuideline(this.newContent, this.userId)
                .then(() => {
                    //console.log("Guideline created successfully:");
                    this.clearAllMessage();
                    //this.uploadMessage = "Guideline created successfully.";
                    window.alert("Guideline created successfully.");

                    // Redirect if guideline is created successfully
                    this.$router.push("/admin");
                })
                .catch(error => {
                    // Handle error
                    //console.error("Error creating guideline: ", error);
                    this.clearAllMessage();
                    this.uploadMessage = "Error creating guideline: " + error;
                })
        },

        clearAllMessage() {
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