const DECK = require('../../constants/CardDeck.json');
const CHOICES = require('../../constants/Choices.json');

module.exports = (choice, openCards) => {
    if(!choice) choice = "random";
    const deckChoice = CHOICES[choice];
    if(!deckChoice) throw new Error("Invalid choice");
    let remainingCards = [];
    deckChoice.forEach(deckId => {
        const deck = DECK[deckId].cards;
        deck.forEach(card => {
            if(!openCards[card.id]) {
                remainingCards.push(card);
            }
        })
    })
    if(!remainingCards.length) throw new Error("Choose different option..."); 
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const randomCard = remainingCards[randomIndex];
    const deckNo = (Math.floor(Number((randomCard.id) - .1) / 13)) + 1;
    const { suitName, img, color } = DECK[deckNo];
    return {
        ...remainingCards[randomIndex],
        suitName, img, color
    }
}