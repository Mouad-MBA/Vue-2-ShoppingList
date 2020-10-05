import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorageService } from "../services/LocalStorageService";

Vue.use(Vuex);



export default new Vuex.Store({
    state: {
        lists: []
    },
    mutations: {
        INITIALIZE_STORE(state, payload) {
            state.lists = payload
        },
        // UPDATE_STORE : (state, payload) => {
        //     state.lists = payload
        // },
        ADD_NEW_LIST: (state, list) => {
            state.lists.push(list)
        },
        ADD_NEW_ITEM: (state, payload) => {
            state.lists[payload.index].items.push(payload.item)
        },
        DELETE_LIST: (state, list) => {
            state.lists = state.lists.filter(i => !(i.listName === list.listName && i.createdAt === list.createdAt))
        },
        DELETE_ITEM: (state, payload) => {
            state.lists[payload.index].items = state.lists[payload.index].items.filter((i) => i !== payload.itemtoDelete) 
        },
        CHANGE_ADDED: (state, payload) => {
            state.lists[payload.listIndex].items[payload.itemIndex].addedToCart = payload.val
        },
        DELETE_ADDED: (state,index) => {
            state.lists[index].items = state.lists[index].items.filter((item) => !item.addedToCart);
        }
    },
    getters: {
        getLists: (state) => { return state.lists },
        // getList : (state, index) => state.lists[index] ? state.lists[index] : {},
        // getItems : (state, index) => state.lists[index]  ? (state.lists[index].items ? state.lists[index].items : []) : []
        getList : (state) => (index) => { return state.lists[index] }

    },
    actions: {
        initializeStore(state) {
            const lists = LocalStorageService.getList()
            state.commit('INITIALIZE_STORE', lists)
        },
        // updateStore (state) {
        //     LocalStorageService.setList(state.lists)
        // },
        deleteList(state, list) {
            state.commit('DELETE_LIST', list)
            LocalStorageService.setList(this.state.lists)
        },
        AddNewList(state, list) {

            state.commit('ADD_NEW_LIST', list)
            LocalStorageService.setList(this.state.lists)


        },
        AddNewItem(state, payload) {

            state.commit('ADD_NEW_ITEM', payload)
            LocalStorageService.setList(this.state.lists)


        },
        DeleteItem(state, payload) {
            state.commit('DELETE_ITEM', payload)
            LocalStorageService.setList(this.state.lists)
        },
        changeAdded(state, payload) {
            state.commit('CHANGE_ADDED', payload)
            LocalStorageService.setList(this.state.lists)
        },
        deleteAddedtoCart(state,index) {
            state.commit('DELETE_ADDED',index)
            LocalStorageService.setList(this.state.lists)
        }

    },
    strict: true
})