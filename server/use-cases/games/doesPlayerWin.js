const DECK = require('../../constants/CardDeck.json');
function getCardValue(cardId) {
    cardId = Number(cardId);
    const deckNo = Math.floor((cardId - .1) / 13) + 1;
    const cardIndex = ((cardId - 1)  % 13);
    return DECK[deckNo].cards[cardIndex].value
}

module.exports = (openCards) => {
    const l = openCards.length;
    if(l < 4) return false;
    const values = openCards.map(cardId => getCardValue(cardId));
    return (
        values[l-1] > values[l-2] 
        && values[l-2] > values[l-3] 
        && values[l-3] > values[l-4]
    )
}