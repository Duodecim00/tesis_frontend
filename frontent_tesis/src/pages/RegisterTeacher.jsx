
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../color/color';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './register.css';



function RegisterTeacher() {
 /* async function probando() {
    const url = "http://localhost:3000/newstudent";
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombrecompleto:${nombrecompleto},
        cedula:${cedula},
        grado:${grado},
        seccion:${seccion},
      })}
  try {
    const response = await fetch(url,requestOptions);
    if (!response.ok) {
      throw new Error(Response status: ${response.status});
    }

    const json = await response.json();
    console.log(json);


      try {
        const changemode = await fetch("http://192.168.1.106/off")
        console.log(changemode)
      } catch (error) {
        console.log(error.message)
      }

    
    
  } catch (error) {
    console.error(error.message);
  }
  }*/

  const [FirstName,setFirstName] = useState("")
  const [LastName,setLastName] = useState("")
  const [UserName,setUserName] = useState("")
  const [Password,setPassword] = useState("")



  return(

<>
<Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <ArrowBackIcon sx={{color: theme.palette.primary.dark}} />
      </IconButton>
      <Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
        New Teacher
      </Typography>
</Toolbar>

<Box sx={{ width: '650px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}}alignItems="center">

    

    <Grid container spacing={2} sx={{ padding: '25px',}}>
      
        <Grid item xs={12} >
            <Grid >
              <div style={{marginBottom: 30}}>
                <Avatar style={{ marginLeft: 'auto',marginRight: 'auto', width: 132, height: 132 }} src="/broken-image.jpg" />
              </div>
            </Grid>
              <Grid container spacing={1}>
                  <Grid item xs={6}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="First Name" variant="outlined" valor={FirstName} setvalor={setFirstName} />
                  </Grid>

                  <Grid item xs={6}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Last Name" variant="outlined" valor={LastName} setvalor={setLastName} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="User Name" variant="outlined" valor={UserName} setvalor={setUserName} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Password" variant="outlined" valor={Password} setvalor={setPassword} />
                  </Grid>
              </Grid>
        </Grid>


    <div style={{margin: '20px', marginLeft: 'auto',marginRight: 'auto'}}>
        <Button variant="contained">Continue</Button>
    </div>
</Grid>

</Box>
</>
  );
}

export default RegisterTeacher;

