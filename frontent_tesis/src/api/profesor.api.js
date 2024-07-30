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