import React, { Component } from 'react';
import * as utils from '../utils.js';
import Player from '../Player';
const handSize = 3;
const cardTypes = {
    ORGANO: "Organo",
    MEDICINA: "Medicina",
    VIRUS: "Virus"
}
class Game extends Component {
    generateDeck = (useWildcards = true, useSpecials = true) => {
        const qByType = { "Organo": 5, "Medicina": 4, "Virus": 4 };
        let deck = [];
        ["blue", "yellow", "green", "red"].forEach(color => {
            Object.keys(cardTypes).map((type) => cardTypes[type]).forEach(type => {
                utils.range(1, qByType[type]).forEach(key => {
                    deck.push({ "id": key + type[0] + color[0], "type": type, "color": color, "links": [] });
                });
            });
        });
        // TODO: wildcards + specials
        return deck;
    }
    checkWinner = (player) => {
        if (player.body.length === 4 && !player.body.find((bodycard) => bodycard.links.find((link) => link.type === cardTypes.VIRUS ))) {
            this.setState({
                winner: player
            });
        }
    }
    // TODO: actions ??? 
    handleDiscard = (player) => {
        let players = [...this.state.players];
        let playerActioning = players.find((p) => player.id === p.id);
        let playerHand = [...playerActioning.hand];
        let discard = this.state.discard.slice();
        discard = discard.concat(playerHand);
        playerActioning.hand = [];
        this.setState({
            "players": players,
            "discard": discard
        });
        this.refillHand(player);
    }
    handlePlay = (player, card) => {
        let players = [...this.state.players];
        let playerActioning = players.find((p) => player.id === p.id);
        switch(card.type) {
            case cardTypes.ORGANO:
                if (!playerActioning.body.find((bodycard) => bodycard.color === card.color)) {
                    let playerHand = playerActioning.hand.slice();
                    var handIndex = playerHand.findIndex((handcard) => handcard.id === card.id);
                    let playerBody = playerActioning.body.slice();
                    playerBody.push(Object.assign(card, {}));
                    playerHand.splice(handIndex, 1);
                    playerActioning.body = playerBody;
                    playerActioning.hand = playerHand;
                    this.setState({
                        "players": players
                    });
                    this.refillHand(player);
                    this.checkWinner(player);
                } else {
                    console.log(`Ya tienes un ${card.type} ${card.color}`);
                }
            break;
        }
    }
    refillHand = (player) => utils.range(player.hand.length, handSize - 1).forEach(() => this.drawCard(player));
    // Puede ser multiple, por lo que hacemos setState funcional usando parametro actualizado
    drawCard = (player) => {
        this.setState(state  => {
            let players = [...state.players];
            let playerActioning = players.find((p) => player.id === p.id);
            let deck = state.deck.slice();
            let discard = state.discard.slice();
            // Barajear
            if ( deck.length === 0 ) {
                deck = utils.shuffle(state.discard.slice());
                discard = [];
            }
            playerActioning.hand.push(deck.pop());
            return { players, deck, discard };
        });
    }
    getStartingState = (players) => {
        return {
            pn: players,
            deck: utils.shuffle(this.generateDeck()),
            discard: [],
            players: utils.range(1, players).map((pn) => ({ "id": pn, "hand": [], "body": [] })),
            winner: null
        };
    }
    restart = () => {
        this.setState(this.getStartingState(this.state.pn));
    }
    constructor(props) {
        super(props);
        this.state = this.getStartingState(props.players);
    }
    render() {
        console.log("render game", this.state);
        return (<div>
            {this.state.winner && <div><h1>Winner Winner {this.state.winner.id} Chicken Dinner</h1><button onClick={this.restart}>New game</button></div>}
            <span>Deck <strong>{this.state.deck.length}</strong> cards</span>
            <span>Discard <strong>{this.state.discard.length}</strong> cards</span>
            {this.state.players.map((player) => <Player key={player.id} player={player} actionPlay={this.handlePlay} actionDiscard={this.handleDiscard} actionDraw={this.refillHand} />)}
        </div>);
    }
}
export default Game