<template>

  <div class="container">

    <app-alert :alert="alert" @close="alert = null"></app-alert>

    <form @submit.prevent="changes">
      <div class="card">
        <h2>Работа с базой данных</h2>
        <div class="form-control">
          <label for="name">ВЫАЫВ</label>
          <input type="text" id="name" v-model.trim="name">
        </div>
        <button class="btn primary" @click="loadPeople">werwer</button>
      </div>
    </form>

    <app-loader v-if="loading"></app-loader>

    <app-people-list
        v-else
        :people="people"
        @load="loadPeople"
        @remove="removePerson"
    ></app-people-list>
  </div>

</template>

<script>

import AppPeopleList from "@/AppPeopleList";
import axios from 'axios'
import AppAlert from "./AppAlert";
import AppLoader from "./AppLoader";

export default {
  data() {
    return {
      name: '',
      people: [],
      alert: null,
      loading: false
    }
  },
  mounted() {
    this.loadPeople()
  },
  methods: {
    async changes() {
      // const xhr = new XMLHttpRequest()
      // xhr.open('GET', 'http://itmomafia.herokuapp.com/player/')
      //
      // xhr.onload = () => {
      //   console.log(xhr.response)
      // }
      // xhr.send()

      const response = await fetch(
          'http://itmomafia.herokuapp.com/player/',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.name
            })
          })
      const test = await response.json()
      this.people.push({
        name: this.name,
        id: test
      })
      console.log(test)
      this.name = ''
    },
    async loadPeople() {
      try {
        this.loading = true;
        const {data} = await axios.get('http://itmomafia.herokuapp.com/player/')
        setTimeout(() => {
          this.people = data

          this.loading = false;
        }, 1)

      } catch (e) {
        this.loading = false;
        this.alert = {
          type: 'danger',
          title: 'Ошибка',
          text: e.message
        }
        console.log(e.message);
      }
      //const {data} = await axios.get('http://itmomafia.herokuapp.com/player/')
      // const result = Object.keys(data).map(
      //   key => {
      //     return {
      //       id: data[id],
      //       name: data[name]
      //     }
      //   }
      // )



    },
    async removePerson(id) {
      try {
        const person = this.people.find(person => person.id === id).name
        await axios.delete(`http://itmomafia.herokuapp.com/player/${id}`)
        this.people =  this.people.filter(person => person.id !== id)
        this.alert = {
          type: 'primary',
          title: 'Успешно!',
          text: `Пользователь с именем "${person}" был удален`
        }
      }catch (e) {

      }

    }
  },
  components: {AppPeopleList, AppAlert, AppLoader}
}
</script>

<style>

</style>
