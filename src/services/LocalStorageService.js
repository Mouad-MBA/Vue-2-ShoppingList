export const LocalStorageService = {

  getList() {
    try {
      let item = window.localStorage.getItem('shoppingLists')
      return item ? window.JSON.parse(item) : []
    } catch (err) {
      return []
    }
  },

  setList(value) {
    window.localStorage.setItem('shoppingLists', window.JSON.stringify(value))
  },

  removeList() {
    window.localStorage.removeItem('shoppingLists')
  },

  updateList(value = {}) {
    LocalStorageService.setList(value)
  }
}
