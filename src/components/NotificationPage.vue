<template>
    <div>
      <h1>Notifications</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-if="notifications.length === 0">No notifications found.</div>
        <ul v-else>
          <li v-for="notification in notifications" :key="notification.id">
            <strong>{{ notification.title }}</strong>
            <p>{{ notification.content }}</p>
            <p>Creator ID: {{ notification.creatorId }}</p>
            <p>Created Time: {{ notification.createdTime }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import NotificationService from '../services/NotificationService.js';
  
  export default {
    data() {
      return {
        loading: true,
        notifications: []
      };
    },
    mounted() {
      this.fetchNotifications();
    },
    methods: {
      fetchNotifications() {
        NotificationService.getNotifications(userId)
          .then(response => {
            this.notifications = response.data;
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching notifications:', error);
            this.loading = false;
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>