<template>
  <div class="footer mt-2 mb-2">
    <footer>
      <div class="container">
        <div class="row">
          <div class="col">
            <span class="item-count"
              ><strong>{{ remaining }}</strong> items to add to shopping cart
            </span>
          </div>
        </div>
        <div class="row">
          <a
            class="col"
            href="#"
            :class="{ selected: filter === 'all' }"
            @click.prevent="filter = 'all'"
          >
            All items</a
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
        <div class="row">
          <b-button
            class="col-md-6 m-auto"
            variant="danger"
            v-if="added"
            @click.prevent="deleteAddedtoCart"
          >
            Delete items added to cart
          </b-button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import mixin from "../mixins/mixin";
export default {
  mixins: [mixin],
};
</script>
