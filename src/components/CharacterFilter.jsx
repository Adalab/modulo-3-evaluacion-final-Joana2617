import React from "react";

const CharacterFilter = ({ filter, setFilter, house, setHouse }) => {
  const houses = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];

  return (
    <form onSubmit={(e) => e.preventDefault()} className="filter-form">
      <input
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <select value={house} onChange={(e) => setHouse(e.target.value)}>
        <option value="">All houses</option>
        {houses.map((h) => (
          <option key={h} value={h}>
            {h[0].toUpperCase() + h.slice(1)}
          </option>
        ))}
      </select>
    </form>
  );
};

export default CharacterFilter;
