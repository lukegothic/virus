import React, { Component } from 'react';
import './App.css';
import Player from './Player'


// TODO: https://cf.geekdo-images.com/original/img/OaB0h0GH-xqWMCp5Apl6Wn7aTPY=/0x0/pic4398781.jpg

function generateDeck() {
  let deck = [];
  ["navy", "yellow", "green", "red"].forEach(color => {
    ["Organo", "Medicina", "Virus"].forEach(tipo => {
      [...Array(5).keys()].forEach(key => {
        deck.push({ "id": key + tipo[0] + color[0], "type": tipo, "color": color, "addons": [] });
      });
    });
  });
  return deck;
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
class App extends Component {
  draw(player) {
    let phand = player.hand.slice();
    let cdeck = this.state.deck.slice();
    let card = cdeck.pop();
    phand.push(card);
    this.setState({
      deck: cdeck
    });
    console.log(card, cdeck);
  }
  constructor(props) {
    super(props);
    this.state = {
      player1: {
        "id":   1,
        "hand": [],
        "body": []
      },
      player2: {
        "id":   2,
        "hand": [],
        "body": []
      },
      deck: shuffle(generateDeck())
    }
  }
  render() {
    /*
      var pjsx = this.state.players.map((player) => {
        return (<Player key={player.id} data={player} />);
      });{pjsx}
      */
      return (
        <div>
          if (this.state.player1) {
            <Player key={this.state.player1.id} data={this.state.player1} />
          }
          <button onClick={() => this.draw(this.state.player1)}></button>
        </div>
      );
  }
}

export default App;
