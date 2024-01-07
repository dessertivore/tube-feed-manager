import React from 'react';
import './../index.css'
import { NavLink, Route, Routes } from 'react-router-dom';
import Find from './Find';
import Insert from './Insert';
import Home from './Home';
import Review from './Review';
import Update from './Update';


/**
 * Navigation component that renders navigation links.
 * @component
 * @returns {JSX.Element} Navigation component with links.
 */

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/Find'>Find</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/Insert'>Create new patient</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/Review'>Review</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/Update'>Update patient data</NavLink></li>
    </ul>
  </nav>
);

/**
 * Main component that defines routes for the application.
 * @component
 * @returns {JSX.Element} Routes for different components.
 */

const Main = () => {
  return (
    <Routes>
      <Route exact path='/' element= {<Home />} />
      <Route exact path='/Find' element= {<Find />} />
      <Route exact path='/Insert' element={<Insert />} />
      <Route exact path='/Review' element= {<Review />} />
      <Route exact path='/Update' element= {<Update />} />
    </Routes>
  );
}


/**
 * App component, the root component of the application.
 * @component
 * @returns {JSX.Element} Main application component.
 */

const App = () => (
  <div className="app">
    <h1>Tube feed manager</h1>
    <Navigation />
    <Main />
  </div>
);

export default App;

