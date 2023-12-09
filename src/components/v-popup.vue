<template>
  <div class="screen"></div>
  <div class="v-popup">
    <div class="v-popup__header">
      <span>{{ popupHeader }}</span>
      <span v-if="!btn99">
        <i class="fa fa-times" @click="closePopup"></i>
      </span>
    </div>
    <!--    f-->
    <div class="v-popup__content">
      <slot></slot>
    </div>
    <div class="v-popup__footer">
      <button v-if="btn1" class="modal_ok" @click="$emit('remove', elem);">{{ btn1 }}</button>
      <button v-if="btn2" class="close_modal" @click="closePopup">{{ btn2 }}</button>
      <button v-if="btn5" class="win_red" @click="endGame('red')">{{ btn5 }}</button>
      <button v-if="btn5s" class="no_win" @click="endGame('red')">{{ btn5s }}</button>
      <button v-if="btn3" class="win_black" @click="endGame('black')">{{ btn3 }}</button>
      <button v-if="btn3s" class="no_win" @click="endGame('black')">{{ btn3s }}</button>
      <button v-if="btnStr2" class="modal_ok" @click="$emit('remove', elem);">{{ btnStr2 }}</button>
      <button v-if="btnStr3" class="close_modal" @click="closePopup">{{ btnStr3 }}</button>
    </div>
    <div class="foot-btn4">
      <button v-if="btn4" class="btn4" @click="endGame('skip')"> {{ btn4 }}</button>
      <button v-if="btn99" class="btn4" @click="$emit('goToMenu', elem);"> {{ btn99 }}</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['closePopup', 'remove', 'goToMenu', 'endGame'],
  props: ['popupHeader', 'btn1', 'btn2', 'btn3', 'btn3s', 'btn4', 'btn5', 'btn5s', 'btn99', 'popupHeaderEnd', 'btnStr3', 'btnStr2'],
  name: "v-popup",
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    endGame(val) {
      this.$emit('endGame', val);
    },
  }
}
</script>

<style lang="scss" scoped>
.v-popup {
  padding: 16px;
  position: fixed;
  top: 30%;
  left: 10%;
  border-radius: 10px;
  background-color: #fff;
  z-index: 99999;
  border: 1px solid #2c3e50;
  box-shadow: 0 0 12px 12px #2c3e50;
  width: 80vw;

  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    margin-left: 6px;
    margin-right: 6px;
    color: #425b75;
    font-size: 1.2em;
  }

  &__footer {
    margin-top: 12px;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin-top: 8px;
  }
}

.modal_ok {
  min-width: 40%;
  margin-left: 2.5%;
  padding: 6px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8em;
  letter-spacing: 1px;
  position: relative;
  background-color: #41B883;
  border: none;
  color: #fff;
  transition-duration: 0.1s;
  overflow: hidden;
  border: 2px solid #2c3e50;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
  border-radius: 10px;
  font-weight: 700;
}

.win_black {
  min-width: 40%;
  margin-left: 2.5%;
  padding: 6px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8em;
  letter-spacing: 1px;
  position: relative;
  background-color: #000;
  border: none;
  color: #fff;
  transition-duration: 0.1s;
  overflow: hidden;
  border: 2px solid #2c3e50;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
  border-radius: 10px;
  font-weight: 700;
  &__y {
    background-color: #000;
  }
  &__f {
    background-color: #454545;
  }
}

.no_win {
  min-width: 40%;
  margin-left: 2.5%;
  padding: 6px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8em;
  letter-spacing: 1px;
  position: relative;
  background-color: #a3a3a3;
  border: none;
  color: #fff;
  transition-duration: 0.1s;
  overflow: hidden;
  border: 2px solid #2c3e50;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
  border-radius: 10px;
  font-weight: 700;
}

.win_red {
  min-width: 40%;
  margin-right: 2.5%;
  padding: 6px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8em;
  letter-spacing: 1px;
  position: relative;
  background-color: #ff7174;
  border: none;
  color: #fff;
  transition-duration: 0.1s;
  overflow: hidden;
  border: 2px solid #2c3e50;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
  border-radius: 10px;
  font-weight: 700;
}

.foot-btn4 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn4 {
  margin-top: 8px;
  align-items: center;
  text-align: center;
  min-width: 95%;
  padding: 6px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8em;
  letter-spacing: 1px;
  position: relative;
  background-color: #fff;
  border: none;
  color: #2c3e50;
  transition-duration: 0.1s;
  overflow: hidden;
  border: 2px solid #2c3e50;
  font-weight: bold;
  border-radius: 10px;
}

.close_modal {
  min-width: 40%;
  margin-right: 2.5%;
  padding: 6px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8em;
  letter-spacing: 1px;
  position: relative;
  background-color: #ff7174;
  border: none;
  color: #fff;
  transition-duration: 0.1s;
  overflow: hidden;
  border: 2px solid #2c3e50;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
  border-radius: 10px;
  font-weight: 700;
}
</style>
