<!-- About.vue -->
<template>
  <div class="introduce">
    <h1 class="about">About</h1>
    <div class="dependencies-container">
      <div>
        <h2 class="section">Vue Dependencies:</h2>
        <ul>
          <li v-for="dependency in dependencies" :key="dependency.name" class="list-item">
            {{ dependency.name }} - {{ dependency.version }}
          </li>
        </ul>
      </div>

      <div>
        <h2 class="section">Vue DevDependencies:</h2>
        <ul>
          <li v-for="devDependency in devDependencies" :key="devDependency.name" class="list-item">
            {{ devDependency.name }} - {{ devDependency.version }}
          </li>
        </ul>
      </div>

      <div>
        <h2 class="section">Other Dependencies:</h2>
        <ul>
          <li
            v-for="otherDependency in otherDependencies"
            :key="otherDependency.name"
            class="list-item"
          >
            {{ otherDependency.name }} - {{ otherDependency.version }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      dependencies: [
        { name: 'vue', version: '3.4.15' },
        { name: 'vue-router', version: '4.2.5' },
        { name: 'vue-full-calendar', version: '2.8.0' },
        { name: 'vue-fullcalendar', version: '1.0.9' },
        { name: 'vue-cal', version: '4.8.1' }
      ],
      devDependencies: [
        { name: 'electron', version: '28.2.0' },
        { name: 'electron-builder', version: '24.9.1' },
        { name: 'electron-vite', version: '2.0.0' },
        { name: 'electron-updater', version: '6.1.7' },
        { name: '@electron-toolkit/preload', version: '3.0.0' },
        { name: '@electron-toolkit/utils', version: '3.0.0' },
        { name: 'eslint', version: '8.56.0' },
        { name: 'eslint-plugin-vue', version: '9.20.1' },
        { name: '@vue/eslint-config-prettier', version: '9.0.0' },
        { name: '@rushstack/eslint-patch', version: '1.6.1' },
        { name: '@electron-toolkit/eslint-config', version: '1.0.1' },
        { name: 'vite', version: '5.0.12' },
        { name: '@vitejs/plugin-vue', version: '5.0.3' },
        { name: 'sass', version: '1.71.1' },
        { name: 'tailwindcss', version: '3.4.1' },
        { name: 'autoprefixer', version: '10.4.17' },
        { name: 'postcss', version: '8.4.35' },
        { name: 'prettier', version: '3.2.4' }
      ],
      otherDependencies: [{ name: 'jquery', version: '3.7.1' }]
    }
  }
}
</script>
<style>
.introduce {
  position: relative;
  left: auto;
}
.section {
  margin-bottom: 25px;
}
ul {
  list-style-type: none;
  padding: 0;
}
.list-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #cbcaca;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.dependencies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 80px;
  /* position: relative; */
}
li {
  padding: 10px;
}
li:hover {
  background: #eee;
  cursor: pointer;
}
</style>
