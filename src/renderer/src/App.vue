<script setup lang="ts">
// import { ref } from 'vue';
// import Versions from './components/Versions.vue'

// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <nav class="navigation">
    <router-link to="/">Dashboard</router-link>
    <router-link to="/calendar">Calendar</router-link>
    <router-link to="/emotiontoolbox">Emotion Diary</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view></router-view>
</template>
