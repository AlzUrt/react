import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  return (
    <header>
      <Link to="/">Pokedex</Link>
    </header>
  );
};

export default Header;
