import React from 'react';
import DECK from '../DECK.JSON';

function getCard(cardId) {
    cardId = Number(cardId);
    const deckNo = Math.floor((cardId - .1) / 13) + 1;
    const cardIndex = ((cardId - 1)  % 13);
    const {img, color, cards} = DECK[deckNo];
    return {
        img, 
        color, 
        display: cards[cardIndex].display || cards[cardIndex].value
    }
}

export default function Card({cardId}) {
    const {display, color, img} = getCard(cardId);
    return (
        <div className="card">
            <div className='card-num c-left card-i-tl' style={{color}}>
                <div>{display}</div>
                <img className='card-i card-i-sm' src={img}/>
            </div>
            
            <img className='card-i card-i-lg card-i-ct' src={img}/>
            <div className='card-num c-right card-i-br' style={{color}}>
                <div>{display}</div>
                <img className='card-i card-i-sm' src={img}/>
            </div>
        </div>
    )
}