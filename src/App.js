import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';

import './App.scss';

import Home from "./components/Pages/Home/Home";
import Search from "./components/Pages/Search/Search";
import Register from "./components/Pages/Register/Register";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/buscar">
						<Search />
					</Route>
					<Route path="/cadastrar">
						<Register />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
			<GoogleFontLoader fonts={[{ font: 'Montserrat', weights: [300,400,600,400,600,'ital','wght'], }]} />
		</>
	);
}

export default App;
