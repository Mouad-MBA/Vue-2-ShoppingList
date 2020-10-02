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
                v-bind:key="list.name"
              >
                <shopping-list
                  :listProp.sync="lists[index]"
                  @delete-list="deleteList"
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
import ShoppingList from "./components/ShoppingList";
import NavBar from "./components/NavBar";
import { LocalStorageService } from "./services/LocalStorageService";

export default {
  name: "App",

  components: {
    "shopping-list": ShoppingList,
    "nav-bar": NavBar,
  },

  data() {
    return {
      lists: LocalStorageService.getList(),
      newList: "",
    };
  },

  methods: {
    createNewList() {
      let date = new Date();

      if (this.lists.length > 0) {
        this.lists.push({
          listName: this.newList,
          items: [],
          createdAt: date.toISOString(),
        });
      } else {
        this.lists = [
          {
            listName: this.newList,
            items: [],
            createdAt: date.toString(),
          },
        ];
      }
      this.newList = "";
      LocalStorageService.setList(this.lists);
    },

    exitNewList() {
      this.newList = "";
    },

    deleteList(evt) {
      this.lists = this.lists.filter((list) => list.listName !== evt.listName);
      LocalStorageService.setList(this.lists);
    },

    updateList() {
      LocalStorageService.setList(this.lists);
    },
  },

  watch: {
    lists() {
      LocalStorageService.setList(this.lists);
    },
  },
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
