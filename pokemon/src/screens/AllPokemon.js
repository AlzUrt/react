import React, { useEffect, useState } from 'react';
import Generation from '../components/Generation';
import Header from '../components/Header';

const AllPokemon = () => {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const generationNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
        const generationUrls = generationNumbers.map((number) =>
          `https://pokeapi.co/api/v2/generation/${number}`
        );

        const generationData = await Promise.all(
          generationUrls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Erreur lors de la récupération des données de la génération ${url}`);
            }
            const data = await response.json();
            return data;
          })
        );

        setGenerations(generationData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenerations();
  }, []);

  return (
    <div className="all-pokemon">
      <Header />
      {generations.map((generation, index) => (
        <Generation key={index} generation={generation} limit={5} />
      ))}
    </div>
  );
};

export default AllPokemon;