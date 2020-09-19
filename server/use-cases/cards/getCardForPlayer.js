const CHOICES = require('../../constants/Choices.json');
const ALL_CARDS = require('../../constants/CardIds.json');
const {ChooseADifferentOption} = require('../../errors');

module.exports = (choice, openCards) => {
    if(!choice) choice = "random";
    const deckChoice = CHOICES[choice];
    const maxCard = deckChoice[deckChoice.length - 1] * 13;
    const minCard = (deckChoice[0] - 1) * 13 + 1;
    if(!deckChoice) throw new Error("Invalid choice");
    let validCards = ALL_CARDS.filter(id => openCards.indexOf(id) < 0 && id >= minCard && id <= maxCard);
    if(!validCards.length) throw new ChooseADifferentOption("Choose a different option..."); 
    const randomIndex = Math.floor(Math.random() * validCards.length);
    return validCards[randomIndex];
}