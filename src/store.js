import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		list:[1,2],
		Songstorage:[],
		Rankstorage:[],
		PlayMusic:{},
		Playing:{},
	},
	getters:{
		getRankstorage:state => state.Rankstorage
	},
	mutations:{
		setRankstorage(state,arr){
			state.Rankstorage.push(...arr)
		},
		setSongstorage(state,arr){
			state.Songstorage.push(...arr)
		},
		setPlayMusic(state,play){
			state.PlayMusic = play
		},
	}
})