import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import "./styles/App.css";

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="app-container">
      <button className="music-button" onClick={toggleMusic}>
        {isPlaying ? "🔊 Stop Music" : "🔮 Play Music"}
      </button>

      <audio ref={audioRef} src="/music/music.wizard.mp3" preload="auto" loop />

      <Router>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/detail/:name" element={<CharacterDetail />} />
          <Route path="*" element={<p>404 - Page not found</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
