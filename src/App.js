import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";

import './App.css';

function App() {
	return (
		<>
			<GoogleFontLoader fonts={[{ font: 'Montserrat', weights: [300,400,600,400,600,'ital','wght'], }]} />
			<Router>
				<Header></Header>
				<Switch>
					<Route path="/">
						<Home />
					</Route>
					<Route path="/buscar">
						<Home />
					</Route>
					<Route path="/cadastrar">
						<Home />
					</Route>
				</Switch>
				<Footer></Footer>
			</Router>
		</>
	);
}

export default App;
