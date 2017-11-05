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
		PlayingId:'',
	},
	mutations:{
		//储存排行榜专辑
		setRankstorage(state,arr){
			state.Rankstorage.push(...arr);
		},
		//储存歌单专辑
		setSongstorage(state,arr){
			state.Songstorage.push(...arr);
		},
		//储存要播放的音乐
		setPlayMusic(state,play){
			state.PlayMusic = play
		},
		//储存所有加载过的专辑
		setAllSongs(state,obj){
			let id = String(obj.id);
			state.AllSongs.set(id,obj);
		},
		//储存所有加载过的歌曲
		setAllSingle(state,obj){
			let id = String(obj.id);
			state.AllSingle.set(id,obj);
		},
		setPlayingId(state,id){
			state.PlayingId = String(id);
		}
	}
})