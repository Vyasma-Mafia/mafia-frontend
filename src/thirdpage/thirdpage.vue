<template>
  <div class="load" v-if="!isLoad">
    <AppLoader></AppLoader>
  </div>

  <div class="rules" @click="showModal = !showModal" v-if="isLoad"><i class="fa fa-book"></i></div>
  <!-- МОДАЛКА УДАЛЕНИЯ -->
  <v-popup v-if="isPopup" @closePopup="closePopup" @remove="removePlayer" :popupHeader="'Удаление игрока'" :btn1="'Да'"
    :btn2="'Нет'">

    <b>Вы дествительно хотите удалить игрока из игры? <p>Игрок: <span style="color: #41B883">{{ delPlayerName }}</span>
      </p></b>
  </v-popup>
  <!--  МОДАЛКА ПОБЕДЫ ПОСЛЕ УДАЛЕНИЯ -->
  <v-popup v-if="gameEnd" @goToMenu="goToMenu" :popupHeaderEnd="'Конец игры'" :btn99="'В главное меню'">

    <b style="text-align:center;">Игра завершилась победой <p><span style="text-align:center; color: #41B883">{{
      gameEndWho }} </span>
      </p></b>
  </v-popup>
  <!-- МОДАЛКB ЗАВЕРШЕНИЯ ИГРЫ -->
  <v-popup v-if="gameOver" @closePopup="closePopupGame" @endGame="endGame" :popupHeader="'Завершение игры'"
    :btn3="blackCanWin ? 'Мафия' : ''" :btn4="'Игра не состоялась'" :btn5="redCanWin ? 'Мирные' : ''"
    :btn3s="!(blackCanWin) ? 'Мафия' : ''" :btn5s="!(redCanWin) ? 'Мирные' : ''">


    <b style="margin-bottom: 11px">Уважаемый ведущий, пожалуйста укажите кто победил в этой игре.</b>
  </v-popup>

  <div class="roleOpen" @click="roleShow = !roleShow" v-if="isLoad">
    <transition name="fade" mode="out-in">

      <i class="fa fa-eye-slash" v-if="!roleShow" key="showrole"></i>
      <i class="fa fa-eye" v-else key="hiderole"></i>

    </transition>
  </div>


  <transition name="roll">
    <div class="rulesModal" v-if="showModal">
      <div class="closeModal" @click="showModal = !showModal" v-if="showModal">
        <i class="fa fa-times"></i>
      </div>



      <h1>Правила игры</h1>
      <a href="https://mafiaworldtour.com/fiim-rules">ПРАВИЛА ФИИМ</a>
    </div>
  </transition>
  <div class="container card2" v-if="isLoad">
    <div class="razr">v.1.2 Abobus</div>
    <div class="scroll">
      <div class="center">

        <TheTimer></TheTimer>
        <button v-if="!getJson.gameStarted" class="startGame" @click="startGameFunc"><span>Начать игру</span></button>
        <button v-if="getJson.gameStarted" class="startGame"><i class="fa fa-clock"></i> &nbsp; {{ dateFilter(time)
        }}</button>
      </div>
      <div class="putUsers">
        <div class="usersList">
          <transition-group name="list-complete">
            <span class="list-complete-item" v-for="people in putUsers" :key="people">{{ people }}</span>
          </transition-group>
        </div>
      </div>
      <div class="list">
        <ul class="ulList">
          <li class="liPlayers" :class="player.alive ? '' : 'death'" v-for="(player, index) in playersList"
            :key="player.playerId">
            <div class="death" v-if="player.alive">
              <div class="playerIndex" @click="showPopup(player, player.sitNumber)">{{ player.sitNumber }}</div>
              <div class="playerName">{{ player.playerName }}</div>
              <div class="activity">


                <div class="playerRole">
                  <div class="showRoles">
                    <vue-flip v-model="roleShow" width="24px" height="25px">
                      <template v-slot:front class="front">
                        <div class="maf" v-if="player.role == 'BLACK'"><img src="../img/maf.svg" alt=""
                            style="width:25px; height:25px;"></div>
                        <div class="sherif" v-if="player.role == 'SHERIFF'"><img src="../img/sherif.svg" alt=""
                            style="width:25px; height:25px;"></div>
                        <div class="red" v-if="player.role == 'RED'"><img src="../img/mirn.svg" alt=""
                            style="width:25px; height:25px;"></div>
                        <div class="don" v-if="player.role == 'DON'"><img src="../img/don.svg" alt=""
                            style="width:25px; height:25px;"></div>
                      </template>
                      <template v-slot:back class="back">
                        <div class="shirt">
                          <div class="shirt"><img src="../img/card.svg" alt="" style="width:25px; height:25px;"></div>
                        </div>
                      </template>
                    </vue-flip>
                  </div>
                </div>

                <div class="activ" v-if="!this.startGame">
                  <div class="role"><img src="../img/maf.svg" alt="" style="width:25px; height:25px;"
                      @click="roleChoose(index, player.playerId, 'BLACK')"><i class="fas"></i></div>
                  <div class="role"><img src="../img/sherif.svg" alt="" style="width:25px; height:25px;"
                      @click="roleChoose(index, player.playerId, 'SHERIFF')"><i class="fas"></i></div>
                  <div class="role"><img src="../img/mirn.svg" alt="" style="width:25px; height:25px;"
                      @click="roleChoose(index, player.playerId, 'RED')"><i class="fas"></i></div>
                  <div class="role"><img src="../img/don.svg" alt="" style="width:25px; height:25px;"
                      @click="roleChoose(index, player.playerId, 'DON')"><i class="fas"></i></div>
                </div>


                <div class="activ" v-if="this.startGame">
                  <div class="playerPut" @click="userPut(player.sitNumber, index)">
                    <i class="fas" :class="player.icon"></i>
                  </div>
                  <div class="foulTake" @click="FoulTake(index, player.playerId)"><i class="fa fa-minus"></i></div>
                  <div class="foul"><span>{{ player.foul }}</span></div>
                  <div class="foulAdd" @click="FoulAdd(index, player.playerId)"><i class="fa fa-plus"></i></div>
                </div>
                <!--            <div class="playerKick">X</div>-->
              </div>
            </div>
            <div class="deathElse" v-else>
              <div class="playerIndex" @click="relivePlayer(player)">{{ player.sitNumber }}</div>
              <div class="playerName">{{ player.playerName }}</div>
              <div class="playerRole">
                <div class="showRoles">
                  <vue-flip v-model="roleShow" width="24px" height="25px">
                    <template v-slot:front class="front">
                      <div class="maf" v-if="player.role == 'BLACK'"><img src="../img/maf.svg" alt=""
                          style="width:25px; height:25px;"></div>
                      <div class="sherif" v-if="player.role == 'SHERIFF'"><img src="../img/sherif.svg" alt=""
                          style="width:25px; height:25px;"></div>
                      <div class="red" v-if="player.role == 'RED'"><img src="../img/mirn.svg" alt=""
                          style="width:25px; height:25px;"></div>
                      <div class="don" v-if="player.role == 'DON'"><img src="../img/don.svg" alt=""
                          style="width:25px; height:25px;"></div>
                    </template>
                    <template v-slot:back class="back">
                      <div class="shirt">
                        <div class="shirt"><img src="../img/card.svg" alt="" style="width:25px; height:25px;"></div>
                      </div>
                    </template>
                  </vue-flip>
                </div>
              </div>

            </div>
          </li>

        </ul>
      </div>
    </div>
    <div class="input-row">
      <h3> Лучший ход: (по номерам) </h3>
      <input type="text" maxlength="2" placeholder="От" v-model="fromBestTurn">
      <input type="text" maxlength="2" placeholder="1" v-model="bestTurn1">
      <input type="text" maxlength="2" placeholder="2" v-model="bestTurn2">
      <input type="text" maxlength="2" placeholder="3" v-model="bestTurn3">
    </div>
  </div>

  <!--  <footerM v-if="isLoad"> </footerM>-->
  <div class="bottom">
    <button class="button-refresh-role" v-if="!getJson.gameStarted && isLoad" @click="reshuffleGame"><span>Поменять
        роли</span></button>
    <button class="button-end-game" v-else-if="isLoad" @click="showPopupGame"><span>Завершить игру</span></button>
  </div>
</template>

<script>
import TheTimer from "./TheTimer";
import VueFlip from 'vue-flip';
import vPopup from '../components/v-popup'
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
      delPlayerName: '',
      gameOver: false,
      time: new Date(),
      isPopup: false,
      startGame: false,
      showModal: false,
      putPlayer: false,
      roleShow: false,
      playersList: [],
      getJson: {},
      error: null,
      putUsers: [],
      redCanWin: false,
      blackCanWin: false,
      fromBestTurn: null,
      bestTurn1: null,
      bestTurn2: null,
      bestTurn3: null,
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
    async endGame(val) {
      // // console.log(val)
      let win;
      if (val == 'red') {
        win = 'RED_WIN';
      } else if (val == 'black') {
        win = 'BLACK_WIN';
      } else if (val == 'skip') {
        win = 'SKIP_AND_DELETE';
      }
      const end = await axios.post(this.url + '/game/finish', {
        id: this.$route.params.gameId,
        bestTurn: this.fromBestTurn == null ? null : {
          "from": this.fromBestTurn,
          "to": [this.bestTurn1, this.bestTurn2, this.bestTurn3],
        },
        result: win
      })
        .then(function (response) {
          return response
        }
        )
        .catch(function (error) {
          alert('Ошибка сервера ' + error)
        });

      if (end.status == 200) {
        router.push({ path: '/first' })
      }
    },
    async removePlayer() {
      if (this.startGame) {
        const delPlayerr = await axios.patch(this.url + '/gameInfo', {
          id: this.$route.params.gameId,
          playerId: this.delPlayer.playerId,
          fouls: this.delPlayer.foul,
          alive: false,
          role: this.delPlayer.role,
          points: 3,
        })
          .then(function (response) {
            return response
          }
          )
          .catch(function (error) {
            alert('Ошибка сервера ' + error)
          });
        if (delPlayerr.data == 'GAME_IN_PROGRESS') {
          this.playersList = this.playersList.filter((item) => item.id !== this.delPlayer.id);
          this.closePopup()
          this.putUsers = []
          this.fetchData()
        }
        if (delPlayerr.data == 'RED_WIN') {
          this.putUsers = []
          this.closePopup()
          this.gameEnd = true
          this.gameEndWho = 'МИРНЫХ'
        }
        if (delPlayerr.data == 'BLACK_WIN') {
          // console.log(this.gameEnd + this.gameEndWho)
          this.putUsers = []
          this.closePopup()
          this.gameEnd = true
          this.gameEndWho = 'МАФИИ'
        }
      }
    },
    async relivePlayer(player) {
      if (this.startGame) {
        await axios.patch(this.url + '/gameInfo', {
          id: this.$route.params.gameId,
          playerId: player.playerId,
          fouls: player.foul,
          alive: true,
          role: player.role,
          points: 3,
        }).then(function (response) {
          return response
        }
        )
          .catch(function (error) {
            alert('Ошибка сервера ' + error)
          })
      }
      this.fetchData();
    },
    async reshuffleGame() {
      const reshuffle = await axios.post(this.url + '/game/reshuffle', {
        id: this.$route.params.gameId,
        gameType: "CLASSIC"
      })
        .then(function (response) {
          return response
        }
        )
        .catch(function (error) {
          alert('Ошибка сервера ' + error)
        });
      this.getJson = reshuffle.data
      this.isReshuffle = true
      this.playersList = this.getJson.playerInfos
      // console.log(this.playersList)
      for (let i = 0; i < this.playersList.length; i++) {
        this.playersList[i].icon = 'fa-thumbs-up'; // Add "total": 2 to all objects in array
      }
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
      this.getJson = test.data
      this.isLoad = true
      this.startGame = this.getJson.gameStarted
      this.gameEnd = this.getJson.gameFinished
      this.blackCanWin = this.getJson.canBlackWin
      this.redCanWin = this.getJson.canRedWin
      if (this.startGame) {
        this.interval = setInterval(() => {
          this.time = new Date()
        }, 1000)

      }
      if (this.gameEnd) {
        if (this.gameEnd) {
          this.gameEndWho = 'МИРНЫX'
        } else {
          this.gameEndWho = 'МАФИЯ'
        }
      }
      this.playersList = this.getJson.playerInfos
      for (let i = 0; i < this.playersList.length; i++) {
        this.playersList[i].icon = 'fa-thumbs-up'; // Add "total": 2 to all objects in array
      }
    },
    async startGameFunc() {
      const startGame = await axios.post(this.url + '/game/' + this.$route.params.gameId + '/start', {
        id: this.$route.params.gameId
      })
        .then(function (response) {
          if (response.data != "OK") {
            alert('Ошибка сервера ' + response.data)
          }
          return response
        }
        )
        .catch(function (error) {
          alert('Ошибка сервера ' + error)
        });
      if (startGame) {
        this.fetchData()
        this.startGame = !this.startGame
        this.interval = setInterval(() => {
          this.time = new Date()
        }, 1000)

      }
    },
    userPut(elem, index) {
      if (this.startGame) {
        if (this.putUsers.includes(elem)) {
          this.putUsers = this.putUsers.filter((item) => item !== elem);
          this.playersList[index].icon = 'fa-thumbs-up'
          // this.$set(this.playersList[elem-1], 'icon', faThumbsUp)
          // console.log(this.playersList[elem - 1])

        } else {
          this.putUsers.push(elem)
          this.playersList[index].icon = 'fa-user'
          // this.$set(this.playersList[elem-1], 'icon', faUser)
          // console.log(this.playersList[elem - 1])

        }
      }
    },

    async roleChoose(idx, player, role) {
      if (!this.startGame) {
        await axios.patch(this.url + '/gameInfo', {
          id: this.$route.params.gameId,
          playerId: player,
          fouls: this.playersList[idx].foul,
          alive: true,
          role: role,
          points: 3,
        })
          .then(function (response) {
            return response
          }
          )
          .catch(function (error) {
            alert('Ошибка сервера ' + error)
          });
        this.playersList[idx].role = role
        this.fetchData()

      }
    },
    // MODAL DELETE
    showPopup(player, index) {
      if (this.startGame) {
        this.isPopup = true;
        this.delPlayer = player
        this.delPlayerName = '[ ' + index + ' ] ' + player.playerName
      }
    },
    closePopup() {
      this.isPopup = false;
    },
    //MODAL GAMEOVER
    showPopupGame() {
      this.gameOver = true;
    },
    closePopupGame() {
      this.gameOver = false;
    },
    async FoulTake(idx, player) {
      const fouls = this.playersList[idx].foul - 1
      if (this.playersList[idx].foul != 0) {
        this.playersList[idx].foul = this.playersList[idx].foul - 1
        const FoulTake = await axios.patch(this.url + '/gameInfo', {
          id: this.$route.params.gameId,
          playerId: player,
          fouls: fouls,
          alive: true,
          points: 3,
        })
          .then(function (response) {
            return response
          }
          )
          .catch(function (error) {
            alert('Ошибка сервера ' + error)
          });
        if (FoulTake.data == 'GAME_IN_PROGRESS') {
          this.playersList[idx].foul = this.playersList[idx].foul - 0
        }
        if (FoulTake.data == 'RED_WIN') {
          this.putUsers = []
          this.closePopup()
          this.gameEnd = true
          this.gameEndWho = 'МИРНЫХ'
        }
        if (FoulTake.data == 'BLACK_WIN') {
          this.putUsers = []
          this.closePopup()
          this.gameEnd = true
          this.gameEndWho = 'МИРНЫХ'
        }
      }
    },
    async FoulAdd(idx, player) {

      const fouls = this.playersList[idx].foul + 1
      if (this.playersList[idx].foul < 4) {
        this.playersList[idx].foul = this.playersList[idx].foul + 1
        const FoulAdd = await axios.patch(this.url + '/gameInfo', {
          id: this.$route.params.gameId,
          playerId: player,
          fouls: fouls,
          alive: true,
          points: 3,
        })
          .then(function (response) {
            return response
          }
          )
          .catch(function (error) {
            alert('Ошибка сервера ' + error)
          });
        if (FoulAdd.data == 'GAME_IN_PROGRESS') {
          this.playersList[idx].foul = this.playersList[idx].foul + 0
        }
        if (FoulAdd.data == 'RED_WIN') {
          this.putUsers = []
          this.closePopup()
          this.gameEnd = true
          this.gameEndWho = 'МИРНЫХ'
        }
        if (FoulAdd.data == 'BLACK_WIN') {
          this.putUsers = []
          this.closePopup()
          this.gameEnd = true
          this.gameEndWho = 'МИРНЫХ'
        }
      }
    },
    dateFilter(value) {
      const options = {}
      options.hour = '2-digit'
      options.minute = '2-digit'
      options.second = '2-digit'
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    },

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
  components: { TheTimer, 'vue-flip': VueFlip, vPopup, AppLoader }
}

</script>

<style lang="scss" scoped>
.deathElse {
  padding: 6px;
  color: #ddd;
  background-color: #2c3e50;
  font-weight: 700;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}


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
}

.foulTake {
  display: inline-block;
  /*border-right: 2px solid #2c3e50;*/
  padding: 6px;
  padding-bottom: 9px;
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
