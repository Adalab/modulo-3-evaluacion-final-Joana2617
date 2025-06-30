import React from "react";
import { Link } from "react-router-dom";

const getHouseColor = (house) => {
  switch (house) {
    case "Gryffindor":
      return "#7F0909"; // vermelho escuro
    case "Slytherin":
      return "#0D6217"; // verde escuro
    case "Ravenclaw":
      return "#222F5B"; // azul escuro
    case "Hufflepuff":
      return "#EEE117"; // amarelo
    default:
      return "#ccc"; // cor neutra para casas desconhecidas
  }
};

const CharacterCard = ({ character }) => {
  const placeholder = `https://placehold.co/300x400?text=${character.name.replaceAll(
    " ",
    "+"
  )}`;

  return (
    <Link
      to={`/detail/${encodeURIComponent(character.name)}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className="card"
        style={{
          backgroundColor: getHouseColor(character.house),
          color: "#fff",
          textShadow: "0 0 5px black",
        }}
      >
        <img src={character.image || placeholder} alt={character.name} />
        <h3>{character.name}</h3>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
      </div>
    </Link>
  );
};

export default CharacterCard;
