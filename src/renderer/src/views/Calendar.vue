<!-- Calendar.vue -->
<template>
  <div class="calendar-container">
    <div class="calendar-sidebar">
      <form class="event-form" @submit.prevent="addEvent">
        <h3 class="form-title">
          <span class="icon">📅</span>
          Add New Event
        </h3>
        <label>
          <span class="label-text">📌 Event Title:</span>
          <input
            ref="titleInput"
            v-model="newEvent.title"
            autofocus
            type="text"
            required
            placeholder="Enter event title"
            class="form-input"
            @click="focusTitleInput"
          />
        </label>
        <label>
          <span class="label-text">🕐 Start Time:</span>
          <input v-model="newEvent.start" type="datetime-local" required class="form-input" />
        </label>
        <label>
          <span class="label-text">🕑 End Time:</span>
          <input v-model="newEvent.end" type="datetime-local" required class="form-input" />
        </label>
        <button type="submit" class="submit-btn">
          <span class="btn-icon">➕</span>
          Add Event
        </button>
      </form>
      <div class="event-list">
        <h3 class="list-title">
          <span class="icon">📋</span>
          Event List
          <span v-if="events.length > 0" class="event-count">({{ events.length }})</span>
        </h3>
        <div v-if="events.length === 0" class="empty-state">
          <p class="empty-icon">📭</p>
          <p class="empty-text">No events scheduled yet</p>
        </div>
        <ul v-else>
          <li v-for="(event, index) in events" :key="getEventKey(event, index)" class="event-item">
            <div class="event-content">
              <div class="event-title">{{ event.title }}</div>
              <div class="event-time">
                <span class="time-label">Start:</span> {{ formatDateTime(event.start) }}
              </div>
              <div class="event-time">
                <span class="time-label">End:</span> {{ formatDateTime(event.end) }}
              </div>
            </div>
            <button
              type="button"
              class="delete-btn"
              title="Delete event"
              @mousedown.prevent
              @click.stop="confirmDelete(index)"
            >
              <span class="delete-icon">🗑️</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="calendar-wrapper">
      <vue-cal
        :time-from="0 * 60"
        :time-to="24 * 60"
        :time-step="30"
        hide-weekends
        :events="events"
        class="calendar-view"
      ></vue-cal>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
  components: { VueCal },
  data() {
    return {
      events: [],
      newEvent: {
        title: '',
        start: '',
        end: ''
      }
    }
  },
  created() {
    this.loadEvents()
  },
  mounted() {
    this.focusTitleInput()
  },
  methods: {
    focusTitleInput() {
      this.$nextTick(() => {
        const input = this.$refs.titleInput
        if (!input) return

        // 处理 alert/confirm 后 Electron/浏览器焦点丢失的问题
        const blurActive = () => {
          const active = document.activeElement
          if (active && active !== input && active.blur) {
            active.blur()
          }
        }

        const focusSafely = () => {
          if (typeof window !== 'undefined' && window.focus) {
            window.focus()
          }
          blurActive()
          input.focus()
          if (input.setSelectionRange) {
            const len = input.value?.length || 0
            input.setSelectionRange(len, len)
          }
        }

        focusSafely()
        requestAnimationFrame(() => input.focus())
        setTimeout(() => input.focus(), 50)
        setTimeout(() => input.focus(), 150)
      })
    },
    addEvent(event) {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      const startDate = new Date(this.newEvent.start)
      const endDate = new Date(this.newEvent.end)

      if (endDate <= startDate) {
        alert('End time must be after start time!')
        this.$nextTick(() => this.$refs.titleInput?.focus())
        return
      }

      const newEvent = {
        title: this.newEvent.title,
        start: startDate,
        end: endDate
      }
      this.events.push(newEvent)

      // 清空表单
      this.newEvent.title = ''
      this.newEvent.start = ''
      this.newEvent.end = ''
      this.saveEvents()
      this.focusTitleInput()
    },
    confirmDelete(index) {
      // 直接删除，避免原生 confirm 抢夺焦点
      this.deleteEvent(index)
      this.focusTitleInput()
    },
    deleteEvent(index) {
      if (index >= 0 && index < this.events.length) {
        this.events.splice(index, 1)
        this.saveEvents()
        this.focusTitleInput()
      }
    },
    getEventKey(event, index) {
      // 使用事件的时间戳和标题创建唯一key
      return `event-${event.start?.getTime() || Date.now()}-${event.title || index}-${index}`
    },
    formatDateTime(date) {
      if (!date) return ''
      const d = new Date(date)
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    saveEvents() {
      localStorage.setItem('events', JSON.stringify(this.events))
    },
    loadEvents() {
      const events = localStorage.getItem('events')
      if (events) {
        this.events = JSON.parse(events).map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }))
      }
    }
  }
}
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 25px;
  padding: 30px 20px;
  width: 100%;
  margin: 0 auto;
  height: calc(100vh - 70px);
  overflow: hidden;
  position: relative;
}

.calendar-sidebar {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 350px;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 5;
  pointer-events: auto;
}

.form-title {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 1.3rem;
}

.event-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-text {
  font-weight: 600;
  color: #555;
  font-size: 0.95rem;
}

.form-input {
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  background-color: #fff;
  color: #333;
}

.form-input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.submit-btn {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
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

.submit-btn:focus {
  outline: none;
}

.submit-btn:focus-visible {
  outline: 2px solid #42b983;
  outline-offset: 2px;
}

.btn-icon {
  font-size: 1.1rem;
}

.calendar-wrapper {
  flex: 1;
  min-width: 800px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
}

.calendar-view {
  width: 100%;
}

.vuecal {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  min-height: fit-content;
}

.vuecal__menu .vuecal__cell-events-count {
  background-color: #42b983;
}

.vuecal__title-bar {
  background: linear-gradient(135deg, #0a8b7a 0%, #42b983 100%);
  color: white;
}

.vuecal__cell--today .vuecal__cell--current {
  background-color: rgba(66, 185, 131, 0.2);
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(235, 255, 245, 0.4);
}

.vuecal__cell--selected:before {
  border-color: rgba(66, 185, 131, 0.5);
}

.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(195, 255, 225, 0.5);
}

.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(112, 209, 165, 0.25);
}

.event-list {
  padding: 25px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.list-title {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(66, 185, 131, 0.3);
}

.event-count {
  font-size: 1rem;
  color: #42b983;
  font-weight: normal;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.empty-text {
  font-size: 1rem;
  color: #666;
}

.event-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.event-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #42b983;
}

.event-item:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.event-content {
  flex: 1;
  min-width: 0;
}

.event-title {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.event-time {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
}

.time-label {
  font-weight: 600;
  color: #555;
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
  font-size: 1.1rem;
}

/* 事件列表动画 */
.event-list-enter-active,
.event-list-leave-active {
  transition: all 0.4s ease;
}

.event-list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.event-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.event-list-move {
  transition: transform 0.4s ease;
}

/* 滚动条样式 */
.event-list::-webkit-scrollbar,
.calendar-wrapper::-webkit-scrollbar,
.calendar-sidebar::-webkit-scrollbar {
  width: 8px;
}

.event-list::-webkit-scrollbar-track,
.calendar-wrapper::-webkit-scrollbar-track,
.calendar-sidebar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.event-list::-webkit-scrollbar-thumb,
.calendar-wrapper::-webkit-scrollbar-thumb,
.calendar-sidebar::-webkit-scrollbar-thumb {
  background: #42b983;
  border-radius: 10px;
}

.event-list::-webkit-scrollbar-thumb:hover,
.calendar-wrapper::-webkit-scrollbar-thumb:hover,
.calendar-sidebar::-webkit-scrollbar-thumb:hover {
  background: #369a6e;
}

@media (max-width: 1200px) {
  .calendar-container {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    min-height: calc(100vh - 70px);
    overflow-y: auto;
  }

  .calendar-sidebar {
    width: 100%;
    height: auto;
    overflow-y: visible;
    padding-right: 0;
  }

  .calendar-wrapper {
    width: 100%;
    min-width: 100%;
    height: auto;
    overflow-y: visible;
    padding-right: 0;
  }
}

@media (max-width: 768px) {
  .calendar-container {
    padding: 15px;
  }

  .event-form,
  .event-list {
    padding: 20px;
  }
  .event-item {
    flex-direction: column;
    gap: 10px;
  }
  .delete-btn {
    align-self: flex-end;
    margin-left: 0;
  }
}
</style>
