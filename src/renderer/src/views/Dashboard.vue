<!-- Home.vue -->
<template>
  <div class="dashboard-container">
    <h1 id="welcome" class="fade-in">Welcome,</h1>
    <p class="fade-in-delay">You're on a roll! Jump back in, or start something new.</p>
    <div class="mood-selector fade-in-delay-2">
      <h3 class="mood-question">How are you feeling today?</h3>
      <div class="mood-options">
        <button
          class="mood-btn"
          :class="{ active: selectedMood === '😊' }"
          data-mood="happy"
          @click="selectMood('😊')"
        >
          <span class="emoji-icon">😊</span>
          <span class="mood-label">Happy</span>
        </button>
        <button
          class="mood-btn"
          :class="{ active: selectedMood === '😔' }"
          data-mood="sad"
          @click="selectMood('😔')"
        >
          <span class="emoji-icon">😔</span>
          <span class="mood-label">Sad</span>
        </button>
        <button
          class="mood-btn"
          :class="{ active: selectedMood === '😡' }"
          data-mood="angry"
          @click="selectMood('😡')"
        >
          <span class="emoji-icon">😡</span>
          <span class="mood-label">Angry</span>
        </button>
        <button
          class="mood-btn"
          :class="{ active: selectedMood === '😐' }"
          data-mood="neutral"
          @click="selectMood('😐')"
        >
          <span class="emoji-icon">😐</span>
          <span class="mood-label">Neutral</span>
        </button>
        <button
          class="mood-btn"
          :class="{ active: selectedMood === '😁' }"
          data-mood="excited"
          @click="selectMood('😁')"
        >
          <span class="emoji-icon">😁</span>
          <span class="mood-label">Excited</span>
        </button>
      </div>
      <transition name="fade-slide">
        <div v-if="selectedMood" class="selected-mood-display">
          <p id="selected-mood">Your selected mood:</p>
          <p id="emoji">{{ selectedMoodMessage }}</p>
        </div>
      </transition>
    </div>
    <!-- mood suggestion -->
    <transition name="fade-slide">
      <div v-if="moodSuggestion" class="mood-suggestion fade-in-delay-3">
        <h3>
          <span class="suggestion-icon">💡</span>
          Suggestion for you:
        </h3>
        <div class="suggestion-content">
          <p id="suggestion">{{ moodSuggestion }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMood: null,
      moodSuggestion: ''
    }
  },
  computed: {
    selectedMoodMessage() {
      return this.selectedMood
        ? `Your mood: ${this.selectedMood}`
        : 'Your selected mood will appear here.'
    }
  },
  mounted() {
    const storedMood = localStorage.getItem('selectedMood')
    if (storedMood) {
      this.selectedMood = storedMood
      this.updateMoodSuggestion(storedMood)
    }
  },
  methods: {
    selectMood(mood) {
      this.selectedMood = mood
      localStorage.setItem('selectedMood', mood)
      this.updateMoodSuggestion(mood)
    },
    updateMoodSuggestion(mood) {
      switch (mood) {
        case '😊':
          this.moodSuggestion =
            "Great! You’re feeling good today, and that’s wonderful! Keep spreading the positivity by engaging in activities that lift you up even more. One great way to maintain and even enhance your happiness is by expressing gratitude. Take a few moments to write down at least three things you're grateful for—it could be something as simple as a sunny day or a conversation that made you smile. Gratitude is a powerful practice that has been shown to increase long-term happiness. Consider sharing your positive energy with others too. Reach out to a friend or family member, send a kind message, or do something unexpected to brighten their day. Doing this not only helps others but also deepens your own sense of joy. If you have some free time, engage in activities that bring you peace and pleasure, like reading, painting, exercising, or exploring a hobby you love. Remember, happiness is contagious, so don’t be afraid to spread it around! And if you're looking for something new, trying a fresh activity or picking up a new skill can further elevate your mood. Keep riding this wave of positivity and savor the wonderful feelings you have right now."
          break
        case '😔':
          this.moodSuggestion =
            "It’s okay to feel down sometimes. Life has its ups and downs, and moments of sadness are completely natural. The most important thing you can do right now is to acknowledge your feelings without judgment. Take a deep breath and allow yourself the space to experience these emotions. Sometimes, expressing what’s bothering you can be a great release, whether through writing in a journal or talking to a friend or loved one who will listen without judgment. Remember, it’s okay to ask for help or support when you’re feeling low. Engaging in self-care activities can also help ease your mind. Try something gentle like listening to calming music, taking a warm bath, practicing mindfulness, or even stepping outside to be in nature for a while. The natural world has a soothing effect and can provide some clarity when you’re feeling overwhelmed. If you're not ready to interact with others, that's okay too—sometimes, just being with yourself is enough. But always remind yourself that feelings of sadness are temporary. They will pass, and brighter days will come. Taking small steps to care for your well-being can make a big difference over time. Be kind to yourself, and don’t rush through the process. Healing takes time, and you deserve every moment of self-compassion."
          break
        case '😡':
          this.moodSuggestion =
            "Anger is a powerful emotion, and while it can sometimes feel overwhelming, it's important to remember that it’s a natural part of being human. The key is learning to channel it in ways that are constructive rather than destructive. Start by taking a few deep breaths to center yourself and slow down your racing thoughts. This can help create the mental space needed to address what’s triggering your anger. Physical activity is also a great outlet—whether it's going for a run, hitting the gym, or even doing yoga, getting your body moving can help dissipate some of the tension. You might also find that writing down your thoughts in a journal can help you make sense of the situation and give you clarity on what’s really bothering you. If you feel ready, consider talking through the issue with someone you trust—it can be incredibly cathartic to voice your frustrations and get another perspective. Sometimes, anger can feel all-encompassing, but remember that it’s usually masking other emotions like hurt, frustration, or fear. By addressing these underlying feelings, you can start to regain control over your emotions. Anger doesn’t have to lead to negative actions. Instead, it can be a catalyst for making positive changes, setting boundaries, or advocating for yourself in a healthy way."
          break
        case '😐':
          this.moodSuggestion =
            "Feeling neutral can be an interesting space to explore. You’re not overly happy, nor are you feeling sad or angry. It’s a balanced state where you can reflect on your emotional landscape and perhaps use this time for some quiet introspection. Neutral days are great for catching up on things you’ve been putting off—maybe there’s a small project or task that could benefit from your calm, focused energy. Organizing your space, ticking off items from your to-do list, or even starting a new hobby are all wonderful ways to utilize this steady mood. If you're looking for something more introspective, taking some time to meditate or practice mindfulness can help you gain a deeper understanding of yourself and your current emotional state. Think of it as a time to recharge and reset. You don’t have to force yourself to feel one way or another—being neutral is perfectly okay. In fact, it can be a great opportunity to take a break from emotional extremes and focus on self-care in a balanced, grounded way. Consider engaging in something that brings a subtle sense of joy, like reading, taking a walk, or simply enjoying a quiet cup of tea. Embrace this calm moment as a time to rest and reset, preparing yourself for whatever emotions or challenges may come next."
          break
        case '😁':
          this.moodSuggestion =
            "You seem incredibly happy, and that’s fantastic! Moments like this are worth celebrating, so take a little time to acknowledge the sources of your joy. Is it something you accomplished recently? Maybe it’s the people around you or the result of something you’ve been working on for a while. Reflecting on the reasons behind your happiness can help you understand what really matters to you and how to cultivate more of those experiences. Now is also a great time to share your joy with others. Happiness multiplies when it's shared, so reach out to someone you care about—whether it’s offering support, lending a helping hand, or simply expressing gratitude to someone who’s made a positive impact on your life. Spreading positivity doesn’t just uplift others; it can reinforce and sustain your own joyful mood. Consider channeling this energy into something creative or productive—maybe there’s a project you've been excited to start or a hobby that brings you a lot of joy. Ride this wave of positivity and don’t be afraid to take on new challenges. With this burst of happiness, you’re in a great place to achieve something meaningful, so embrace the opportunities that come your way and enjoy every second of it!"
          break
        default:
          this.moodSuggestion = ''
      }
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100vh - 70px);
}

/* 动画效果 */
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

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}

.fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.fade-in-delay-2 {
  animation: fadeIn 0.8s ease-out 0.4s both;
}

.fade-in-delay-3 {
  animation: fadeIn 0.8s ease-out 0.6s both;
}

/* 过渡效果 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 欢迎标题 */
#welcome {
  font-size: 3.8vw;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.2rem;
  text-align: center;
}

/* 说明文字 */
.dashboard-container > p {
  font-size: 1.2vw;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  text-align: center;
}

/* 心情选择器 */
.mood-selector {
  margin: 30px 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 心情问题文字 */
.mood-question {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 25px;
  text-align: center;
}

/* 按钮区域 */
.mood-options {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 心情按钮样式 */
.mood-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 3px solid transparent;
  cursor: pointer;
  padding: 20px 25px;
  border-radius: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  position: relative;
  overflow: hidden;
}

.mood-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(66, 185, 131, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.mood-btn:hover::before {
  width: 300px;
  height: 300px;
}

.mood-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(66, 185, 131, 0.5);
}

.mood-btn:active {
  transform: translateY(-2px) scale(1.02);
}

.mood-btn.active {
  background: linear-gradient(135deg, #42b983 0%, #369a6e 100%);
  border-color: #42b983;
  box-shadow: 0 8px 25px rgba(66, 185, 131, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

.mood-btn.active .emoji-icon {
  animation: bounce 1s ease-in-out infinite;
}

.emoji-icon {
  font-size: 3rem;
  transition: transform 0.3s;
  position: relative;
  z-index: 1;
}

.mood-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  position: relative;
  z-index: 1;
}

.mood-btn.active .mood-label {
  color: #fff;
}

/* 已选心情显示 */
.selected-mood-display {
  margin-top: 25px;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 15px;
}

#selected-mood {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
}

#emoji {
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  margin: 0;
}

/* 心情建议部分 */
.mood-suggestion {
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.mood-suggestion h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  text-align: center;
  justify-content: center;
}

.suggestion-icon {
  font-size: 2rem;
  animation: pulse 2s ease-in-out infinite;
}

.suggestion-content {
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

#suggestion {
  max-width: 100%;
  margin: 0;
  text-align: justify;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

/* 媒体查询：适配不同屏幕尺寸 */
@media (max-width: 768px) {
  #welcome {
    font-size: 3rem;
  }

  .dashboard-container > p {
    font-size: 1rem;
  }

  .mood-btn {
    padding: 15px 20px;
    min-width: 80px;
  }

  .emoji-icon {
    font-size: 2.5rem;
  }

  .mood-label {
    font-size: 0.8rem;
  }

  #emoji {
    font-size: 3rem;
  }

  .mood-suggestion h3 {
    font-size: 1.5rem;
  }

  #suggestion {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  #welcome {
    font-size: 2.5rem;
  }

  .dashboard-container > p {
    font-size: 0.9rem;
  }

  .mood-options {
    gap: 10px;
  }

  .mood-btn {
    padding: 12px 15px;
    min-width: 70px;
  }

  .emoji-icon {
    font-size: 2rem;
  }

  .mood-label {
    font-size: 0.7rem;
  }

  #emoji {
    font-size: 2.5rem;
  }

  .mood-suggestion {
    padding: 20px;
  }

  .mood-suggestion h3 {
    font-size: 1.3rem;
  }

  #suggestion {
    font-size: 0.85rem;
    line-height: 1.6;
  }
}
</style>
