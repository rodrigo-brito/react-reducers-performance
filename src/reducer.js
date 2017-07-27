import { combineReducers } from 'redux'
import update from 'immutability-helper';

export const playlistByState = "playlistByState"
export const playlistByArtist = "playlistByArtist"
export const playlistByGenre = "playlistByGenre"
export const playlistByCity = "playlistByCity"
export const request = "request"
export const receive = "receive"

export const receiveState = "receiveState"
export const receiveArtist = "receiveArtist"
export const receiveGenre = "receiveGenre"
export const receiveCity = "receiveCity"


export const testUpdate = "test_update"

const initalStateRequest = {
    playlistByState: [],
    playlistByArtist: [],
    playlistByGenre: [],
    playlistByCity: [],
    byID = {},
    filteredBy: {
        state: {},
        genre: {}
    }
}

function getInitialFakeState() {
    let state = {...initalStateRequest};
    for(let i = 0; i < 100; i++){
        byID[i] = {id: i, name: "Nome fake " + i, idade: i+i}
    }
    for(let i = 0; i < 20; i++){
        state.filteredBy.genre["genre-" + i] = [1, 2, 3, 4, 5, 7, 8 ,9, 10]
        state.filteredBy.state["state-" + i] = [1, 2, 3, 4, 5]
    }
}

/**
 * Combined
 * -------------------------
 */
export function reducerCombined(state = getInitialFakeState, action){
    switch(action.type){
        case receive:
            const IDs = []
            const Items = action.data.map(item => {
                IDs.push(item.id)
                return {
                    [item.id]: item
                }
            })
            switch(action.requestType){
                case testUpdate:
                    return update(state, {
                        byID: {$merge: Items},
                        filteredBy: {state: {[action.payload.genre]: {$set: IDs}}},
                    });
                case testActual:
                    const genre = action.data
                    const genre = action.payload.genre
                    let byID = {...satate.byID}


                    return {
                        ...state,
                        byID,
                        filteredBy: {...state.filteredBy,
                            [genre]: IDs
                        }
                    }
                case playlistByArtist:
                    return {
                        ...state,
                        playlistByArtist: [...state.playlistByArtist, ...action.data]
                    }
                case playlistByCity:
                    return {
                        ...state,
                        playlistByCity: [...state.playlistByCity, ...action.data]
                    }
                case playlistByGenre:
                    return {
                        ...state,
                        playlistByGenre: [...state.playlistByGenre, ...action.data]
                    }
                case playlistByState:
                    return {
                        ...state,
                        playlistByState: [...state.playlistByState, ...action.data]
                    }
                default:
                    return state
            }
        case request:
            // Atualizações de loading...
            break
        default:
            return state
    }
}


/**
 * Fragmented
 * -------------------------
 */
export const reducerFragmented  = combineReducers({
      reducerPlaylistArtist,
      reducerPlaylistCity,
      reducerPlaylistGenre,
      reducerPlaylistState
})

export function reducerPlaylistState(state = [], action){
    switch(action.type){
        case receiveState:
            let customState = [...state, ...action.data]
            return customState
        // remove, muda posição, entre outros...
        default:
            return state
    }
}

export function reducerPlaylistArtist(state = [], action){
    switch(action.type){
        case receiveArtist:
            return [...state, ...action.data]
        // remove, entre outros...
        default:
            return state
    }
}

export function reducerPlaylistGenre(state = [], action){
    switch(action.type){
        case receiveGenre:
            return [...state, ...action.data]
        // remove, atualiza, entre outros...
        default:
            return state
    }
}

export function reducerPlaylistCity(state = [], action){
    switch(action.type){
        case receiveCity:
            return [...state, ...action.data]
        // remove, atualiza, entre outros...
        default:
            return state
    }
}
