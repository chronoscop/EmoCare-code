<!--EmotionToolBox.vue -->
<!-- EmotionDiary -->
<template>
  <div class="diary-container">
    <h1 class="title">Emotion Diary</h1>
    <div class="form-and-entries">
      <form class="diary-form" @submit.prevent="addEntry">
        <h2 class="form-title">
          <span class="icon">✨</span>
          New Entry
        </h2>
        <label>
          <span class="label-text">📅 Date:</span>
          <input v-model="newEntry.date" type="date" required="required" class="form-input" />
        </label>
        <label>
          <span class="label-text">💭 Emotion:</span>
          <input
            v-model="newEntry.emotion"
            type="text"
            placeholder="How are you feeling?"
            class="form-input"
          />
        </label>
        <label>
          <span class="label-text">📝 Notes:</span>
          <textarea
            v-model="newEntry.notes"
            placeholder="Write your thoughts here..."
            class="form-textarea"
            required
          ></textarea>
        </label>
        <button type="submit" class="submit-btn">
          <span class="btn-icon">➕</span>
          Add Entry
        </button>
      </form>
      <div class="entry-list">
        <h2>
          <span class="icon">📝</span>
          Past Entries
          <span v-if="entries.length > 0" class="entry-count">({{ entries.length }})</span>
        </h2>
        <div v-if="entries.length === 0" class="empty-state">
          <p class="empty-icon">📔</p>
          <p class="empty-text">No entries yet. Start your emotion diary journey!</p>
        </div>
        <transition-group v-else name="list" tag="ul">
          <li v-for="(entry, index) in entries" :key="`entry-${index}`" class="entry-item">
            <div class="entry-content">
              <div class="entry-header">
                <span class="entry-date">{{ formatDate(entry.date) }}</span>
                <span v-if="entry.emotion" class="entry-emotion">{{ entry.emotion }}</span>
              </div>
              <div class="entry-notes">{{ entry.notes }}</div>
            </div>
            <button class="delete-btn" title="Delete entry" @click="confirmDelete(index)">
              <span class="delete-icon">🗑️</span>
            </button>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEntry: {
        date: '',
        emotion: '',
        notes: ''
      },
      entries: []
    }
  },
  created() {
    this.loadEntries()
  },
  methods: {
    addEntry() {
      if (!this.newEntry.notes.trim()) {
        return
      }
      this.entries.unshift({ ...this.newEntry })
      this.newEntry.date = ''
      this.newEntry.emotion = ''
      this.newEntry.notes = ''
      this.saveEntries()
    },
    confirmDelete(index) {
      if (confirm('Are you sure you want to delete this entry?')) {
        this.deleteEntry(index)
      }
    },
    deleteEntry(index) {
      this.entries.splice(index, 1)
      this.saveEntries()
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    saveEntries() {
      localStorage.setItem('diaryEntries', JSON.stringify(this.entries))
    },
    loadEntries() {
      const savedEntries = localStorage.getItem('diaryEntries')
      if (savedEntries) {
        this.entries = JSON.parse(savedEntries)
      }
    }
  }
}
</script>

<style scoped>
.diary-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  height: calc(100vh - 70px);
  overflow: hidden;
}

.title {
  color: #333;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid rgba(66, 185, 131, 0.3);
  padding-bottom: 15px;
  margin-bottom: 25px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.form-and-entries {
  display: flex;
  gap: 25px;
  width: 100%;
  height: calc(100% - 80px);
  overflow: hidden;
}

.diary-form {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #5a5858;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 35px;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding-right: 20px;
}

.form-title {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 1.5rem;
}

.diary-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-text {
  font-weight: 600;
  color: #555;
  font-size: 1rem;
}

.form-input,
.form-textarea {
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  background-color: #fff;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.form-textarea {
  min-height: 450px;
  max-height: 450px;
  overflow-y: auto;
  resize: vertical;
  line-height: 1.6;
}

.submit-btn {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  background: linear-gradient(135deg, #42b983 0%, #369a6e 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(66, 185, 131, 0.3);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 185, 131, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 1.2rem;
}

.entry-list {
  flex: 1.5;
  width: 800px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding-right: 20px;
}

.entry-list h2 {
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid rgba(66, 185, 131, 0.3);
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.8rem;
}

.entry-count {
  font-size: 1rem;
  color: #42b983;
  font-weight: normal;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 15px;
}

.empty-text {
  font-size: 1.1rem;
  color: #666;
}

.entry-list ul {
  list-style-type: none;
  padding: 0;
}

.entry-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  color: #5a5858;
  transition: all 0.3s ease;
  border-left: 4px solid #42b983;
}

.entry-item:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.entry-content {
  flex: 1;
  min-width: 0;
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.entry-date {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.entry-emotion {
  background: linear-gradient(135deg, #42b983 0%, #369a6e 100%);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.entry-notes {
  color: #666;
  line-height: 1.6;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.delete-btn {
  padding: 8px 12px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 15px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background-color: #ee5a52;
  transform: scale(1.1);
}

.delete-icon {
  font-size: 1.2rem;
}

/* 列表动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
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

/* 滚动条样式 */
.entry-list::-webkit-scrollbar,
.diary-form::-webkit-scrollbar {
  width: 8px;
}

.entry-list::-webkit-scrollbar-track,
.diary-form::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.entry-list::-webkit-scrollbar-thumb,
.diary-form::-webkit-scrollbar-thumb {
  background: #42b983;
  border-radius: 10px;
}

.entry-list::-webkit-scrollbar-thumb:hover,
.diary-form::-webkit-scrollbar-thumb:hover {
  background: #369a6e;
}

@media (max-width: 768px) {
  .diary-container {
    height: auto;
    min-height: calc(100vh - 70px);
    overflow-y: auto;
  }
  .form-and-entries {
    flex-direction: column;
    height: auto;
    overflow-y: visible;
  }
  .diary-form,
  .entry-list {
    width: 100%;
    height: auto;
    overflow-y: visible;
    padding-right: 25px;
  }
  .form-textarea {
    min-height: 300px;
    max-height: 300px;
  }
  .entry-item {
    flex-direction: column;
    gap: 10px;
  }
  .delete-btn {
    align-self: flex-end;
    margin-left: 0;
  }
}
</style>
