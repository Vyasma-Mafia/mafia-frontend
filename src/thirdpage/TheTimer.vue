<template>
      <div class="timerBlock">
        <button class="timer30" @click="startTimer(30)">
          <span>30</span>
        </button>
        <div type="text" class="timer" :style="{color : colorTimer}">
          {{ currentTime }}
        </div>
        <button class="timer60" @click="startTimer(60)">
          <span>60</span>
        </button>
      </div>
      <button class="timerPause" @click="pauseTimer(currentTime)">
        <div class="Pause">
          <font-awesome-icon :icon="myPlay" v-if="pause"/>
          <font-awesome-icon :icon="myPause" v-else/>
        </div>
      </button>
</template>

<script>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faPause} from '@fortawesome/free-solid-svg-icons'

export default {

  name: "thirdPage",
  data() {
    return {
      currentTime: 0,
      timer: null,
      colorTimer: '#2c3e50',
      pause: false,
      myPause: faPause,
      myPlay: faPlay,
      audio3: new Audio("/Start_Countdown_mp3_1702338457.mp3"),
      audio10: new Audio("/mainSignal.wav")
    }
  },

  methods: {
    pauseTimer(timer) {
      this.stopTimer()
      this.currentTime = timer
      if (this.pause === false) {
        this.pause = true;
      } else {
        this.pause = false;
        this.startTimer(timer)
      }
    },
    startTimer(time) {
      this.stopTimer()
      this.pause = false
      this.currentTime = time
      this.audio3.currentTime = 0
      this.audio10.currentTime = 0
      this.timer = setInterval(() => {

        if (this.currentTime <= 11) {
          this.colorTimer = '#e53935'
        }

        if (this.currentTime == 11) {
          this.audio10.play()
        }

        if (this.currentTime == 4) {
          this.audio3.play()
        }

        if (this.currentTime <= 0) {
          this.stopTimer()
        } else {
          this.currentTime--;
        }

      }, 1000)
    },

    stopTimer() {
      this.colorTimer = '#2c3e50';
      clearTimeout(this.timer)
      this.audio3.pause()
      this.audio10.pause()
    },
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer()
      }
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>

.Pause {
  color: #fff;
}

.card2 {
  height: 96vh;
}

.timerPause {
  border: 1px solid #41b883;
  padding: 12px 4.9rem 12px 4.9rem;
  border-radius: 10px;
  background-color: #41b883;
  box-shadow: -1px 1px 4px 1px #2c3e50;
  border: 2px solid #2c3e50;
}

.timerBlock {
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 10px 0 10px 0;
}

.timer30 {
  display: flex;
  flex-direction: column;
  padding: 13px;
  border: 2px solid #2c3e50;
  border-radius: 10px;
  font-weight: 700;
  box-shadow: -1px 1px 4px 1px #2c3e50;
  background-color: #41b883;
  color: #fff;
  font-size: 15px;

  span {
    text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
  }
}

.timer {
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 2px solid #41b883;
  border-radius: 10px;
  background-color: #fff;
  margin: 0 12px 0 12px;
  max-width: 54px;
  padding: 10px;
  width: 130px;
  font-weight: 700;

}

.timer60 {
  display: flex;
  flex-direction: column;
  padding: 13px;
  box-shadow: 1px 1px 4px 1px #2c3e50;
  border: 2px solid #2c3e50;
  border-radius: 10px;
  font-weight: 700;
  background-color: #41b883;
  box-shadow: -1px 1px 4px 1px #2c3e50;
  background-color: #41b883;
  color: #fff;
  font-size: 15px;

  span {
    text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
  }
}
</style>