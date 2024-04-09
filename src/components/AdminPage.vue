<template>
  <div class="container">
      <!-- Insert a Navbar on the top of webpage -->
      <ApplyNavbar :userName="userName" :userRole="userRole" />

      <p></p>
      <h3><router-link to="/createguideline">Create A New Guideline</router-link></h3>       
      
      <p></p>
      <p v-if="readMessage" class="error-message">{{ readMessage }}</p>
      <div class="mb-3"> 
          <table class="table table-striped table-hover">
              <thead>
                  <tr>
                      <th>Content</th>
                      <th>View / Update</th>
                      <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="guideline in guidelines" :key="guideline.guidelineId">
                      <!-- Display only the first 20 characters of guideline.content -->
                      <td>{{ guideline.content.substring(0, 50) + (guideline.content.length > 50 ? '...' : '') }}</td>
                      <td>
                        <!--<button @click="loadGuideline(guideline)" class="btn btn-success">View Details / Update</button>-->
                      </td>
                      <td>
                        <!--<button @click="deleteGuideline(guideline.guidelineId)" class="btn btn-danger">Delete</button>-->
                      </td>
                  </tr>
              </tbody>
          </table>
            
      </div>
      <p v-if="deleteMessage" class="error-message">{{ deleteMessage }}</p>

      <!-- View / Update A Guideline -->
      <div v-if="showUpdateForm">
          <h3>View / Update A Guideline</h3>
          <form @submit.prevent="updateGuideline(guidelineId)">
              <div class="mb-3">
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
import GuidelineService from '@/services/GuidelineService';
export default {
name: 'AdminPage',
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
      
    // Variable for view / update an existing guideline
    guidelines: [],    // Store fetched guideline from server
    content: "",
    guidelineId: null,
    showUpdateForm: false,  // Boolean to control visibility of the update guideline form   
  }
},

methods: {
  readLocalStorageItem() {
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.userRole = localStorage.getItem("role");
    console.log(this.userName);
    console.log(this.useRole);
  },

  /*  
  uploadGuideline() {
    // Check if content are empty
    if (!this.newContent.trim()) {
      this.uploadMessage = "content cannot be empty.";
      return; // Stop further execution
    }

    // Call uploadGuideline function from GuidelineService.js
    GuidelineService.updateGuideline(this.newContent)
      .then(() => {
      // Handle success response
      //console.log("Guideline created successfully:", response.data);
      this.clearAllMessage();
      this.uploadMessage = "Guideline created successfully.";
      this.getAllGuidelines();
    })
    .catch(error => {
      // Handle error
      //console.error("Error creating guideline: ", error);
      this.clearAllMessage();
      this.uploadMessage = "Error creating guideline: " + error;
    })
  },
  */

  getAllGuidelines() {
    GuidelineService.getAllGuidelines()
      .then(response => {
      this.guidelines = response.data;
    })
    .catch(error => {
      //console.error("Error fetching guidelines: ", error);
      this.readMessage = "Error fetching guideline: " + error;
    });
  },    

  deleteGuideline(guidelineId) {
    // Prompt the user for confirmation
    const confirmDelete = window.confirm("Are you sure to delete this guideline?");
    if (!confirmDelete) {
      return; // User canceled the deletion
    }

    // Proceed with guideline deletion
    GuidelineService.deleteGuideline(guidelineId)
      .then(() => {
      // Remove deleted guideline from guidelines array
      this.guidelines = this.guidelines.filter(guideline => guideline.guidelineId !== guidelineId);
      console.log("Guideline deleted successfully:");
      this.clearAllMessage();
      this.deleteMessage = "Guideline deleted successfully.";
      this.getGuidelinesbyUserId(localStorage.getItem("userId"));
    })
    .catch(error => {
      // Handle error
      //console.error("Error deleting guideline:", error);
      this.clearAllMessage();
      this.deleteMessage = "Error deleting guideline: " + error;
    });
  },

  loadGuideline(guideline) {  
    this.showUpdateForm = true; // Show the update form
  
    // Set the content for updating
    this.content = guideline.content;
    this.guidelineId = guideline.guidelineId;
  },  

  updateGuideline(guidelineId) {
    if (!this.content.trim()) {
      this.clearAllMessage();
      this.updateMessage = "Content cannot be empty.";
      return; // Stop further execution
    }
    GuidelineService.updateGuideline(this.content, 1, guidelineId)
      .then(() => {
      console.log("Guideline updated successfully:");
      this.clearAllMessage();
      this.updateMessage = "Guideline updated successfully.";
      this.getAllGuidelines();
    })
    .catch(error => {
      console.error("Error updating guideline:", error);
      this.clearAllMessage();
      this.updateMessage = "Error updating guideline: " + error;
    });
  },  

  clearAllMessage() {
    this.uploadMessage = "";
  },

  toggleNewGuidelineForm() {
    // Hide the update form when creating a new guideline
    this.showUpdateForm = false;       
  },  
},  

mounted() {
  this.readLocalStorageItem();
  this.getAllGuidelines();
}
}

</script>
