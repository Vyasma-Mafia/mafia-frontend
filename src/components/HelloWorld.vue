<draggable v-model="myArray" tag="transition-group" ghost-class="ghost" @start="drag=true" @end="drag-false"
           item-key="id">
<template #item="{element}">
  <div>{{ element.name }}</div>
</template>
</draggable>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    draggable,
  },
  data() {
    return {
      myArray: [
        {name: "Angular", id: 0},
        {name: "React", id: 1},
        {name: "Vue", id: 2},
        {name: "HTML", id: 3},
        {name: "CSS", id: 4},
        {name: "Sass", id: 5},

      ],
      oldIndex: '',
      newIndex: ''
    }
  },
  methods: {
    onEnd(evt) {
      console.log(evt)
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
