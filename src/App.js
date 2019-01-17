import React, { Component } from 'react';
import './App.css';
import Setup from './scenes/Setup'
import Game from './scenes/Game'
// TODO: https://cf.geekdo-images.com/original/img/OaB0h0GH-xqWMCp5Apl6Wn7aTPY=/0x0/pic4398781.jpg
const scenes = {
  SETUP:0,
  GAME:1,
  END:2
}
class App extends Component {
  startGame = (players) => {
    this.setState({
      pn: players,
      scene:scenes.GAME
    });
  }
  endGame = (player) => {
    this.setState({
      scene:scenes.END
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      pn: null,
      scene: scenes.SETUP
    }
  }
  render() {
      return (
        <div>
          {this.state.scene === scenes.SETUP ? <Setup minPlayers={2} maxPlayers={4} onEndSetup={this.startGame} /> : <Game players={this.state.pn} onWinState={this.endGame} />}
        </div>
      );
  }
}

export default App;
