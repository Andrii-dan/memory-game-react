import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.scss';
import ThemesList from './ThemesList';

const CardsGrid = () => {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	const navigate = useNavigate();
	const { theme } = useParams();

	//Shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [
			...ThemesList[parseInt(theme)],
			...ThemesList[parseInt(theme)],
		]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	};

	//Handle Choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	//reset choices & increase turns
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prev) => prev + 1);
		setDisabled(false);
	};

	// compare two selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards((prev) => {
					return prev.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				setTimeout(() => {
					resetTurn();
				}, 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	//start new game automatically
	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className='app'>
			<h1>Memory Game</h1>
			<button onClick={shuffleCards}>New Game</button>
			<button onClick={() => navigate('/')}>Change Theme</button>
			<div className='card-grid'>
				{cards.map((card) => {
					return (
						<SingleCard
							card={card}
							key={card.id}
							handleChoice={handleChoice}
							flipped={card === choiceOne || card === choiceTwo || card.matched}
							disabled={disabled}
						/>
					);
				})}
			</div>
			<p className='turns'>Turns: {turns}</p>
		</div>
	);
};

export default CardsGrid;
