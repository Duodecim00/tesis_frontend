

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
          const json = await response.json();
        console.log(json)
        return [response.status,json]
        }
    
        const json = await response.json();
        console.log(json)
        return [response.status,json]
      } catch (error) {
        console.error(error.message);
      }
  }

  export async function getstudentgrade(id) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }}
      try {
        const response = await fetch(`http://localhost:3000/getstudentgrade/${id}`,requestOptions);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        return json
      } catch (error) {
        console.error(error.message);
      }
  }

  export async function CreateNewGrade(name,idteacher,seccion,weeks,startdate,timestart,timeend,days){
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      id_profesor:idteacher,
      nombreCurso:name,
      seccion:seccion,
      fechaInicio:startdate,
      duracionCurso:weeks,
      horaStart: timestart,
      HoraEnd:timeend,
      dias:days
      })}
      try {
        const response = await fetch(`http://localhost:3000/NewGrade`,requestOptions);
        if (!response.ok) {
          const json = await response.json();
        console.log(json)
        return [response.status,json]
        }
        const json = await response.json();
        console.log(json)
        return [response.status,json]
      } catch (error) {
        console.error(error.message);
      }
  }


  export async function getTeacherGrades(id) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }}
      try {
        const response = await fetch(`http://localhost:3000/getTeacherGrades/${id}`,requestOptions);
        if (!response.ok) {
          const json = await response.json();
        console.log(json)
        return [response.status,json]
        }
    
        const json = await response.json();
        console.log(json)
        return [response.status,json]
      } catch (error) {
        console.error(error.message);
      }
  }