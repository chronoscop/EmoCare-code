<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/calendar', label: 'Calendar', icon: '📅' },
  { path: '/emotiontoolbox', label: 'Emotion Diary', icon: '📝' },
  { path: '/about', label: 'About', icon: 'ℹ️ 💚' }
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="nav-brand">
        <span class="brand-icon">💚</span>
        <span class="brand-text">EmoCare</span>
      </div>
      <div class="nav-links">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="{ active: isActive(item.path) }"
          class="nav-link"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>
