import React, { useState, useEffect } from "react";

function CarGame() {
  const [lane, setLane] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(400);
  const [gameOver, setGameOver] = useState(false);

  // CONTROLS
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setLane((l) => Math.max(l - 1, 0));
      if (e.key === "ArrowRight") setLane((l) => Math.min(l + 1, 2));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // GAME LOOP
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) => {
        let updated = prev.map((o) => ({ ...o, y: o.y + 1 }));

        // new obstacle
        if (Math.random() < 0.4) {
          updated.push({
            lane: Math.floor(Math.random() * 3),
            y: 0
          });
        }

        // collision
        updated.forEach((o) => {
          if (o.y === 5 && o.lane === lane) {
            setGameOver(true);
          }
        });

        return updated.filter((o) => o.y < 6);
      });

      setScore((s) => s + 1);

      // increase difficulty
      if (score % 20 === 0 && speed > 150) {
        setSpeed((s) => s - 20);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [lane, gameOver, speed, score]);

  const restart = () => {
    setLane(1);
    setObstacles([]);
    setScore(0);
    setSpeed(400);
    setGameOver(false);
  };

  return (
    <div style={{
      height: "100vh",
      background: "#111",
      color: "white",
      textAlign: "center",
      fontFamily: "Arial"
    }}>
      <h2>🚗 Lane Rush PRO</h2>
      <h3>Score: {score}</h3>

      {gameOver && (
        <>
          <h2 style={{ color: "red" }}>CRASHED 💥</h2>
          <button onClick={restart}>Restart</button>
        </>
      )}

      {/* ROAD */}
      <div style={{
        width: "300px",
        height: "400px",
        margin: "auto",
        background: "#222",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        border: "2px solid #555"
      }}>
        {/* Lane lines */}
        <div style={{
          position: "absolute",
          left: "33%",
          top: 0,
          bottom: 0,
          borderLeft: "2px dashed #555"
        }}></div>

        <div style={{
          position: "absolute",
          left: "66%",
          top: 0,
          bottom: 0,
          borderLeft: "2px dashed #555"
        }}></div>

        {/* Obstacles */}
        {obstacles.map((o, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${o.y * 70}px`,
            left: `${o.lane * 100 + 25}px`,
            fontSize: "30px"
          }}>
            🚙
          </div>
        ))}

        {/* Player Car */}
        <div style={{
          position: "absolute",
          bottom: "10px",
          left: `${lane * 100 + 25}px`,
          fontSize: "35px"
        }}>
          🚗
        </div>
      </div>

      <p>Use ⬅️ ➡️ to move</p>
    </div>
  );
}

export default CarGame;