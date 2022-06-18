import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardsGrid from './components/CardsGrid';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/game/:theme' element={<CardsGrid />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
			{/* <CardsGrid /> */}
		</Router>
	);
}
export default App;
