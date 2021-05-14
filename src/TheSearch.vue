<template>
  <div class="div-search ">
    <div class="form-control center inputBox">
    <input
        v-model="search"
        type="search"
        class="search"
        placeholder="Имя игрока"
        />

    </div>
    <div class="container">
      <div class="search-box">
      <div v-for="item in searchHandler" :key="item.id" class="search-box-b">
        <div class="search-box-item nochose" :id="item.id" @click="$emit('addList', item)"> <div class="box-item">{{ item.name }}</div> </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  emits: ['addList', 'updateColor'],
  props: ['persons', 'personsChose'],
  watch: {
    personsChose: {
      immediate: true,
      handler() {
        this.personLocal = this.personsChose

      }
    }
  },
  data() {
    return {
      search: '',
      personLocal: this.personsChose
    }
  },


   computed: {

     searchHandler() {

       this.$emit('updateColor', this.personLocal)
       return this.persons.filter(element => {
         return element.name.toLowerCase().includes(this.search.toLowerCase())
      });

     }
   }
}
</script>

<style scoped>


.container{
  max-height: 20vh;
  min-height: 20vh;
  overflow: hidden;
  overflow-y: scroll;
  border:2px solid #2c3e50;
  border-radius: 1em;
  padding: 5px;
}

 .search {
   display: flex;
   margin: 1em;
   margin-bottom: 2px !important;
   width:50%;
   border-radius: 15px;
 }
 .search-box {
   display: flex;
   flex-direction: row;
   flex-flow: wrap;

 }
 .search-box-b {
   padding: 4px;
   width: 33%;
 }
 .chose {
   border: 3px solid #41b883 !important;
   font-weight: 700;
  background-color: #fff;
   border-radius: 7px;
   font-size: 12.5px;
   padding: 3px 0 3px 0 !important;
   box-shadow: 2px 2px 2px 2px #2c3e50;
   color: #425b75!important;
 }
 .search-box-item{
   border: 2px solid #fff;
   font-weight: 700;
   padding-left: 1px;
   padding-right: 1px;
   padding-top:4px;
   padding-bottom:4px;
   border-radius: 8px;
   font-size: 12.5px;
   color: #fff;
   cursor:pointer;
 }
 .box-item{
   display: inline-block;
   padding: 3px;
 }
</style>
