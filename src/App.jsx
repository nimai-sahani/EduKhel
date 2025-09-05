import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import GameHub from "./pages/GameHub";
import Quiz from "./pages/Quiz";
import Puzzle from "./pages/Puzzle";
import Memory from "./pages/Memory";
import Sudoku from "./pages/Sudoku";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LearningHub from "./pages/LearningHub";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning" element={<LearningHub />} />
          <Route path="/gamehub" element={<GameHub />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/puzzle" element={<Puzzle />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
