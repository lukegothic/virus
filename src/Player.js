import React from 'react';
import Hand from './Hand';
import Body from './Body';
export default function Player(props) {
    return (
            <div>
                <span>Player {props.data.id}</span>
                <Hand cards={props.data.hand} />
            </div>
            
            
        )
}