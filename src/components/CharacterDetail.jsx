import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CharacterDetail = () => {
  const { name } = useParams();
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://hp-api.onrender.com/api/characters`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c) => c.name === decodeURIComponent(name));
        setCharacter(found);
      });
  }, [name]);

  if (!character) {
    return <p>The character you're looking for does not exist.</p>;
  }

  const {
    image,
    name: fullName,
    species,
    house,
    gender,
    alive,
    alternate_names,
  } = character;

  return (
    <div className="detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <img
        src={image || `https://placehold.co/300x400?text=${fullName}`}
        alt={fullName}
      />
      <h1>{fullName}</h1>
      <p>
        <strong>House:</strong> {house || "Unknown"}
      </p>
      <p>
        <strong>Species:</strong> {species}
      </p>
      <p>
        <strong>Gender:</strong> {gender}
      </p>
      <p>
        <strong>Status:</strong> {alive ? "Alive 🟢" : "Dead ⚰️"}
      </p>
      {alternate_names?.length > 0 && (
        <p>
          <strong>Alternate names:</strong> {alternate_names.join(", ")}
        </p>
      )}
    </div>
  );
};

export default CharacterDetail;
