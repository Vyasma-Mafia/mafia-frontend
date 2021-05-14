<template>

  <vPopup
      v-if="isDelete"
      @closePopup="closePopup"
      @remove="removeFromList(delItem)"
      :popupHeader="'Удаление игрока'"
      :btnStr2="'Да'"
      :btnStr3="'Нет'"
  >

    <b>Вы дествительно хотите удалить игрока из списка?</b>
  </vPopup>

  <div class="load" v-if="!isLoad">
    <AppLoader></AppLoader>
  </div>
  <div class="container card2" v-if="isLoad">
    <div class="form-control center" id="inputDiv" :class="inputWarning ? '' : 'invalid'" @submit.prevent="">
      <input
          type="text"
          class="inputAdd"
          ref="addInput"
          id="addPlayer"
          @input="assertMaxChars"
          v-model="value"/>
      <button class="button-add" @click="addPlayer"><span>Добавить</span></button>
    </div>
    <TheSearch
        @addList="colorChange"
        :persons="persons"
        :personsChose="provList"
        @updateColor="colorAddSearch"
    ></TheSearch>
    <DragList
        v-if="list.length > 0"
        :list="list"
        @refresh="refreshList"
        @remove="isDelete = true; delItem = $event"
        @randomSort="randomSort"></DragList>

    <footerM></footerM>
  </div>
  <div class="bottom" v-if="isLoad">

    <button class="button-start-game" :disabled="list.length < 8" @click="roteThirdPage"><span>Начать игру</span>
    </button>

  </div>
</template>

<script>
import axios from 'axios'
import footerM from "../components/footerM";
import DragList from "./DragList";
import TheSearch from "./TheSearch";
import AppLoader from "../components/AppLoader";
import router from "../router";
import vPopup from '../components/v-popup';

export default {
  data() {
    return {
      url: 'http://itmomafia.herokuapp.com',
      isLoad: false,
      delItem: null,
      inputWarning: true,
      search: '',
      persons: [],
      isDelete: false,
      provList: [],
      list: [],
      value: '',
      maxLengthInCars: 8,
      minLengthInCars: 3
    }
  },
  mounted() {
    this.loadPeople()
  },
  methods: {
    closePopup() {
      this.isDelete = false;
    },
    refreshList(evt) {
      this.provList = evt
      // // console.log(this.provList)
    },
    async roteThirdPage() {
      // // console.log(this.provList)
      // // console.log(this.provList.map(item => item.id))
      await axios.post(this.url + '/game', {
        gameType: "CLASSIC",
        playersIds: this.provList.map(item => item.id)
      })
          .then(function (response) {
            router.push({name: 'third', params: {gameId: response.data}})
            // console.log(response.data)
          })
          .catch(function (error) {
            alert('Ошибка сервера ' + error)
          });
    },
    async loadPeople() {

      const {data} = await axios.get(this.url + '/player')
      this.persons = data
      setTimeout(() => {
        this.isLoad = true
      }, 0)
    },

    removeFromList($event) {
      const idToRemove = $event.id
      this.list = this.list.filter((item) => item.id !== idToRemove);
      let SearchIdElement = document.getElementById($event.id)
      SearchIdElement.classList.add("nochose");
      SearchIdElement.classList.remove("chose");
      this.provList = this.provList.filter((item) => item.id !== idToRemove);
      this.closePopup()
    },
    randomSort(evt) {
      this.refreshList(evt)
      this.list = evt.sort(function () {
        return Math.random() - 0.5;

      });
    },

    colorChange(element) {
      let SearchIdElement = document.getElementById(element.id)
      const idToRemove = element.id
      if (SearchIdElement.classList.contains('nochose')) {
        SearchIdElement.classList.add("chose");
        SearchIdElement.classList.remove("nochose");
        this.list.push(element)
        this.provList.push(element)


      } else {
        SearchIdElement.classList.add("nochose");
        SearchIdElement.classList.remove("chose");
        // // console.log(element)
        this.list = this.list.filter((item) => item.id !== idToRemove);
        this.provList = this.provList.filter((item) => item.id !== idToRemove);
        // //console.log(this.provList)
      }
    },
    async addPlayer() {

      if (this.value.length <= this.minLengthInCars) {
        this.inputWarning = false
        // // console.log(1)
        this.$refs.addInput.blur()

      } else {
        const res = await axios.post(this.url + '/player', {
          name: this.value
        })
            .then(function (response) {
              if (response.data !== 'CONFLICT') {
                return response
              }
            })
            .catch(function () {
              return 400
            });
        let elementNew = {
          name: this.value,
          id: res.data
        }

        if (res != 400) {
          let el = document.getElementById("inputDiv");
          el.classList.remove("invalid");
          this.value = ''
          this.persons.push(elementNew)
          this.provList.push(elementNew)
          this.list.push(elementNew)
        }else {
          console.log(res)
          this.inputWarning = false
          this.$refs.addInput.blur()
        }

      }

    },
    colorAddSearch(elems) {
      // //console.log(1);
      // //console.log(elems);
      if (elems) {
        // //console.log(2);
        // //console.log(elems)
        elems.forEach(function (arrayItem) {
          setTimeout(function () {
            let id = arrayItem.id

            let SearchIdElement = document.getElementById(id)
            if (SearchIdElement) {
              SearchIdElement.classList.add("chose");
              SearchIdElement.classList.remove("nochose");
            }
          }, 0);
        })
      }
    },

    assertMaxChars: function () {

      if (this.value.length >= this.maxLengthInCars) {
        this.value = this.value.substring(0, this.maxLengthInCars);
      }

    }
  },
  // computed: {
  //   searchHandler() {
  //
  //     return this.persons.filter(element => {
  //       return element.name.toLowerCase().includes(this.search.toLowerCase())
  //     });
  //
  //   }
  // },
  components: {footerM, DragList, TheSearch, AppLoader, vPopup}
}
</script>

<style>

</style>
