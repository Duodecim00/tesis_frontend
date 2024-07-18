import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterTeacher from './pages/RegisterTeacher.jsx'
import Login from './pages/login.jsx';
import './App.css';

function App() {
 

  return (
 
    <Router>
      <Routes>
        <Route path="/registerS" element={<RegisterStudent/>} />
        <Route path="/RegisterT" element={<RegisterTeacher/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>

  )
}

export default App
