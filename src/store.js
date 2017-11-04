import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		list:[1,2],
		Songstorage:[],//歌单
		Rankstorage:[],//排行榜
		PlayMusic:{},//正在播放的音乐
		AllSongs:new Map(),//所有加载过的歌单
		AllSingle:new Map(),//所有加载过的单曲
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
		setAllSongs(state,obj){
			let id = String(obj.id);
			state.AllSongs.set(id,obj);
		},
		setAllSingle(state,obj){
			let id = String(obj.id);
			state.AllSingle.set(id,obj);
		},
	}
})