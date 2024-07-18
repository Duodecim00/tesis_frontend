import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterSTudent from './pages/RegisterStudent.jsx';
import Login from './pages/login.jsx';
import './App.css';

function App() {
 

  return (
 
    <Router>
      <Routes>
        <Route path="/test" element={<RegisterSTudent/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>

  )
}

export default App
