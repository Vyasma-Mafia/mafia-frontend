<template>


  <div class="row hello">
    <div class="spisok">
      <button class="btn primary btn-random" @click="$emit('randomSort', lists)">
<!--        $emit('randomSort', lists)-->
        <div></div>
      </button>

      <div class="player-list"><h3>Список игроков</h3></div>

    </div>
    <draggable
        class="list-group"

        :component-data="{
          tag: 'ul',
          type: 'transition',
          name: 'flip-list'
        }"

        :list="lists"
        v-bind="dragOptions"
        @start="startDrag"
        @end="endDrag"

        item-key="id"
    >

      <template #item="{ element, index }">
        <li class="list-group-item li-drag">
          <i
              :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
          ></i>
          <div class="list-index">{{ index + 1 }}</div>
          <div class="list-elem"><strong>{{ element.name }}</strong></div>
          <div class="list-elem-del" @click="alertDel(element)"><img src="../img/delete.svg" style="height:25px;" alt=""></div>
        </li>
      </template>

    </draggable>
    <!--    <p><strong>Прошлый:</strong>{{ oldIndex }}</p>-->
    <!--    <p><strong>Новый:</strong> {{ newIndex }}</p>-->


    <!--    <rawDisplayer class="col-3" :value="list" title="List"/>-->
    <!--    &ndash;&gt;-->
  </div>
</template>

<script>
import draggable from "vuedraggable";

document.addEventListener('contextmenu', event => event.preventDefault());
export default {
  emits: ['remove', 'randomSort', 'refresh'],
  props: ['list'],
  name: "transition-example",
  display: "Transition",
  order: 1,
  components: {
    draggable
  },
  watch: {
    list: {
      immediate: true,
      handler() {
        this.lists = this.list
      }
    }
  },
  data() {
    return {
      // drag: false,
      oldIndex: '',
      newIndex: '',
      lists: this.list,
    };
  },

  methods: {

    endDrag(evt) {
      this.isDrag = false;
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;
      this.$emit('refresh', this.lists)
    },
    startDrag() {
      this.isDrag = true;
      this.closePopup()
    },
    alertDel(elem) {
      this.$emit('remove', elem);
      }
  },
  computed: {
      list2: {
        get() {
          return this.$store.state.lists
        },
        set(value) {
          this.$store.commit('updateList', value)
        }
      },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }

  }
};
</script>

<style lang="scss" scoped>
.hello {
  display: flex !important;
  flex-direction: column;


}
.list-group {
 margin-top: 0.4rem;
  width: 87%;
}

.player-list {
  display: inline-block;
  text-align: right;
  margin-left: 1.6em;
  z-index: 0;



  h3 {
    margin-bottom: 5px;
    //color: #41b883;
    text-shadow: 1px 0 -1px #fff,
    0 1px -1px #fff,
    -1px 0 -1px #fff,
    0 -1px -1px #fff;
  }
}

.btn-random {

  z-index: 2;
  padding: 8px;
  background-color: #425b75 /*#5c7ca1*/
  !important;
  box-shadow: 0px 0px 10px 5px #2c3e50;
  border: 3px solid #41b883;
  display: inline-block;


  div {
    background: url("./Swap.svg");
    width: 24px;
    color: #425b75;
    height: 24px;
  }
}

li {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  div.list-index {
    display: inline-block;
    border-right: 2px solid #425b75;
    padding: 0.25em;
    padding-left: 16px;
    width: 40px;
    background-color: #41B883;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    font-weight: 700;
    color: #fff;
    text-shadow: 1px 0 1px #000,
    0 1px 1px #000,
    -1px 0 1px #000,
    0 -1px 1px #000;
  }

  div.list-elem {
    display: inline-block;
    padding-left: 12px;
  }
}

strong {
  display: inline-block;
}

.list-elem-del {
  display: inline-block;
  float: right;
  padding-top: 0.2rem;
  padding-right: 10px;
  padding-left: 10px;
  border-left: 2px solid #425b75;

  cursor: pointer;

}

.flip-list-move {
  transition: transform 0.8s;
}

//.no-move {
//  transition: transform 0s;
//}

.list-group {
  padding-inline-start: 0;
}


.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  box-shadow: -1px 7px 7px #2c3e50,
  1px 7px 7px #2c3e50;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  cursor: move;

}

.list-group-item i {
  cursor: pointer;
}

.sortable-chosen {
  opacity: 0;
}

.list-group-item {
  width: 100%;
  background-color: #fff;

  list-style-type: none;
  margin-bottom: 2px;

  span {
    float: right;
  }
}

.sortable-chosen {
  opacity: 0.7;
}

.sortable-drag {
  opacity: 0 !important;
}

.sortable-chosen {
  transition: transform 0s;

}


.ghost .list-index {
  //border-right: 6px solid #42b983;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  background-color: #41B883;
  box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);


  //&::after{
  //  content: " ";
  //  right: 0.6em;
  //  position: absolute;
  //  width: 20px;
  //  height: 20px;
  //  float:right;
  //  opacity: 1;
  //  background-image: url("../public/Swap.svg") ;
  //}
}
</style>
