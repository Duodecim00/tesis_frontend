

export async function getsections(id){
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }}
      try {
        const response = await fetch(`http://localhost:3000/getsections/${id}`,requestOptions);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json)
        return json
        setcantidadSeccion(json)
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
  }


  export async function GetGrades() {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }}
      try {
        const response = await fetch('http://localhost:3000/getGrades',requestOptions);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        return json
      } catch (error) {
        console.error(error.message);
      }
  }