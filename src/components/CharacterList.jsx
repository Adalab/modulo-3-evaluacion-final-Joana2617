import React, { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import "../styles/App.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("");

  const houses = [
    "Gryffindor",
    "Slytherin",
    "Ravenclaw",
    "Hufflepuff",
    "No House",
  ];

  // Personagens principais que aparecem na home se não houver filtro
  const featuredNames = [
    "Harry Potter",
    "Draco Malfoy",
    "Luna Lovegood",
    "Cedric Diggory",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://hp-api.onrender.com/api/characters");
      const data = await res.json();
      setCharacters(data);
    };
    fetchData();
  }, []);

  // Remove Lily Potter e James Potter
  const filteredCharactersWithoutLilyJames = characters.filter(
    (char) => char.name !== "Lily Potter" && char.name !== "James Potter"
  );

  // Filtra personagens por casa e nome, considerando 'no-house'
  const filteredCharacters = filteredCharactersWithoutLilyJames.filter(
    (char) => {
      let matchHouse = true;

      if (selectedHouse === "no-house") {
        matchHouse = !char.house || char.house === "";
      } else if (selectedHouse) {
        matchHouse = char.house === selectedHouse;
      }

      const matchName = char.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchHouse && matchName;
    }
  );

  // Se nenhum filtro ativo, mostrar só os 4 personagens principais
  const charactersToShow =
    !selectedHouse && !searchTerm
      ? filteredCharactersWithoutLilyJames.filter((char) =>
          featuredNames.includes(char.name)
        )
      : filteredCharacters;

  // Renderização
  return (
    <div>
      <h1 className="magical-title">Harry Potter Characters</h1>

      <div className="filter-form">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // previne submit do form recarregar a página
          }}
        >
          {/* Busca por nome */}
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Select para casa */}
          <select
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(e.target.value)}
          >
            <option value="">All Houses</option>
            {houses.map((house) => (
              <option
                key={house}
                value={house === "No House" ? "no-house" : house}
              >
                {house}
              </option>
            ))}
          </select>
        </form>
      </div>

      {/* Renderização dos personagens */}
      {!selectedHouse && !searchTerm ? (
        houses.map((house) => {
          const houseChars =
            house === "No House"
              ? charactersToShow.filter(
                  (char) => !char.house || char.house === ""
                )
              : charactersToShow.filter((char) => char.house === house);

          return (
            <div key={house}>
              <h2>{house}</h2>
              <div className="grid" style={{ display: "flex", gap: "1rem" }}>
                {houseChars.length > 0 ? (
                  houseChars.map((char) => (
                    <CharacterCard key={char.name} character={char} />
                  ))
                ) : (
                  <p>No characters found.</p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div
          className="grid"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          {charactersToShow.length > 0 ? (
            charactersToShow.map((char) => (
              <CharacterCard key={char.name} character={char} />
            ))
          ) : (
            <p>No characters found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
