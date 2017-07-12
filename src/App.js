import React, { Component } from 'react';
import logo from './logo.svg';
import { createStore, combineReducers } from 'redux'
import { 
  receive,

  reducerCombined,
  reducerPlaylistArtist,
  reducerPlaylistCity,
  reducerPlaylistGenre,
  reducerPlaylistState,

  playlistByArtist,
  playlistByCity,
  playlistByGenre,
  playlistByState,
  
  receiveState,
  receiveArtist,
  receiveGenre,
  receiveCity,
}  from './reducer'
import './App.css';

const DATA_SIZE = 10000

export default class App extends Component {
  constructor(props){
    super(props)
    this.storeCombined = createStore(reducerCombined)
    this.storeFragmented = createStore(combineReducers({
      reducerPlaylistArtist,
      reducerPlaylistCity,
      reducerPlaylistGenre,
      reducerPlaylistState
    }))

    this.state = {time: 0}

    this.handleCombined = this.handleCombined.bind(this)
    this.handleFragmented = this.handleFragmented.bind(this)
    this.getData = this.getData.bind(this)
    console.log(this.getData(10))
  }
  handleCombined() {
    console.time('combined');
    let data = this.getData(DATA_SIZE)
    this.storeFragmented.dispatch({
      data: data.playlistByArtist,
      type: receive,
      requestType: playlistByArtist
    })

    this.storeFragmented.dispatch({
      data: data.playlistByCity,
      type: receive,
      requestType: playlistByCity
    })

    this.storeFragmented.dispatch({
      data: data.playlistByGenre,
      type: receive,
      requestType: playlistByGenre
    })

    this.storeFragmented.dispatch({
      data: data.playlistByState,
      type: receive,
      requestType: playlistByState
    })
    console.timeEnd('combined');
  }
  handleFragmented() {
    console.time('fragmented');
    let data = this.getData(DATA_SIZE)
    this.storeFragmented.dispatch({
      data: data.playlistByArtist,
      type: receiveArtist
    })

    this.storeFragmented.dispatch({
      data: data.playlistByCity,
      type: receiveCity
    })

    this.storeFragmented.dispatch({
      data: data.playlistByGenre,
      type: receiveGenre
    })

    this.storeFragmented.dispatch({
      data: data.playlistByState,
      type: receiveState
    })
    console.timeEnd('fragmented');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Performance Test</h2>
        </div>
        <p className="App-intro">
          Please, open the console and click in the buttons.          
        </p>
        <p>
          <button onClick={this.handleCombined} >Combined</button>
          <button onClick={this.handleFragmented} >Fragmented</button>
        </p>
        <p>Time: {this.state.time}</p>
      </div>
    );
  }

  getData(size){
    let musicsSample = []
    for (var i = 0; i < 50; i++) {
      musicsSample.push({
        id: i,
        name: "Music " + i,
        Disc: {
          id: i,
          name: "Disc X",
          year: "2001"
        }
      })
    }

    let playlistsSample = []
    for (var j = 0; j < size; j++) {
      playlistsSample.push({
        id: j,
        name: "Playlist " + j,
        artist: {
          name: "Artist X",
          city: "London"
        },
        musics: [...musicsSample]
      })
    }
    return {
      playlistByState: [...playlistsSample],
      playlistByArtist: [...playlistsSample],
      playlistByGenre: [...playlistsSample],
      playlistByCity: [...playlistsSample],
    }
  }
}