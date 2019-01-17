import React from 'react';
import Card from './Card';
export default function Player({player, actionDraw, actionDiscard, actionPlay}) {
    return (
            <div>
                <strong>Player {player.id}</strong>
                <div>
                    <span>Hand</span>
                    {player.hand.map((card) => <Card key={card.id} card={card} actionPlay={() => actionPlay(player, card)} />)}
                </div>
                <div>
                    <span>Body</span>
                    {player.body.map((card) => <Card key={card.id} card={card} links={card.links} />)}
                </div>
                <button onClick={() => actionDraw(player)}>Draw</button>
                <button onClick={() => actionDiscard(player)}>Discard</button>
            </div>
        )
}