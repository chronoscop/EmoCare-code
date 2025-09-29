<!-- Home.vue -->
<template>
  <h1 id="welcome">Welcome,</h1>
  <p>You're on a roll! Jump back in, or start something new.</p>
  <div class="mood-selector">
    <h3 class="mood-question">How are you feeling today?</h3>
    <div class="mood-options">
      <button class="mood-btn" @click="selectMood('😊')">😊</button>
      <button class="mood-btn" @click="selectMood('😔')">😔</button>
      <button class="mood-btn" @click="selectMood('😡')">😡</button>
      <button class="mood-btn" @click="selectMood('😐')">😐</button>
      <button class="mood-btn" @click="selectMood('😁')">😁</button>
    </div>
    <p id="selected-mood">Your selected mood will appear here.</p>
    <p id="emoji">{{ selectedMoodMessage }}</p>
  </div>
  <!-- mood suggestion -->
  <div class="mood-suggestion">
    <h3>Suggestion for you:</h3>
    <p id="suggestion">{{ moodSuggestion }}</p>
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

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  background-color: #f0f0f0;
  /* 背景颜色 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* 外部容器 */
.container {
  display: flex;
  justify-content: space-between;
  /* 左右分布 */
  width: 90%;
  /* 根据屏幕宽度调整 */
  max-width: 1200px;
}

/* 左边的部分 */
.left-section {
  flex: 1;
  margin-right: 20px;
  /* 左右部分的间距 */
}

/* 右边的部分 */
.right-section {
  flex: 1;
  margin-left: 20px;
}

/* 欢迎标题 */
#welcome {
  font-size: 3.8vw;
  /* 使用相对单位，适应不同屏幕尺寸 */
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeIn 2s ease-in-out;
  margin-bottom: 1.2rem;
}

/* 说明文字 */
p {
  font-size: 1.2vw;
  /* 使用相对单位 */
  color: #000;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1.5rem;
}

/* 心情选择器 */
.mood-selector {
  margin: 20px 0;
}

/* 按钮区域 */
.mood-options {
  display: flex;
  gap: 10px;
}

/* 心情按钮样式 */
.mood-btn {
  font-size: 2rem;
  /* 字体大小使用rem */
  background-color: #f0f8ff;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;
  transition: background-color 0.3s;
}

/* 按钮悬停效果 */
.mood-btn:hover {
  background-color: #87ceeb;
}

/* 已选心情文字 */
#selected-mood {
  font-size: 1.5vw;
  /* 相对单位，适应不同尺寸 */
  font-weight: bold;
  color: #fff;
  margin-top: 15px;
}

/* Emoji 图标 */
#emoji {
  margin-top: 15px;
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 心情问题文字 */
.mood-question {
  font-size: 1.5rem;
  font-weight: bold;
}

/* 心情建议部分 */
.mood-suggestion {
  margin-top: 50px;
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.mood-suggestion h3 {
  margin: 0 auto;
  position: relative;
  left: 5%;
  font-size: 2rem;
  color: white;
}

/* 媒体查询：适配不同屏幕尺寸 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    /* 小屏幕上左右部分上下排列 */
  }

  #welcome {
    font-size: 3rem;
  }

  p {
    font-size: 1rem;
  }

  .mood-btn {
    font-size: 1.5rem;
    padding: 8px 16px;
  }

  #emoji {
    font-size: 3rem;
  }

  .mood-suggestion {
    font-size: 1rem;
  }

  .mood-suggestion p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  #welcome {
    font-size: 2.5rem;
  }

  p {
    font-size: 0.9rem;
  }

  .mood-options {
    flex-direction: column;
    gap: 5px;
  }

  .mood-btn {
    font-size: 1.2rem;
    padding: 6px 12px;
  }

  #emoji {
    font-size: 2.5rem;
  }

  .mood-suggestion {
    font-size: 0.9rem;
  }

  .mood-suggestion p {
    font-size: 0.8rem;
  }
}

#suggestion {
  max-width: 90%;
  position: relative;
  left: 20px;
  margin: 0 auto;
  text-align: justify;
  font-size: 1.1rem;
  line-height: 1.6;
  color: black;
}
</style>
