import React from 'react';
import Card from './Card';
export default function Hand(props) {
    return props.cards.map((card) => <Card data={card} />);
}