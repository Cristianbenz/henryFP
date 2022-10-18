import { createSlice } from '@reduxjs/toolkit';
import { ratingFilter, priceFilter, genreFilter } from './utils'

const page = window.sessionStorage.getItem('page')
	? JSON.parse(window.sessionStorage.getItem('page'))
	: 1;

const filters = window.sessionStorage.getItem('filters')
	? JSON.parse(window.sessionStorage.getItem('filters'))
	: {
		rating: 'none',
		price: 'none',
		genre: 'none',
		sort: 'none'
	};

const initialState = {
	games: [],
	filterGames: [],
	details: {},
  	wishes: [],
	page,
	loading: false,
	filters
};




const videoGameSlice = createSlice({
	name: 'videogames',
	initialState,
	reducers: {
		getAllGames: (state, { payload }) => {
			state.games = payload;
			state.filterGames = payload;
			state.loading = false
		},
		getGameById: (state, { payload }) => {
			state.details = payload;
			state.loading = false
		},
		applyFilters: (state) => {
			let newFilter = state.games
			newFilter = ratingFilter(newFilter, state.filters.rating)
			newFilter = priceFilter(newFilter, state.filters.price)
			newFilter = genreFilter(newFilter, state.filters.genre)
			state.filterGames = newFilter
			const parseFilters = JSON.stringify(state.filters)
			window.sessionStorage.setItem('filters', parseFilters)
		},
		filterByPrice: (state, { payload }) => {
			state.filters = {
				...state.filters,
				price : payload
			}
		},
		filterByRating: (state, { payload }) => {
			state.filters = {
				...state.filters,
				rating: payload
			};
		},
		filterByGenre: (state, { payload }) => {
			state.filters = {
				...state.filters,
				genre: payload
			};
		},
		orderAlphabetically: (state, { payload }) => {
			state.filters = {
				...state.filters,
				rating: payload
			};
		},
		filterBySearch: (state, { payload }) => {
			state.filterGames = payload;
		},
    	addToWishes: (state, { payload }) => {
				state.wishes =  [...state.wishes, payload]
		},
		removeToWishes: (state, { payload }) => {
				state.wishes = state.wishes.filter(((e) => e.name !== payload))
		},
		changePage: (state, { payload }) => {
			state.page = payload
			const parsePage = JSON.stringify(state.page)
			window.sessionStorage.setItem('page', parsePage)
		},
		setLoading: (state) => {
			state.loading = true
		},
		cleanFilter: (state, { payload }) => {
			state.games = payload
		}
	},
});

export const {
	getAllGames,
	getGameById,
	applyFilters,
	filterByPrice,
	filterByRating,
	filterByGenre,
	orderAlphabetically,
	filterBySearch,
  addToWishes, 
  removeToWishes,
  changePage,
	setLoading,
	cleanFilter
} = videoGameSlice.actions;

export default videoGameSlice.reducer;