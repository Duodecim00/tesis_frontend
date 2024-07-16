import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/login.jsx';
import './App.css';

function App() {
 

  return (
 
    <Router>
      <Routes>
        <Route path="/test" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>

  )
}

export default App
