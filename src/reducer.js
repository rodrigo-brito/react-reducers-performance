import { combineReducers } from 'redux'
import update from 'immutability-helper';

export const request = "request"
export const receive = "receive"

export const testUpdate = "test_update"
export const oldUpdate = "old_update"

/**
 * 500 Entities, 100 genres and states filters, with 5 to 10 ids each.
 */
function getInitialFakeState() {
    let state = {
        byID: {},
        filteredBy: {
            state: {},
            genre: {}
        }
    };
    for(let i = 0; i < 500; i++){
        state.byID[i] = {id: i, name: "Fake Name " + i, idade: i+i}
    }
    for(let i = 0; i < 100; i++){
        state.filteredBy.genre["genre-" + i] = [1, 2, 3, 4, 5, 7, 8 ,9, 10]
        state.filteredBy.state["state-" + i] = [1, 2, 3, 4, 5]
    }
    return state
}

/**
 * Combined
 * -------------------------
 */
export function reducerCombined(state = getInitialFakeState(), action){
    switch(action.type){
        case receive:
            const IDs = [], Items = {}
            action.data.map(item => {
                IDs.push(item.id)
                Items[item.id] = item
            })
            switch(action.requestType){
                case testUpdate:
                    return update(state, {
                        byID: {$merge: Items},
                        filteredBy: {genre: {[action.payload.genre]: {$set: IDs}}},
                    });
                case oldUpdate:
                    return {
                        ...state,
                        byID: {
                            ...state.byID,
                            ...Items,
                        },
                        filteredBy: {
                            ...state.filteredBy,
                            genre: {
                                ...state.filteredBy.genre,
                                [action.payload.genre]: IDs
                            }
                        }
                    }
            }
        case request:
            // Loading updates and more...
            break
        default:
            return state
    }
}
