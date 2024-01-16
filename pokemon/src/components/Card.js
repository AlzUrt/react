import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ pokemon }) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  return (
    <Link
      to={{
        pathname: `/${pokemon.name}`
      }}
      className="card-link"
    >
      <div className="card">
        <img src={imageUrl} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
      </div>
    </Link>
  );
};

export default Card;
