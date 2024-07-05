import Forminput from '../components/Forminput';
import { useState } from "react";
import './register.css';

function Register() {

  const [nombrecompleto,setnombrecompleto] = useState("")
  const [cedula,setCedula] = useState("")
  const [grado,setGrado] = useState("")
  const [seccion,setSeccion] = useState("")

 async function probando() {
    const url = "http://localhost:3000/newstudent";
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombrecompleto:`${nombrecompleto}`,
        cedula:`${cedula}`,
        grado:`${grado}`,
        seccion:`${seccion}`,
      })}
  try {
    const response = await fetch(url,requestOptions);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
  }


  return (
    <>
    <form onSubmit={probando}>
      <div>
      <label>Enter your name:
        <div>
         <Forminput place='nombrecompleto' valor={nombrecompleto} setvalor={setnombrecompleto}/> 
         <Forminput place='cedula' valor={cedula} setvalor={setCedula}/> 
        </div>
      </label>
      </div>
      <div>
      <label>age:
        <div>
         <Forminput place='grado' valor={grado} setvalor={setGrado}/> 
        </div>
      </label>
      </div>
      <div>
      <label>grade:
        <div>
         <Forminput place='seccion' valor={seccion} setvalor={setSeccion}/> 
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
         <Forminput /> 
        </div>
      </label>
      </div>
      <div>
        <button type='submit'>
          wtf
        </button>
      </div>
  </form>
  </>
  )
}

export default Register;