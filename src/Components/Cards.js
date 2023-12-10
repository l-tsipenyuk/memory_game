import React, { useState, useEffect } from "react";

const Cards = (props) => {
    const [cards, setCards] = useState([]);
    const [count, setCount] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [topScore, setTopScore] = useState([]);

    useEffect(() => {
        const showCards = async () => {
            try {
                const res = await fetch('CardsDB.json');
                const data = await res.json();
                setCards(data.superheroes);
            } catch (e) {
                console.log(e)
            }
        };
        showCards();
    }, []);

    const shuffleCards = () => {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
    };

    const handleShuffle = () => {
        shuffleCards();
    }

    const counter = () => {
        setCount(count + 1);
    }

    const handleCounter = (id) => {
        if(clickedCards.includes(id)){
            setCount(0);
            setClickedCards([]);
            setTopScore(count);
        }else{
            counter();
            setClickedCards([...clickedCards, id]);
        }
    }

    return (
        <>
            <div className="header">
                <h1>Superheroes Memory Game</h1>
                <h4>Score: {count} Top Score: {topScore}</h4>
            </div>
            <h3>Get points by clicking on an image but don't click on them more than once!</h3>
            <div className="container" onClick={handleShuffle}>
                {cards.map((item) => (
                    <div className="heroCard" key={item.id} onClick={()=>handleCounter(item.id)}>   
                        < img src={item.image} alt="Not found" />
                        <h5><i>Name:</i> {item.name}</h5>
                        <h5><i>Occupation:</i> {item.occupation}</h5>
                    </div>
                ))}
            </div >
        </>
    );
};

export default Cards;