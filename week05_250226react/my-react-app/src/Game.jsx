import { useState, useEffect } from "react"

function SchoolDaysGame() {
  const [playerX, setPlayerX] = useState(180)
  const [book, setBook] = useState({ x: 200, y: 0 })
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // Move player with keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setPlayerX((prev) => Math.max(prev - 20, 0))
      }
      if (e.key === "ArrowRight") {
        setPlayerX((prev) => Math.min(prev + 20, 360))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Game loop
  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      setBook((prev) => {
        const newY = prev.y + 10

        // Collision detection
        if (
          newY > 360 &&
          prev.x > playerX - 40 &&
          prev.x < playerX + 40
        ) {
          setScore((s) => s + 1)
          return { x: Math.random() * 360, y: 0 }
        }

        // Missed
        if (newY > 400) {
          setMissed((m) => m + 1)
          if (missed + 1 >= 5) {
            setGameOver(true)
          }
          return { x: Math.random() * 360, y: 0 }
        }

        return { ...prev, y: newY }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [playerX, missed, gameOver])

  const restartGame = () => {
    setScore(0)
    setMissed(0)
    setGameOver(false)
    setBook({ x: 200, y: 0 })
  }

  return (
    <div style={styles.container}>
      <h1>🎒 School Days</h1>
      <h2>Score: {score}</h2>
      <h3>Missed: {missed}/5</h3>

      <div style={styles.gameArea}>
        {/* Falling Book */}
        <div
          style={{
            ...styles.book,
            left: book.x,
            top: book.y
          }}
        >
          📚
        </div>

        {/* Player */}
        <div
          style={{
            ...styles.player,
            left: playerX
          }}
        >
          🧑‍🎓
        </div>
      </div>

      {gameOver && (
        <>
          <h2>💀 Game Over!</h2>
          <button onClick={restartGame} style={styles.button}>
            Restart
          </button>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
    padding: "20px"
  },
  gameArea: {
    position: "relative",
    width: "400px",
    height: "400px",
    margin: "20px auto",
    backgroundColor: "#dfefff",
    border: "2px solid #333",
    overflow: "hidden"
  },
  player: {
    position: "absolute",
    bottom: "10px",
    fontSize: "40px"
  },
  book: {
    position: "absolute",
    fontSize: "30px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer"
  }
}

export default SchoolDaysGame