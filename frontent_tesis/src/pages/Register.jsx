
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../color/color';
import Typography from '@mui/material/Typography';

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


  const [nombrecompleto,setnombrecompleto] = useState("")
  const [cedula,setCedula] = useState("")
  const [grado,setGrado] = useState("")
  const [seccion,setSeccion] = useState("")

  return(

<Box sx={{ width: '650px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', marginTop: '150px', borderRadius: 1}}alignItems="center">
<div style={{textAlign: 'center'}}>
  <h1 style={{color: theme.palette.primary.dark }}>register student</h1>
</div>
    

    <Grid container spacing={2} sx={{ padding: '15px',}}>
      
        <Grid item xs={12} >
            <Typography sx={{color: theme.palette.primary.dark}} variant="subtitle1" component="div">Studen Name</Typography>  
              <Grid container spacing={1}>
                  <Grid item xs={6}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="NAME" variant="outlined" valor={nombrecompleto} setvalor={setnombrecompleto} />
                  </Grid>

                  <Grid item xs={6}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="CI" variant="outlined" valor={cedula} setvalor={setCedula} />
                  </Grid>
              </Grid>
        </Grid>

        <Grid item xs={12} >
        <Typography sx={{color: theme.palette.primary.dark}} variant="subtitle1" component="div">Studen Level</Typography> 
            <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="DEGREE" variant="outlined" valor={grado} setvalor={setGrado} />
                    </Grid>

                    <Grid item xs={9}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="SECTION" variant="outlined" valor={seccion} setvalor={setSeccion} />
                    </Grid>


                      
            </Grid> 
  
        </Grid>

  
</Grid>
    
</Box>



    

  );
}

export default Register;