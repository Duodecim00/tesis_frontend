import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewGrade from './pages/NewGrade.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterTeacher from './pages/RegisterTeacher.jsx';
import Attendace from './pages/Attendace.jsx';
import Login from './pages/login.jsx';
import Fingerprint from './pages/Fingerprint.jsx';
import Profile from './pages/Profile.jsx';
import './App.css';
import ManageGrades from './pages/ManageGrades.jsx';
import  EditGrade  from "./pages/EditGrade.jsx";
function App() {
 

  return (
 
    <Router>
      <Routes>
        <Route path="/RegisterS" element={<RegisterStudent/>} />
        <Route path="/RegisterT" element={<RegisterTeacher/>} />
        <Route path="/NewGrade" element={<NewGrade/>} />
        <Route path="/Attendace" element={<Attendace/>} />
        <Route path="/fingerprint" element={<Fingerprint/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path='/grades' element={<ManageGrades></ManageGrades>}></Route>
        <Route path='/editGrade/:id' element={<EditGrade></EditGrade>}></Route>
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>

  )
}

export default App
