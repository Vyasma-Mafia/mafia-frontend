<template>
  <div class="load" v-if="!isLoad">
    <AppLoader></AppLoader>
  </div>
  <div class="container card2" v-if="isLoad">
    <div class="razr">v.1.2 Abobus</div>
    <div class="scroll">
      <div class="center">
        <h3 class="winnerText">Победа {{ gameEndWho }}</h3>
      </div>
      <div class="list">
        <ul class="ulList">
          <li class="liPlayers" v-for="(player, index) in playersList" :key="player.playerId">
            <div>
              <div class="playerIndex" :class="player.alive ? '' : 'death'">{{ player.sitNumber }}</div>
              <div class="playerName">{{ player.playerName }}</div>
              <div class="activity">
                <div class="playerRole">
                  <div class="roleShow" width="25px" height="25px">
                    <div class="maf" v-if="player.role == 'BLACK'"><img src="../img/maf.svg" alt=""
                        style="width:25px; height:25px;"></div>
                    <div class="sherif" v-if="player.role == 'SHERIFF'"><img src="../img/sherif.svg" alt=""
                        style="width:25px; height:25px;"></div>
                    <div class="red" v-if="player.role == 'RED'"><img src="../img/mirn.svg" alt=""
                        style="width:25px; height:25px;"></div>
                    <div class="don" v-if="player.role == 'DON'"><img src="../img/don.svg" alt=""
                        style="width:25px; height:25px;"></div>
                  </div>
                </div>
                <div class="activ" :class="player.alive ? '' : 'death'">
                  <span>
                    <input type="number" maxlength="4" value="2.5" step="0.1" v-model="score[index]">
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="center">
          <button class="startGame" @click="sendResults(player, index)"><span>Отправить оценки</span></button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import footerM from "../footerM";
import axios from "axios";
import AppLoader from "../components/AppLoader";
import router from "../router";

export default {
  data() {
    return {
      delPlayer: null,
      isReshuffle: false,
      gameEnd: false,
      gameEndWho: '',
      url: '',
      isLoad: false,
      gameId: null,
      gameOver: false,
      playersList: [],
      getJson: {},
      error: null,
      score: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    playersList() {
      // // console.log(123)
    },

  },
  methods: {
    goToMenu() {
      router.push({ path: '/first' })
    },
    async fetchData() {
      this.error = this.post = null
      this.isLoad = false
      // замените `getPost` используемым методом получения данных / доступа к API
      const test = await axios.get(this.url + '/gameInfo/' + this.$route.params.gameId)
        .then(function (response) {
          return response
        }
        )
        .catch(function (error) {
          alert('Ошибка сервера ' + error)
        });
      console.log(test)
      this.getJson = test.data
      this.isLoad = true
      this.startGame = this.getJson.gameStarted
      this.gameEnd = this.getJson.gameFinished
      this.blackCanWin = this.getJson.canBlackWin
      this.redCanWin = this.getJson.canRedWin
      if (this.gameEnd) {
        if (this.gameEnd) {
          this.gameEndWho = 'МИРНЫX'
        } else {
          this.gameEndWho = 'МАФИЯ'
        }
      }
      this.playersList = this.getJson.playerInfos.sort((a, b) => a.sitNumber - b.sitNumber)
      this.score = this.playersList.map(it => it.points)
      for (let i = 0; i < this.playersList.length; i++) {
        this.playersList[i].icon = 'fa-thumbs-up'; // Add "total": 2 to all objects in array
      }
    },
    dateFilter(value) {
      const options = {}
      options.hour = '2-digit'
      options.minute = '2-digit'
      options.second = '2-digit'
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    },
    async sendResults() {
      const response = await axios.patch(this.url + '/gameInfo/points', {
        id: this.$route.params.gameId,
        points: this.score
      }
      )
        .then(function (response) {
          return response
        }
        )
        .catch(function (error) {
          alert('Ошибка сервера ' + error)
        });
      console.log(response)
    }

  }
  // ,
  // mounted() {
  //
  //   this.playersList = this.getJson.playerInfos
  // //   console.log(this.playersList)
  //   for (let i = 0; i < this.playersList.length; i++) {
  //     this.playersList[i].icon = 'fa-thumbs-up'; // Add "total": 2 to all objects in array
  //   }
  // }
  ,

  beforeUnmount() {
    clearInterval(this.interval)
  }
  ,
  components: { AppLoader }
}

</script>

<style lang="scss" scoped>
.activ {
  position: relative;
  display: inline;


}

.activ>div,
button {
  text-align: center;
  vertical-align: text-bottom;
}

.closeModal {
  position: absolute;
  right: 20px;
  top: 30px;
}

.rulesModal {
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

.startGame {
  border: 1px solid #41b883;
  padding: 12px 2.3rem 12px 2.3rem;
  border-radius: 10px;
  background-color: #41b883;
  box-shadow: -1px 1px 4px 1px #2c3e50;
  border: 2px solid #2c3e50;
  color: #fff;
  font-weight: 700;
  font-size: 1em;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
}

.fa-user {
  color: #41B883;
}

.rules {
  color: #2c3e50;
  position: absolute;
  left: 0;
  top: 10vh;
  padding: 15px;
  border: 2px solid #2c3e50;
  border-left: 2px solid #41B883 !important;
  background-color: #41B883;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  color: #fff;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;

}


.roleOpen {
  z-index: 200;
  color: #2c3e50;
  position: absolute;
  right: 0;
  top: 10vh;
  padding: 15px;
  border: 2px solid #2c3e50;
  border-right: 2px solid #41B883 !important;
  background-color: #41B883;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  color: #fff;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
}

.activity>div>div {
  margin-left: 1px;
  margin-right: 1px;
}

.input-row {
  display: inline-block;
}

.input-row input {
  width: 50px;
  /* adjust the width as per your requirement */
  margin: 5px;
  padding: 5px;
  font-size: 30px;
  box-sizing: border-box;
}

/*ANIM*/
/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to

/* .list-complete-leave-active до версии 2.1.8 */
  {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

  {
  opacity: 0
}

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
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.roll-enter,
.roll-leave-to

/* .slide-fade-leave-active до версии 2.1.8 */
  {
  transform: translateX(10px);
  opacity: 0;
}

/*-----------------------------------------------------------------------*/
.green {
  color: #41b883;
}

.grey {
  color: #425b75;
}

.winnerText {
  padding: 12px 2.3rem 12px 2.3rem;
  border-radius: 10px;
  border: 2px solid #2c3e50;
  color: #fff;
  font-weight: 700;
  font-size: 1.5em;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
}

.usersList {
  margin-top: 11px;
  min-height: 48px;
  border-bottom: 2px solid #2c3e50;
  padding: 4px;
  text-align: center;

  span {
    display: inline-block;
    text-shadow: 1px 0 1px #000,
      0 1px 1px #000,
      -1px 0 1px #000,
      0 -1px 1px #000;
    color: #fff;
    margin-left: 11px;
  }
}

.activity {
  white-space: nowrap;
  overflow: hidden;
  float: right;

}

.playerPut {
  display: inline-block;


  //border-right: 2px solid #2c3e50;
  padding: 6px;
  padding-bottom: 9px;
  width: 30px;
  text-align: center;
  color: #425b75;
}

.playerRole {
  display: inline-block;
  padding: 2px 3px 0px 2px;
  border-right: 2px solid #2c3e50;
  border-left: 2px solid #2c3e50;
  min-height: 39px;


  //width: 30px;

  text-align: center;
  background-color: #41b883;
  color: #fff;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;

  div {
    margin-top: 3px;

  }
}

.foulAdd {
  display: inline-block;
  /*border-right: 2px solid #2c3e50;*/
  padding: 6px;
  padding-right: 10px;
  padding-bottom: 9px;
  width: 30px;
  color: #41B883;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;

}

.role {
  display: inline-block;
}

.foul {
  display: inline-block;
  //border-right: 2px solid #2c3e50;
  padding: 6px;
  width: 30px;
  padding-bottom: 9px;
  text-align: center;

  span {
    border: 1px solid #2c3e50;
    padding: 1px 4px 1px 4px;
    background-color: #ddd;
    font-weight: 700;
  }

  &.death {
    color: #000;
  }
}

.foulTake {
  display: inline-block;
  /*border-right: 2px solid #2c3e50;*/
  padding: 6px;
  padding-bottom: 9px;
  width: 30px;
  text-shadow: 0.3px 0 0.3px #425b75,
    0 0.3px 0.3px #425b75,
    -0.3px 0 0.3px #425b75,
    0 -0.3px 0.3px #425b75;
}

.playerKick {
  display: inline-block;
  padding: 6px;
  width: 30px;
  text-align: center;
}

.playerIndex {
  cursor: pointer;
  display: inline-block;
  padding: 0;
  border-right: 2px solid #2c3e50;
  padding: 6px;
  width: 30px;
  text-align: center;
  z-index: 1;
  background-color: #ff7174;
  color: #fff;
  text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;

  &.death {
    background-color: #6a6a6a;

  }

  //border-bottom-left-radius: 10px;
  //border-top-left-radius: 10px;
  //border-left: 2px solid #2c3e50;
}

.playerName {
  display: inline-block;
  padding-left: 6px;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;

  overflow: hidden;
  white-space: nowrap;
  width: 30%;
}

li.liPlayers {
  list-style-type: none;
  /* Убираем маркеры */
  border: 2px solid #2c3e50;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 5px;
  background-color: #fff;

  &.death {
    color: #ddd;
    background-color: #2c3e50 !important;
  }
}


//1
ul.ulList {
  width: 100%;
  padding: 0;
}

.card2 {
  padding: 12px;
  overflow: hidden;
  overflow-y: scroll;
}

/* хром, сафари */
.card2::-webkit-scrollbar {
  width: 0;
}

/* ie 10+ */
.card2 {
  -ms-overflow-style: none;
}

/* фф (свойство больше не работает, других способов тоже нет)*/
.card2 {
  overflow: -moz-scrollbars-none;
}

.razr {
  position: absolute;
  transform: translate(-50%, -50%) rotate(-45deg) !important;
  background-color: white;
  width: 100px;
  padding: 2px;
  border: 1px solid #2c3e50;
  color: #000000;
  text-align: center;
  font-size: 0.6em;
}
</style>
