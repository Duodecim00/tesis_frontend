

export async function NewAttendanceEdit(id,fecha,time,note) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id":id,
        "fecha":fecha,
        "time":time,
        "note":note
      })}
      try {
        const response = await fetch('http://localhost:3000/NewAttendanceEdit',requestOptions);
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

    export async function GetAttendace(id) {
        const requestOptions = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }}
          try {
            const response = await fetch(`http://localhost:3000/GetAttendace/${id}`,requestOptions);
            if (!response.ok) {
              const json = await response.json();
              return [response.status,json]
            }
            const json = await response.json();
            return [response.status,json]
          } catch (error) {
            console.error(error.message);
          } 
        }


        export async function DeleteAttendance(idAlumno,idCurso,fecha) {
          const requestOptions = {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "id_alumno":idAlumno,
              "id_curso":idCurso,
              "fecha":fecha
            })}

            try {
              const response = await fetch(`http://localhost:3000/DeleteAttendance`,requestOptions);
              if (!response.ok) {
                const json = await response.json();
                return [response.status,json]
              }
              const json = await response.json();
              return [response.status,json]
            } catch (error) {
              console.error(error.message);
            } 
          
        }