import React from 'react';
import './../index.css'
import { NavLink, Route, Routes } from 'react-router-dom';
import Find from './Find';
import Insert from './Insert';
import Home from './Home';




const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>

      <li><NavLink exact activeClassName="current" to='/Find'>Find</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/Insert'>Insert</NavLink></li>
    </ul>
  </nav>
);

const Main = () => {
  return (
    <Routes>
      <Route exact path='/' element= {<Home />} />

      <Route exact path='/Find' element= {<Find />} />
      <Route exact path='/Insert' element={<Insert />} />

    </Routes>
  );
}



const App = () => (
  <div className='app'>
    <h1>Tube feed manager - created by Dessertivore</h1>
    <Navigation />
    <Main />
  </div>
);

export default App;

