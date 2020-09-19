import React, { useEffect, useState } from 'react';
import CardList from './CardList';
import Axios from 'axios';

export default function PlayerBoard({openCards, index}) {
    const style = openCards.length && index === 1 ? { borderBottom: "2px solid #FFF"} : { bottom: "1rem"}
    return (
        <div className='player-board' style={style}>
            <CardList cards={openCards}/>
        </div>
    )
}   