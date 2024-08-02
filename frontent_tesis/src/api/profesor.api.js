export async function getallteachers() {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }}
      try {
        const response = await fetch(`http://localhost:3000/allTeachers`,requestOptions);
        if (!response.ok) {
          const json = await response.json();
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json)
        return json
      } catch (error) {
        console.error(error.message);
      } 
    }

    export async function newTeacher(FirstName,LastName,user,pass) {
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombrecompleto:`${FirstName+" "+LastName}`,
          usuario:`${user}`,
          password:`${pass}`,
        })}
        try {
          const response = await fetch('http://localhost:3000/NewTeacher',requestOptions);
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