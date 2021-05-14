<template>
  <div class="container card2">
    <div class="center">
      <TheTimer></TheTimer>
    </div>
    <div class="list">
      <ul class="ulList">
        <li class="liPlayers" v-for="(player, index) in playersList" :key="player.id">
          <div class="playerIndex">{{ index }}</div>
          <div class="playerName">{{ player.name }}</div>
          <div class="activity">
            <div class="playerRole">М</div>
            <div class="playerPut">O</div>
            <button class="foulAdd"><span>+</span></button>
            <div class="foul"><span>2</span></div>
            <button class="foulTake"><span>-</span></button>
            <!--            <div class="playerKick">X</div>-->
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import TheTimer from "./thirdpage/TheTimer";

export default {
  data() {
    return {
      playersList: [
        {name: 'Влад', id: 1},
        {name: 'Артём', id: 2},
        {name: 'Вова', id: 3},
        {name: 'Ира', id: 4},
        {name: 'Женя', id: 5},
        {name: 'Рома', id: 6},
        {name: 'Арсений', id: 7},
        {name: 'Милена', id: 8},
        {name: 'Оля', id: 9},
        {name: 'Тимур12345', id: 10},
        {name: 'Олег', id: 11},
        {name: 'Павел', id: 12},
        {name: 'Игнат', id: 13},
      ],
    }
  },
  components: {TheTimer}
}
</script>

<style lang="scss" scoped>
.activity > div {
  margin-left: 2px;
}
.activity {
  display: inline-block;
  float: right;
}
.playerPut {
  display: inline-block;
  padding: 0;
  //border-right: 2px solid #2c3e50;
  padding: 6px;
  width: 30px;
  text-align: center;

}

.playerRole {
  display: inline-block;
  padding: 0;
  border-right: 2px solid #2c3e50;
  border-left: 2px solid #2c3e50;
  padding: 6px;
  width: 30px;
  text-align: center;
  background-color: #41b883;
  color:#fff;
  text-shadow: 1px 0 1px #000,
  0 1px 1px #000,
  -1px 0 1px #000,
  0 -1px 1px #000;
}

.foulAdd {
  display: inline-block;
  /*border-right: 2px solid #2c3e50;*/
  padding: 6px;
  left: 8px;
  width: 22px;
  text-align: center;

  border: 1px solid #2c3e50;
  color: #fff;
  background-color: #41b883;
  padding: 0 3px 0 3px;

}

.foul {
  display: inline-block;
  //border-right: 2px solid #2c3e50;
  padding: 6px;
  width: 30px;
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
  margin-left: 4px;
  margin-right: 8px;
  width: 22px;
  text-align: center;

  border: 1px solid #2c3e50;
  color: #fff;
  background-color: #425b75;
  padding: 0 3px 0 3px;

}

.playerKick {
  display: inline-block;
  padding: 6px;
  width: 30px;
  text-align: center;
}

.playerIndex {
  display: inline-block;
  padding: 0;
  border-right: 2px solid #2c3e50;
  padding: 6px;
  width: 30px;
  text-align: center;
  z-index: 1;
  background-color:#ff7174 ;
  color:#fff;
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
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;

  overflow: hidden;
  white-space: nowrap;
  width: 30%;
}

li.liPlayers {
  list-style-type: none; /* Убираем маркеры */
  border: 2px solid #2c3e50;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 2px;
  background-color: #fff;

}

ul.ulList {
  width: 100%;
  padding: 0;
}

.card2 {
  padding: 12px
}

</style>
