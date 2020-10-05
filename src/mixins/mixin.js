import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["AddNewList", "deleteList", "AddNewItem", "DeleteItem","deleteAddedtoCart","changeAdded"]),
  },

  computed: {
    ...mapGetters({lists : 'getLists'}),
    ...mapGetters(['getList','getItem','getRemaining','getAddedItems','getToAddItems','getAllItems']),

    remaining() {
      return this.getRemaining(this.index);
    },

    added() {
      return this.getAddedItems(this.index) 
    },

    filteredItems() {
      if (this.filter === "toAdd") {
        return this.getToAddItems(this.index);
      } else if (this.filter === "added") {
        return this.getAddedItems(this.index)
      }
      return this.getAllItems(this.index);
    },

    itemsLeft() {
      return this.getAllItems(this.index).length > 0;
    }
  }
}
