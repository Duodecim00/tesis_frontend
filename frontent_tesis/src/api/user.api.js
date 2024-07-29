
import { useNavigate } from "react-router-dom";


  //const navigate = useNavigate();

export async function LogIn(email,pass) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario:email,
        password:pass,
      })}
      try {
        const response = await fetch('http://localhost:3000/signin',requestOptions);
        if (!response.ok) {
          const json = await response.json();
          console.log(json);
          return [response.status,json.msg]
        }
    
        const json = await response.json();
        console.log(json);
        return [response.status,json]
      } catch (error) {
        console.error(error.message);
      } 
    }