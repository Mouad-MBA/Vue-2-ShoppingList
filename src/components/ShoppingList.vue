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
          Created at : {{ listCreatedAt | momentFilter }}
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
        :newItemProp.sync="newItem"
        @addItem="addItem"
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
        v-bind:key="item.name"
      >
        <div class="row">
          <b-form-checkbox
            size="lg"
            v-model="item.addedToCart"
            class="col-md-2 m-auto"
          />
          <div
            class="col-md-2 m-auto"
            v-bind:class="{ added: item.addedToCart }"
          >
            {{ item.name }}
          </div>
          <div
            class="col-md-2 m-auto"
            v-bind:class="{ added: item.addedToCart }"
          >
            {{ item.quantity }}
          </div>
          <div
            class="col-md-2 m-auto"
            v-bind:class="{ added: item.addedToCart }"
          >
            {{ item.unit }}
          </div>
          <div
            class="col-md-2 m-auto"
            v-bind:class="{ added: item.addedToCart }"
          >
            {{ item.createdAt | moment("DD/MM/YY HH:mm") }}
          </div>
          <b-button
            pill
            variant="danger"
            class="col-md-auto m-1 mr-4 ml-4"
            @click.prevent="deleteItem(item)"
            v-b-tooltip.hover.top.v-danger
            title="Click to delete this item"
            >X
          </b-button>
        </div>
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
            @click.prevent="deleteAddedtoCart"
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
import moment from "moment";
import "moment/locale/fr";
import mixin from "../mixins/mixin";
import itemsListHeader from "./itemsListHeader";
import addItemForm from "./addItemForm";

export default {
  props: {
    listProp: {
      type: Object,
      required: true,
    },
  },

  components: {
    "list-header": itemsListHeader,
    "addItem-form": addItemForm,
  },

  data() {
    return {
      list: {
        listName: this.$props.listProp.listName,
        listCreatedAt: this.$props.listProp.createdAt,
        items: this.$props.listProp.items,
      },
      listCreatedAt: this.$props.listProp.createdAt,
      newItem: {
        name: "",
        addedToCart: false,
        quantity: null,
        unit: "",
        createdAt: null,
      },
      filter: "all",
    };
  },

  watch: {
    list: {
      handler() {
        this.$emit("update:listProp", this.list);
      },
      deep: true,
    },
  },

  methods: {
    addItem() {
      this.newItem.createdAt = new Date().toISOString();
      this.list.items.push(this.newItem);
      this.newItem = {
        name: "",
        addedToCart: false,
        quantity: null,
        unit: "",
        createdAt: "",
      };
    },

    deleteItem(item) {
      this.list.items = this.list.items.filter((i) => i !== item);
    },

    deleteAddedtoCart() {
      this.list.items = this.list.items.filter((item) => !item.addedToCart);
    },

    DeleteList() {
      this.$emit("delete-list", {
        listName: this.list.listName,
      });
    },

    setAdded(value) {
      this.list.items.forEach((item) => {
        item.addedToCart = value;
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
.added {
  color: #d9d9d9;
  text-decoration: line-through;
}
</style>
