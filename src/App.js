import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ src: '/img/helmet-1.png' },
	{ src: '/img/potion-1.png' },
	{ src: '/img/ring-1.png' },
	{ src: '/img/scroll-1.png' },
	{ src: '/img/shield-1.png' },
	{ src: '/img/sword-1.png' },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);

	//Shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setCards(shuffledCards);
		setTurns(0);
	};

	//Handle Choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	console.log(choiceOne, choiceTwo);

	//reset choices & increase turns
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prev) => prev + 1);
	};

	// compare two selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			choiceOne.src === choiceTwo.src ? console.log('tak') : console.log('Nie');
			resetTurn();
		} else {
			return;
		}
	}, [choiceOne, choiceTwo]);

	return (
		<div className='App'>
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className='card-grid'>
				{cards.map((card) => {
					return (
						<SingleCard card={card} key={card.id} handleChoice={handleChoice} />
					);
				})}
			</div>
		</div>
	);
}

export default App;
