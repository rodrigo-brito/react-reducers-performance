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

const initalStateRequest = {
    playlistByState: [],
    playlistByArtist: [],
    playlistByGenre: [],
    playlistByCity: [],
}

/**
 * Combined
 * -------------------------
 */
export function reducerCombined(state = initalStateRequest, action){
    switch(action.type){
        case receive:
            switch(action.requestType){
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
export function reducerPlaylistState(state = [], action){
    switch(action.type){
        case receiveState:
            return [...state, ...action.data]
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
