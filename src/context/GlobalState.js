import React, {useReducer, useEffect, createContext} from 'react'
import AppReducer from './AppReducer'

// initial state
const initialState = {
    watchlist: localStorage.getItem('watchlist') ?
                JSON.parse(localStorage.getItem('watchlist')) : [],
    watched: localStorage.getItem('watched') ?
                JSON.parse(localStorage.getItem('watched')) : []
}

// create context
export const GlobalContext = createContext(initialState)

// provider components
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
        localStorage.setItem('watched', JSON.stringify(state.watched))
    },[state])

    // action
    const addMovieToWatchlist = movie => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: movie})
    }

    const removeMovieFromWatchlist = id => {
        if(window.confirm("Are you sure you want to delete?")){
            dispatch({type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id})
        }
    }

    const addMovieToWatched = movie => {
        dispatch({type: "ADD_MOVIE_TO_WATCHED", payload: movie})
    }

    const removeMovieFromWatched = id => {
        if(window.confirm("Are you sure you want to delete?")){
            dispatch({type: "REMOVE_MOVIE_FROM_WATCHED", payload: id})
        }
    }

    const moveToWatchlist = movie => {
        dispatch({type: "MOVE_TO_WATCHLIST", payload: movie})
    }

    return (
        <GlobalContext.Provider 
            value={{
                watchlist: state.watchlist,
                watched: state.watched,
                addMovieToWatchlist,
                removeMovieFromWatchlist,
                addMovieToWatched,
                removeMovieFromWatched,
                moveToWatchlist,
            }}
        >{props.children}</GlobalContext.Provider>
    )
}