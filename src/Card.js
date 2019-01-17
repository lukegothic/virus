import React from 'react';
const Card = ({ card, links, actionPlay }) => {
    return (<div onClick={actionPlay} className={`card ${card.color}${actionPlay ? " playable": ""}`}>
        {card.type}
        {links && links.length > 0 && <div className="card-links">{links.map((card) => <Card card={card}/>)}</div>}
    </div>);
}
export default Card