<template>
  <div>
    <div class="container text-center mt-3">
      <b-container>
        <nav-bar>
          <div class="row center">
            <div class="col center">
              <b-input
                class="w-50 mt-3 ml-auto mr-auto"
                type="text"
                size="lg"
                placeholder="Add a new list and press enter"
                v-model="newList"
                @keyup.enter="createNewList"
                @blur="exitNewList"
                @keypress.esc="exitNewList"
              />
            </div>
          </div>
        </nav-bar>
        <b-col>
          <div id="app">
            <b-container>
              <div
                class="border border-primary bg-white rounded mb-4"
                v-for="(list, index) in lists"
                v-bind:key="list.createdAt"
              >
                <shopping-list
                  :indexProp="index"
                  :listProp="lists[index]"
                  @deleteList="deleteListHandler"
                />
              </div>
            </b-container>
          </div>
        </b-col>
      </b-container>
    </div>
  </div>
</template>

<script>
import store from "./store/shoppingListStore";
import ShoppingList from "./components/ShoppingList";
import NavBar from "./components/NavBar";
// import { LocalStorageService } from "./services/LocalStorageService";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "App",

  store,

  beforeCreate() {
    this.$store.dispatch("initializeStore");
    console.log("Store initialized");
    // store.subscribe((mutation, state) => {
    //   this.$store.commit("UPDATE_STORE", state);
    // });
  },

  components: {
    "shopping-list": ShoppingList,
    "nav-bar": NavBar,
  },

  data() {
    return {
      newList: "",
    };
  },

  methods: {
    ...mapActions(['AddNewList','deleteList']),

    createNewList() {
      let date = new Date();
      let listToAdd = {
          listName: this.newList,
          items: [],
          createdAt: date.toISOString(),
        }
      this.AddNewList(listToAdd)
      this.newList = "";
    },

    exitNewList() {
      this.newList = "";
    },
    deleteListHandler (evt) {
      this.deleteList({
        listName : evt.listName,
        createdAt : evt.createdAt
      })
    }


    // updateList() {
    //   LocalStorageService.setList(this.lists);
    // },
  },

  // watch: {
  //   lists() {
  //     LocalStorageService.setList(this.lists);
  //   },
  // },
  computed : {
    ...mapGetters({lists : 'getLists'}),
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c4b50;
  margin-top: 60px;
}
</style>
