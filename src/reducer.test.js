import React from "react";
import {reducerCombined, receive, testUpdate} from "./reducer";
import expect from "expect.js";

it('should execute the reducer', () => {
    console.time('reducer');
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
    console.timeEnd('reducer');
    expect(state.filteredBy.genre["rock"]).to.eql([2, 3])
    console.log(state)
});