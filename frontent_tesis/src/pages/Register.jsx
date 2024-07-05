import Forminput from '../components/Forminput';
import './register.css';

function Register() {

  return (
    <form>
      <div>
      <label>Enter your name:
        <div>
         <Forminput/> 
         <Forminput/> 
        </div>
      </label>
      </div>
      <div>
      <label>age:
        <div>
         <Forminput/> 
        </div>
      </label>
      </div>
      <div>
      <label>grade:
        <div>
         <Forminput/> 
        </div>
      </label>
      </div>
      <div>
      <label>school District:
        <div>
         <Forminput/> 
        </div>
      </label>
      </div>
      <div>
      <label>shirt size:
        <div>
         <Forminput/> 
        </div>
      </label>
      </div>
  </form>
  )
}

export default Register;