module.exports = (openCardObj) => {
    const openCards = Object.values(openCardObj).map(card => card.value);
    let len = openCards.length;
    if(len < 3) return false;
    return (openCards[len - 2] > openCards[len - 2] 
        && openCards[len - 1] > openCards[len - 2])
}