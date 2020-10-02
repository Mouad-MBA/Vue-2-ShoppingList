export default {
  computed: {
    remaining() {
      return this.list.items.filter((item) => !item.addedToCart).length;
    },

    added() {
      return this.list.items.filter((item) => item.addedToCart).length;
    },

    filteredItems() {
      if (this.filter === "toAdd") {
        return this.list.items.filter((item) => !item.addedToCart);
      } else if (this.filter === "added") {
        return this.list.items.filter((item) => item.addedToCart);
      }
      return this.list.items;
    },

    allAdded: {
      get() {
        return this.remaining === 0;
      },

      set(value) {
        this.list.items.forEach((item) => {
          item.addedToCart = value;
        })
      }
    },

    itemsLeft() {
      return this.list.items.length > 0;
    }
  }
}
