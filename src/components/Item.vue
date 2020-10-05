<template>
  <div class="row">
          <b-form-checkbox
            size="lg"
            v-model="addedToCart"
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
            @click.prevent="deleteItem"
            v-b-tooltip.hover.top.v-danger
            title="Click to delete this item"
            >X
          </b-button>
        </div>
</template>

<script>
import store from "../store/shoppingListStore";
import mixin from "../mixins/mixin";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "shoppingItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    listIndex : {
        type : Number,
        required: true
    }
  },

  store,

  methods : {
      ...mapActions(['changeAdded']),
      deleteItem (){
          this.$emit('deleteItem', {
              item : this.item 
          })
      }
  },
  computed : {
      ...mapGetters([]),
      addedToCart : {
          get() {
          let itemIndex = this.$store.state.lists[this.listIndex].items.indexOf(this.item) 
              return this.$store.state.lists[this.listIndex].items[itemIndex].addedToCart
          },
          set(val) {
            let itemIndex = this.$store.state.lists[this.listIndex].items.indexOf(this.item) 
            this.changeAdded({
                listIndex : this.listIndex,
                itemIndex,
                val
            })
          } 
      }
  },
  mixins : [mixin]
}
</script>

<style scoped>
.added {
  color: #d9d9d9;
  text-decoration: line-through;
}
</style>