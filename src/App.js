import React, { Component } from 'react';
import './App.css';
import Player from './Player'

function generateDeck() {
  let deck = [];
  ["navy", "yellow", "green", "red"].forEach(color => {
    ["Organo", "Medicina", "Virus"].forEach(tipo => {
      [...Array(5).keys()].forEach(key => {
        deck.push({ "id": key + tipo[0] + color[0], "type": tipo, "color": color });
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
  constructor(props) {
    super(props);
    this.state = {
      players: [{
        "id":   1,
        "hand": [],
        "body": []
      }, {
        "id":   2,
        "hand": [],
        "body": []
      }],
      deck: shuffle(generateDeck())
    }
    console.log(this.state);
  }
  render() {
      var pjsx = this.state.players.map((player) => {
        return (<Player key={player.id} data={player} />);
      });
      return (
        <div>{pjsx}</div>
      );
  }
}

export default App;
