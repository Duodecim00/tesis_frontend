
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../color/color';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import './register.css';



function NewGrade() {
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

  const [Name,setName] = useState("")
  const [Teacher,setTeacher] = useState("")
  const [Seccion,setSeccion] = useState("")

  const handleTeacher = (event) => {
    setTeacher(event.target.value);
  };

  
  const handleSeccion = (event) => {
    setSeccion(event.target.value);

  };

  return(

<>
<Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <ArrowBackIcon sx={{color: theme.palette.primary.dark}} />
      </IconButton>
      <Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
        New Grade
      </Typography>
</Toolbar>

<Box sx={{ width: '650px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}}alignItems="center">

    

    <Grid container spacing={2} sx={{ padding: '25px',}}>
      
        <Grid item xs={12} >
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Name" variant="outlined" valor={Name} setvalor={setName} />
                  </Grid>

                  <Grid item xs={6}>
                  <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Teacher}
                             label="Teacher"
                             onChange={handleTeacher}
                           >
                                <MenuItem value={10}>luis luis</MenuItem>
                                <MenuItem value={20}>fer fer</MenuItem>
                                <MenuItem value={30}>ricardo ricardo</MenuItem>
  
                                
                       </Select>
                   </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                  <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Seccion</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Seccion}
                             label="Grado"
                             onChange={handleSeccion}
                           >
                                <MenuItem value={10}>A</MenuItem>
                                <MenuItem value={20}>B</MenuItem>
                                <MenuItem value={30}>C</MenuItem>        
                       </Select>
                   </FormControl>
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

export default NewGrade;

