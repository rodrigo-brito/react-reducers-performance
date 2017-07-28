import React from "react";
import {reducerCombined, receive, testUpdate, oldUpdate} from "./reducer";
import expect from "expect.js";

it('should execute the old reducer', () => {
    console.time('old reducer');
    const state = reducerCombined(undefined, {
        type: receive,
        requestType: oldUpdate,
        data: [
            {id: 2, name: "Rodrigo", idade: 23},
            {id: 3, name: "Guilherme", idade: 25},
        ],
        payload: {
            genre: "rock"
        }
    })
    console.timeEnd('old reducer');
    expect(state.filteredBy.genre["rock"]).to.eql([2, 3])
    expect(state.byID[2]).to.eql({id: 2, name: "Rodrigo", idade: 23})
    expect(state.byID[3]).to.eql({id: 3, name: "Guilherme", idade: 25})
    //console.log(state)
});

it('should execute the new reducer', () => {
    console.time('new reducer');
    const state = reducerCombined(undefined, {
        type: receive,
        requestType: testUpdate,
        data: [
            {id: 2, name: "Rodrigo", idade: 23},
            {id: 3, name: "Guilherme", idade: 25},
        ],
        payload: {
            genre: "rock"
        }
    })
    console.timeEnd('new reducer');
    expect(state.filteredBy.genre["rock"]).to.eql([2, 3])
    expect(state.byID[2]).to.eql({id: 2, name: "Rodrigo", idade: 23})
    expect(state.byID[3]).to.eql({id: 3, name: "Guilherme", idade: 25})
    //console.log(state)
});