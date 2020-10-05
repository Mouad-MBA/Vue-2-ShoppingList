<template>
  <b-container>
    <div class="row">
      <div class="col">
        <b-button
          pill
          class="float-right mt-3"
          @click.prevent="DeleteList"
          variant="danger"
          v-b-tooltip.hover.v-danger
          title="Click to delete the list"
          >Delete list
        </b-button>
        <p class="float-left mt-3">
          Created at : {{ list.createdAt | momentFilter }}
        </p>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <h2 class="text-center">{{ list.listName }}</h2>
      </div>
    </div>
    <div class="row mt-4">
      <addItem-form
        :index="index"
      ></addItem-form>
    </div>
    <div v-if="itemsLeft">
      <list-header></list-header>
    </div>
    <div v-else>
      <h4 class="text-center mt-5 mb-5">No items in this list</h4>
    </div>

    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="item in filteredItems"
        :class="{ completed: item.addedToCart }"
        v-bind:key="item.createdAt"
      >
        <shopping-item :itemIndex="list.items.indexOf(item)" :listIndex="index" @deleteItem="deleteItem"/>
      </li>
    </ul>
    <footer v-if="itemsLeft" class="mt-2 mb-2">
      <div class="container">
        <div class="row mt-2">
          <div class="col">
            <span class="item-count"
              ><strong>{{ remaining }}</strong> items to add to shopping cart
            </span>
          </div>
        </div>
        <div class="row mt-2">
          <a
            class="col"
            href="#"
            :class="{ selected: filter === 'all' }"
            @click.prevent="filter = 'all'"
            >All items</a
          >

          <a
            class="col"
            href="#1"
            :class="{ selected: filter === 'toAdd' }"
            @click.prevent="filter = 'toAdd'"
            >To add</a
          >

          <a
            class="col"
            href="#2"
            :class="{ selected: filter === 'added' }"
            @click.prevent="filter = 'added'"
            >In cart</a
          >
        </div>
        <div class="row mt-3 mb-3">
          <b-button
            class="col-md-6 m-auto"
            variant="danger"
            v-if="added"
            @click.prevent="deleteItemsAddedtoCart"
            v-b-tooltip.hover.bottom.v-danger
            title="Click to delete all items added to cart"
          >
            Delete items added to cart
          </b-button>
        </div>
      </div>
    </footer>
  </b-container>
</template>

<script>
import store from "../store/shoppingListStore";
import moment from "moment";
import "moment/locale/fr";
import mixin from "../mixins/mixin";
import itemsListHeader from "./itemsListHeader";
import item from "./Item"
import addItemForm from "./addItemForm";

export default {
  name: "shoppingList",
  props: {
    indexProp: {
      type: Number,
      required: true,
    },
  },

  store,

  components: {
    "list-header": itemsListHeader,
    "addItem-form": addItemForm,
    "shopping-item" : item
  },

  data() {
    return {
      index: this.$props.indexProp,
      filter: "all",
    };
  },

  computed : {
    list () {
      return this.getList(this.index)
    }, 
  },


  methods: {

    deleteItem(evt) {
      let itemtoDelete = evt.item
      this.DeleteItem({
        itemtoDelete,
        index: this.index,
      });
    },

    deleteItemsAddedtoCart() {
      this.deleteAddedtoCart(this.index)
    },

    DeleteList() {
      this.$emit('deleteList',{
        listName: this.list.listName,
        createdAt: this.list.createdAt,
      });
    },

  },

  mixins: [mixin],

  filters: {
    momentFilter(date) {
      return moment(date).local("fr").format("dddd DD MMMM YYYY à HH:mm");
    },
  },
};
</script>

<style scoped>

</style>
