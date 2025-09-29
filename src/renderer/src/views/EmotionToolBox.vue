<!--EmotionToolBox.vue -->
<!-- EmotionDiary -->
<template>
  <div class="diary-container">
    <h1 class="title">Emotion Diary</h1>
    <div class="form-and-entries">
      <form class="diary-form" @submit.prevent="addEntry">
        <label>
          Date:
          <input v-model="newEntry.date" type="date" required="required" />
        </label>
        <label>
          Emotion:
          <input v-model="newEntry.emotion" type="text" />
        </label>
        <label>
          Notes:
          <textarea
            v-model="newEntry.notes"
            style="min-height: 450px; max-height: 450px; overflow: auto; width: 760px"
            required
          ></textarea>
        </label>
        <button type="submit">Add Entry</button>
      </form>
      <div class="entry-list">
        <h2>Past Entries</h2>
        <ul>
          <li v-for="(entry, index) in entries" :key="index">
            <div class="entry-text">{{ entry.date }} - {{ entry.emotion }}: {{ entry.notes }}</div>
            <button @click="deleteEntry(index)">Delete</button>
          </li>
        </ul>
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
      this.entries.push({ ...this.newEntry })
      this.newEntry.date = ''
      this.newEntry.emotion = ''
      this.newEntry.notes = ''
      this.saveEntries()
    },
    deleteEntry(index) {
      this.entries.splice(index, 1)
      this.saveEntries()
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

<style>
.diary-container {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 90px;
  background-color: #e0f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-and-entries {
  display: flex;
  gap: 20px;
  width: 100%;
}

.diary-form {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #5a5858;
  background-color: #f7f7f7;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 500px;
}

.diary-form label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.diary-form button {
  align-self: flex-start;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.diary-form button:hover {
  background-color: #369a6e;
}

.entry-list {
  flex: 1.5;
  width: 800px;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 750px;
  overflow-y: auto;
}

.entry-list h2 {
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.entry-list ul {
  list-style-type: none;
  padding: 0;
}

.entry-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #5a5858;
}

.entry-list li button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.entry-list li button:hover {
  background-color: #c0392b;
}

.title {
  color: #333;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
@media (max-width: 768px) {
  .form-and-entries {
    flex-direction: column;
  }
  .diary-form,
  .entry-list {
    width: 100%;
  }
}
</style>
