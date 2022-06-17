import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ src: '/img/politics/Biden.png', matched: false },
	{ src: '/img/politics/Johnson.png', matched: false },
	{ src: '/img/politics/Merkel.png', matched: false },
	{ src: '/img/politics/Obama.png', matched: false },
	{ src: '/img/politics/Putin.png', matched: false },
	{ src: '/img/politics/Trump.png', matched: false },
	// { src: '/img/politics/Queen.png', matched: false },
	// { src: '/img/politics/Zelenskyi.png', matched: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	//Shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
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
		<div className='App'>
			<h1>Memory Game</h1>
			<button onClick={shuffleCards}>New Game</button>
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
}

export default App;
