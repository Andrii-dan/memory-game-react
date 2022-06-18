import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemesList from './ThemesList';
import './HomePage.scss';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className='app'>
			<h1>Memory Game</h1>
			<legend>Choose Theme</legend>
			<div className='home-grid'>
				<button onClick={() => navigate('/game/0')}>
					<img
						src={
							ThemesList[0][
								Math.floor(Math.random() * parseInt(ThemesList[0].length))
							].src
						}
						alt='animal'
					/>
					Animals
				</button>
				<button onClick={() => navigate('/game/1')}>
					{' '}
					<img
						src={
							ThemesList[1][
								Math.floor(Math.random() * parseInt(ThemesList[1].length))
							].src
						}
						alt='football player'
					/>
					Football Players
				</button>
				<button onClick={() => navigate('/game/2')}>
					{' '}
					<img
						src={
							ThemesList[2][
								Math.floor(Math.random() * parseInt(ThemesList[2].length))
							].src
						}
						alt='politician'
					/>
					Politicians
				</button>
				<button onClick={() => navigate('/game/3')}>
					{' '}
					<img
						src={
							ThemesList[3][
								Math.floor(Math.random() * parseInt(ThemesList[3].length))
							].src
						}
						alt='meme'
					/>
					Memes
				</button>
				<button onClick={() => navigate('/game/4')}>
					{' '}
					<img
						src={
							ThemesList[4][
								Math.floor(Math.random() * parseInt(ThemesList[4].length))
							].src
						}
						alt='football badge'
					/>
					Football Badges
				</button>
				<button
					onClick={() =>
						navigate(
							`/game/${Math.floor(Math.random() * parseInt(ThemesList.length))}`
						)
					}
				>
					Random
				</button>
			</div>
		</div>
	);
};

export default HomePage;
