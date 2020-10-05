<template>
  <div class="col-md-12 mt-2 mb-2">
    <b-form inline @submit="addItem">
      <label class="col" for="inline-form-input-name">
        {{ labels.itemName | asterix }}
      </label>
      <b-input
        id="inline-form-input-name"
        class="col-md-4"
        placeholder="Add new item... "
        v-model="newItem.name"
        required
      ></b-input>
      <label class="col" for="inline-form-input-quantity">
        {{ labels.quantity | asterix }}
      </label>
      <b-input
        type="number"
        min="1"
        id="inline-form-input-quantity"
        class="col-md-1"
        v-model="newItem.quantity"
        required
      ></b-input>
      <label class="col-md-1 mr-1" for="inline-form-custom-select-unit"
        >Unit</label
      >
      <b-form-select
        id="inline-form-custom-select-unit"
        class="mr-1"
        :options="['Unit', 'Kg', 'Liter']"
        :value="null"
        placeholder="'Choose the unit...'"
        v-model="newItem.unit"
      ></b-form-select>

      <b-button
        class="col-md-1 ml-4 mr-4"
        type="submit"
        variant="primary"
        v-b-tooltip.hover.v-info
        title="Click to add the item"
      >
        Add
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    newItemProp: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newItem: this.$props.newItemProp,
      labels: {
        itemName: "Item name",
        quantity: "Quantity",
      },
    };
  },
  filters: {
    asterix(expression) {
      return expression + " * ";
    },
  },
  methods: {
    addItem() {
      this.$emit("addItem");
    },
  },
  // watch: {
  //   newItem: {
  //     handler() {
  //       this.$emit("update:newItem", this.newItem);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

