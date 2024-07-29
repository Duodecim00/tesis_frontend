
export async function NewStudent(FirstName,LastName,Cedula,Age,Gender,idSeccion) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombrecompleto:`${FirstName+" "+LastName}`,
        url_foto:`https://cdn-icons-png.freepik.com/512/4537/4537019.png`,
        cedula:`${Cedula}`,
        edad:`${Age}`,
        genero:`${Gender}`,
        id_curso:`${idSeccion}`,
      })}
      try {
        const response = await fetch('http://localhost:3000/newstudent',requestOptions);
        if (!response.ok) {
          const json = await response.json();
          console.log(json);
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error(error.message);
      } 
    }

    export async function getStundetsByTeacher(id) {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }}
        try {
          const response = await fetch(`http://localhost:3000/getStundetsByTeacher/${id}`,requestOptions);
          if (!response.ok) {
            const json = await response.json();
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          return json
        } catch (error) {
          console.error(error.message);
        } 
      }
  