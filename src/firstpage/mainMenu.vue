<template>
  <!-- -->
  <transition name="roll">
    <div class="showModal" v-if="showModal">
      <div class="closeModal" @click="showModal = !showModal" v-if="showModal">
        <i class="fa fa-times"></i>
      </div>
      <ol class="rating-ol1">
        <li class="rating-li1">
          <div class="ratIndex1">№</div>
          <div class="playername1">Имя</div>
          <div class="gamesWin1">Побед</div>
          <div class="allGames1">Всего игр</div>
          <div class="ratingCount1">Рейтинг</div>
        </li>
      </ol>
      <ol class="rating-ol">
        <li class="rating-li" v-for="(player, index) in ratingList" :key="index">
          <div class="ratIndex">
            <i class="fa fa-trophy first" v-if="index === 0"></i>
            <i class="fa fa-trophy second" v-else-if="index === 1"></i>
            <i class="fa fa-trophy third" v-else-if="index === 2"></i>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="playername">{{ player.playerName }}</div>
          <div class="gamesWin">{{ player.totalWins }}</div>
          <div class="allGames">{{ player.totalGames }}</div>
          <div class="ratingCount">{{ player.rating }}</div>
        </li>
      </ol>
    </div>
  </transition>
  <div class="load" v-if="!isLoad">
    <AppLoader></AppLoader>
  </div>
  <!--  <div class="screen" @v-if="isPin">-->
  <!--    <div class="pinCode">-->
  <!--      <div class="pinHeader">-->
  <!--        <span>Войти ведущим</span>-->
  <!--        <span>-->
  <!--        <i class="fa fa-times" @click="isPin = !isPin"></i>-->
  <!--      </span>-->
  <!--      </div>-->
  <!--      <div class="pinInput">-->
  <!--        <span>Напишите PIN который вы указывали во время создания игры</span>-->
  <!--        <div style="display: flex; flex-direction: row;">-->
  <!--          <OtpInput-->
  <!--              ref="otpInput"-->
  <!--              input-classes="otp-input"-->
  <!--              separator="-"-->
  <!--              :num-inputs="4"-->
  <!--              :should-auto-focus="true"-->
  <!--              :is-input-num="true"-->

  <!--          />-->
  <!--        </div>-->

  <!--        <div class="pinBtn">-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  -->
  <div class="container card" v-if="isLoad">
    <div class="center">
      <div class="logos"></div>
      <a href="/second">
        <button class="button-start"><span>Начать игру</span></button>
      </a>
      <button class="rating-btn" @click="ratingModal">
        <div class="rat-cup">Рейтинг
          <div class="cup"><img src="../img/cup.svg" alt="" style="height:25px;"></div>
        </div>
      </button>
    </div>

    <div class="menu-lab">
      <div class="center">
        <h3>Текущие игры</h3>
      </div>
      <div class="scrollableActive">
        <ul class="ulBorder">
          <div class="haveGames" v-if="activeGames.length">
          <li v-for="games in activeGames" :key="games.gameId" @click="routeActive(games.gameId)">
            <div class="gamePlayers active">
              <div class="gamePlayersNick">{{ games.playerNames.toString() }}</div>
              <div class="gamePlayersEnter"><img src="../img/game.svg" alt="" style="height:25px;"></div>
            </div>
          </li>
          </div>
      <div class="haveNotGames" v-if="!activeGames.length">
      <li>
        <div class="gamePlayers active">
          <div class="gamePlayersNick">Нет активных игр :(</div>
          <div class="gamePlayersEnter"><img src="../img/game.svg" alt="" style="height:25px;"></div>
        </div>
      </li>
    </div>
    </ul>
  </div>
  <div class="center">

    <h3>Прошедшие игры</h3>
  </div>
  <div class="scrollable">
    <ul class="ulBorder">
      <li v-for="games in endGames" :key="games.gameId">
        <div class="gamePlayers" :class="games.winByRed ? 'red' : 'black'">
          <div class="gamePlayersNick">
            {{ games.playerNames.toString() }}
          </div>
          <div class="gamePlayersEnter" v-if="!games.winByRed"><img src="../img/don.svg" alt=""
                                                                    style="height:25px;"></div>
          <div class="gamePlayersEnter" v-if="games.winByRed"><img src="../img/mirn.svg" alt=""
                                                                   style="height:25px;"></div>
        </div>
      </li>
    </ul>
  </div>

  </div>
  <footerM></footerM>
  </div>
</template>

<script>
import footerM from "../footerM";
// import OtpInput from "@bachdgvn/vue-otp-input"
import axios from "axios";
import AppLoader from "../components/AppLoader";
import router from "../router";

export default {
  name: "mainMenu",
  data() {
    return {
      ratingList: [],
      isLoad: false,
      showModal: false,
      code: '',
      isPin: false,
      activeGames: [],
      endGames: [],
      url: 'http://itmomafia.herokuapp.com'
    }
  },
  mounted() {

    axios
        .get(this.url + '/game/active')
        .then(response => {
          this.activeGames = response.data;
        })
        .catch(error => {
          alert(error);
          this.errored = true;
        })
        .finally(() => (
            axios
                .get(this.url + '/game/nonactive')
                .then(response => {
                  this.endGames = response.data;
                })
                .catch(error => {
                  alert(error);
                })
                .finally(() => (
                    axios
                        .get(this.url + '/player/rating')
                        .then(response => {
                          this.ratingList = response.data;
                          this.isLoad = true;
                        })
                        .catch(error => {
                          alert(error);
                          this.isLoad = true;
                        })
                ))
        ));
  },
  methods: {
    async ratingModal() {
      this.showModal = !this.showModal

    },
    routeActive(val) {
      router.push({name: 'third', params: {gameId: val}})
    },
    pinCode() {
      this.isPin = !this.isPin
    }
  },

  components: {footerM, AppLoader}
}
</script>

<style lang="scss" scoped>


.first {
  color: gold
}

.second {
  color: silver
}

.third {
  color: #cd7f32
}

.closeModal {
  position: absolute;
  right: 20px;
  top: 30px;
}

.gamesWin {
  width: 18%;
  // margin: 0 0 6px 12px;
  text-align: center;
}

.allGames {
  width: 18%;
  // margin: 0 0 6px 12px;
  text-align: center;
}

.ratingCount {
  width: 18%;
  //margin: 0 0 6px 12px;
  text-align: center;
}

ol {
  list-style-type: decimal;
  padding-left: 10px;
  margin: 0;
  margin-bottom: 3px;
}

.playername {
  margin: 0 0 6px 5%;
  width: 30%;
}

.ratIndex {
  width: 10%;
  padding: 6px;
  padding-bottom: 2px;
  padding-left: 12px;
  loat: left;
  border-bottom: none;
  border-radius: 50%;
}

.rating-li {
  display: inline-block;
  border-bottom: 2px solid #425b75;
  border-bottom-left-radius: 18px;
  width: 90%;
  margin-bottom: 10px;
}

.rating-li > div {
  display: inline-block;
}

.rating-li > div > div {
  display: inline-block;
}

//
.gamesWin1 {
  width: 18%;
  // margin: 0 0 6px 12px;
  text-align: center;
}

.allGames1 {
  width: 18%;
  // margin: 0 0 6px 12px;
  text-align: center;
  line-height: 10px;
}

.ratingCount1 {
  width: 18%;
  //margin: 0 0 6px 12px;
  text-align: center;
}

.playername1 {
  margin: 0 0 6px 5%;
  width: 30%;
}

.ratIndex1 {
  width: 10%;
  padding: 6px;
  padding-bottom: 2px;
  padding-left: 12px;
  loat: left;
  border-bottom: none;
  border-radius: 50%;
}

.rating-li1 {
  display: inline-block;
  border-bottom: 1px solid #425b75;
  border-bottom-left-radius: 18px;
  width: 90%;
  font-size: 12px;
}

.rating-li1 > div {
  display: inline-block;
}

.rating-li1 > div > div {
  display: inline-block;
}

//
.roll-enter-active {
  animation: roll-in .5s;
}

.roll-leave-active {
  animation: roll-in .5 reverse;
}

@keyframes roll-in {
  0% {
    transform: scale(0) rotateZ(0deg) translateX(-250px);
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: scale(1) rotateZ(360deg) translateX(0px);
    opacity: 1;
  }
}

.roll-enter-active {
  transition: all .3s ease;
}

.roll-leave-active {
  transition: all .4s cubic-bezier(0.5, 0.5, 0.5, 1.0);
}

.roll-enter, .roll-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */
{
  transform: translateY(100vh);
  opacity: 0;
}

.showModal {
  position: absolute;
  color: #2c3e50;
  background-color: #fff;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  padding: 20px;
  top: 0px;
  left: 0px;
  border-right: 5px solid #41B883;
  border-top: 5px solid #41B883;
  opacity: 94%;
  overflow: hidden;
  overflow-y: auto;
}
</style>
