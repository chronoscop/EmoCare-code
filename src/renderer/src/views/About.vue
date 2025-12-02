<!-- About.vue -->
<template>
  <div class="introduce">
    <h1 class="about">
      <span class="about-icon">ℹ️</span>
      About EmoCare
    </h1>
    <div class="dependencies-container">
      <div class="dependency-section">
        <h2 class="section">
          <span class="section-icon">📦</span>
          Vue Dependencies
        </h2>
        <transition-group name="list" tag="ul" class="dependency-list">
          <li v-for="dependency in dependencies" :key="dependency.name" class="list-item">
            <div class="item-content">
              <span class="package-name">{{ dependency.name }}</span>
              <span class="package-version">{{ dependency.version }}</span>
            </div>
          </li>
        </transition-group>
      </div>

      <div class="dependency-section">
        <h2 class="section">
          <span class="section-icon">🛠️</span>
          Vue DevDependencies
        </h2>
        <transition-group name="list" tag="ul" class="dependency-list">
          <li v-for="devDependency in devDependencies" :key="devDependency.name" class="list-item">
            <div class="item-content">
              <span class="package-name">{{ devDependency.name }}</span>
              <span class="package-version">{{ devDependency.version }}</span>
            </div>
          </li>
        </transition-group>
      </div>

      <div class="dependency-section">
        <h2 class="section">
          <span class="section-icon">🔧</span>
          Other Dependencies
        </h2>
        <transition-group name="list" tag="ul" class="dependency-list">
          <li
            v-for="otherDependency in otherDependencies"
            :key="otherDependency.name"
            class="list-item"
          >
            <div class="item-content">
              <span class="package-name">{{ otherDependency.name }}</span>
              <span class="package-version">{{ otherDependency.version }}</span>
            </div>
          </li>
        </transition-group>
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
<style scoped>
.introduce {
  padding: 30px 20px;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 70px);
}

.about {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  animation: fadeIn 0.8s ease-out;
}

.about-icon {
  font-size: 3rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.dependencies-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 30px;
  width: 100%;
}

.dependency-section {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.dependency-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.section {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 15px;
  border-bottom: 3px solid #42b983;
}

.section-icon {
  font-size: 1.5rem;
}

.dependency-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.list-item {
  margin-bottom: 12px;
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.list-item:hover {
  transform: translateX(5px);
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 18px;
  background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
  border-left: 4px solid #42b983;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.list-item:hover .item-content {
  background: linear-gradient(135deg, #f0f9f5 0%, #ffffff 100%);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.15);
  border-left-color: #369a6e;
}

.package-name {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.package-version {
  font-weight: 500;
  color: #42b983;
  font-size: 0.95rem;
  background: rgba(66, 185, 131, 0.1);
  padding: 4px 12px;
  border-radius: 15px;
}

/* 列表动画 */
.list-enter-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.4s ease;
}

@media (max-width: 1200px) {
  .dependencies-container {
    flex-wrap: wrap;
  }
  .dependency-section {
    min-width: 300px;
    flex: 1 1 calc(50% - 15px);
  }
}

@media (max-width: 768px) {
  .introduce {
    padding: 20px;
  }
  .about {
    font-size: 2rem;
  }
  .about-icon {
    font-size: 2rem;
  }
  .dependencies-container {
    flex-direction: column;
    gap: 20px;
  }
  .dependency-section {
    min-width: 100%;
    flex: 1 1 100%;
  }
  .section {
    font-size: 1.3rem;
  }
}
</style>
