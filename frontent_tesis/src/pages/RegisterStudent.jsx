
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../color/color';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './register.css';

import {
  NewStudent,
} from '../api/alumno.api'

import {
  GetGrades,
  getsections
} from "../api/curso.api";
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';


function RegisterStudent() {

  const {state} = useLocation();
  const { id,rol } = state; // Read values passed on state

  const navigate = useNavigate();


  const [FirstName,setFirstName] = useState("")
  const [LastName,setLastName] = useState("")
  const [Cedula,setCedula] = useState("")
  const [Grado,setGrado] = useState("")
  const [Seccion,setSeccion] = useState("")
  const [idSeccion,setidSeccion] = useState("")
  const [Gender,setGender] = useState("")
  const [Age,setAge] = useState("")
  const [grades,setgrades] = useState([])

  const [enabledgrade,setenabledgrade] = useState(true)
  const [cantidadSeccion,setcantidadSeccion] = useState(0)

  const [error,seterror] = useState(false)
  const [errorText,seterrorText] = useState('error')
  
  const handleGrado = (event) => {
      setGrado(event.target.value);
    };

    const handleSeccion = (event) => {
      setSeccion(event.target.value);
    };

    
    const handleGender = (event) => {
      setGender(event.target.value);

    };

    async function prueba(id) {
      setenabledgrade(false)
      if (cantidadSeccion == 0) {
        const valor = await getsections(id)
        setcantidadSeccion(valor)
      }
    }

    async function Continue() {
      const respuesta = await NewStudent(FirstName,LastName,Cedula,Age,Gender,idSeccion)
      if (respuesta[0]==400) {
        seterror(true)
        setTimeout(() => {
          seterror(false)
        }, 5000);
        seterrorText(respuesta[1].msg)
      }else if (respuesta[0]==201) {
        const url = "http://192.168.1.107/off";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
        navigate("/fingerprint", { state: { id: id } });
      }
    }

    async function start() {
      if (grades != []) {
        const valor = await GetGrades();
        setgrades(valor)
      }
    }

    useEffect(() => {
      start()
    },[]);


  return(

<>
<Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>{navigate("/Attendace", { state: { id: id } });}}>
        <ArrowBackIcon sx={{color: theme.palette.primary.dark}} />
      </IconButton>
      <Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
        New Student
      </Typography>
</Toolbar>

<Box sx={{ width: '650px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1, display:"flex",flexDirection:"column"}}alignItems="center">

    

    <Grid container spacing={2} sx={{ padding: '25px', display:"flex",flexDirection:"column"}}>
      
        <Grid item xs={12} >
            <Grid >
              <div style={{marginBottom: 30}}>
                <Avatar style={{ marginLeft: 'auto',marginRight: 'auto', width: 132, height: 132 }} src="/broken-image.jpg" />
              </div>
            </Grid>
              <Grid container spacing={1}>
                  <Grid item xs={6}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="First Name" variant="outlined" value={FirstName} onChange={(e)=>{setFirstName(e.target.value)}} />
                  </Grid>

                  <Grid item xs={6}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Last Name" variant="outlined" value={LastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="CI" variant="outlined" value={Cedula} onChange={(e)=>{setCedula(e.target.value)}}/>
                  </Grid>
              </Grid>
        </Grid>

        <Grid item xs={12} >
       
            <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={Gender}
                                  label="Gender"
                                  onChange={handleGender}
                                >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                {/* <MenuItem value={20}>39 types of gay</MenuItem> */}
                                
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField inputProps={{ type: 'number'}} sx={{width: '100%' }} id="outlined-basic" label="Age" variant="outlined" value={Age} onChange={(e)=>{setAge(e.target.value)}}/>
                    </Grid>


                      
            </Grid> 
  
        </Grid>
        <Grid item xs={12} >
       
       <Grid container spacing={5}>
               <Grid item xs={6}>
                   <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Grado}
                             label="Grado"
                             onChange={handleGrado}
                           >
                            {grades&&grades.map((grade)=>{
                              return(
                              <MenuItem onClick={()=>{prueba(grade.nombreCurso)}} key={grade._id} value={grade.nombreCurso}>{grade.nombreCurso}</MenuItem>
                              )
                              
                            })}
                                {/* <MenuItem value={10}>1.º</MenuItem>
                                <MenuItem value={20}>2.º</MenuItem>
                                <MenuItem value={30}>3.º</MenuItem>
                                <MenuItem value={40}>4.º</MenuItem>
                                <MenuItem value={50}>5.º</MenuItem>
                                <MenuItem value={60}>6.º</MenuItem> */}
                                
                       </Select>
                   </FormControl>
               </Grid>

               <Grid item xs={6}>
               <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Section</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Seccion}
                             label="Seccion"
                             onChange={handleSeccion}
                             disabled={enabledgrade}
                             style={{
                              backgroundColor: enabledgrade == true ? 'rgb(200,200,200)' : 'white',
                            }}
                           >
                            {cantidadSeccion&&cantidadSeccion.map((seccion)=>{
                              return(
                                <MenuItem onClick={()=>{setidSeccion(seccion._id)}} key={seccion._id} value={seccion.seccion}>{seccion.seccion}</MenuItem>
                              )
                            })}
                           {/* <MenuItem value={10}>A</MenuItem>
                           <MenuItem value={20}>B</MenuItem>
                           <MenuItem value={30}>C</MenuItem> */}
                       </Select>
                   </FormControl>
               </Grid>


                 
       </Grid> 

   </Grid>

    <div style={{margin: '20px', marginLeft: 'auto',marginRight: 'auto'}}>
        <Button onClick={()=>{Continue()}} variant="contained">Continue</Button>
    </div>

    


</Grid>

{error&&<Alert severity="error" style={{position:'absolute',bottom:10, marginLeft:"auto",marginRight:"auto"}}>
          {errorText}
          </Alert>}

</Box>
</>
  );
}

export default RegisterStudent;

