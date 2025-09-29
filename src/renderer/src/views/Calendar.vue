<!-- Calendar.vue -->
<template>
  <div class="calendar-container">
    <form class="event-form" @submit.prevent="addEvent">
      <label>
        Event Title:
        <input v-model="newEvent.title" type="text" required style="color: black" />
      </label>
      <label>
        Start Time:
        <input v-model="newEvent.start" type="datetime-local" required style="color: black" />
      </label>
      <label>
        End Time:
        <input v-model="newEvent.end" type="datetime-local" required style="color: black" />
      </label>
      <button type="submit">Add Event</button>
    </form>
    <div class="event-list">
      <h3>Event List</h3>
      <ul>
        <li v-for="(event, index) in events" :key="index">
          {{ event.title }} ({{ new Date(event.start).toLocaleString() }} -
          {{ new Date(event.end).toLocaleString() }})
          <button @click="deleteEvent(index)">Delete</button>
        </li>
      </ul>
    </div>
    <vue-cal
      :time-from="0 * 60"
      :time-to="24 * 60"
      :time-step="30"
      hide-weekends
      :events="events"
      class="calendar-view"
    ></vue-cal>
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
  methods: {
    addEvent() {
      const newEvent = {
        title: this.newEvent.title,
        start: new Date(this.newEvent.start),
        end: new Date(this.newEvent.end)
      }
      this.events.push(newEvent)
      this.newEvent.title = ''
      this.newEvent.start = ''
      this.newEvent.end = ''
      this.saveEvents()
    },
    deleteEvent(index) {
      this.events.splice(index, 1)
      this.saveEvents()
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

<style>
.calendar-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  position: relative;
  left: -45%;
}
.event-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  padding: 15px;
  background: rgba(244, 243, 243, 0.8);
  border-radius: 10px;
  position: relative;
  left: 12%;
  top: -200px;
}
.event-form label {
  display: flex;
  flex-direction: column;
}
.event-form button {
  margin-top: 10px;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.event-form button:hover {
  background-color: #369a6e;
}
.calendar-view {
  flex-grow: 1;
}
.vuecal {
  width: 950px;
  position: fixed;
  left: 44%;
  top: 53px;
}
.vuecal__menu .vuecal__cell-events-count {
  background-color: #42b983;
}
.vuecal__title-bar {
  background-color: #0a8b7a;
}
.vuecal__cell--today .vuecal__cell--current {
  background-color: rgba(240, 240, 255, 0.4);
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
  position: relative;
  width: 400px;
  padding: 15px;
  background: rgba(254, 45, 45, 0.8);
  border-radius: 10px;
  position: relative;
  left: -39%;
  top: 150px;
  max-height: 400px;
  overflow-y: auto;
}

.event-list ul {
  list-style-type: none;
  padding: 0;
}
.event-list li {
  margin-bottom: 10px;
}
.event-list button {
  padding: 5px 10px;
  background-color: #f44336;
  /* color: white; */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.event-list button:hover {
  background-color: #c02525;
}
.event-list li:hover {
  background-color: #d2392e;
}
</style>
