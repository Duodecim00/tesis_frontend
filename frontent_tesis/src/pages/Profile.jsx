
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import theme from '../color/color';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DateCalendarServerRequest from '../components/calendar'
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EditStudent, getStudentByID } from '../api/alumno.api';
import { getGrade, GetGrades, getsections } from '../api/curso.api';
import { colors } from '@mui/material';


function Profile() {

    const {state} = useLocation();
    const { id,rol } = state; // Read values passed on state
    const navigate = useNavigate();
    const params = useParams()

    const [FullName,setFullName] = useState("")
    const [Fname,setFname] = useState("")
    const [Lname,setLname] = useState("")
    const [Urlfoto,setUrlfoto] = useState("")
    const [Cedula,setCedula] = useState("")
    const [Age,setAge] = useState("")
    const [Grado,setGrado] = useState("")
    const [Gender,setGender] = useState("")
    const [IdCurso,setIdCurso] = useState()
    const [IdHuella,setIdHuella] = useState("")
    const [IdAlumno,setIdAlumno] = useState("")
    const [cantidadSeccion,setcantidadSeccion] = useState(0)
    const [Seccion,setSeccion] = useState("")
    const [idSeccion,setidSeccion] = useState("")
    const [enabledgrade,setenabledgrade] = useState(true)
    const [grades,setgrades] = useState([])
    const [secciondefault,setsecciondefault] = useState(10)

  const [error,seterror] = useState(false)
  const [errorText,seterrorText] = useState('ErrorMsg')

    const handleSeccion = (event) => {
      setSeccion(event.target.value);
    };

      async function Getdata() {
        const respuesta = await getStudentByID(params.id)
        if (respuesta[0]==400) {
         
        }else if (respuesta[0]==200) {
          setFullName(respuesta[1].nombrecompleto)
          const nombres = respuesta[1].nombrecompleto.split(' ');
          setIdCurso(respuesta[1].id_curso)
          setFname(nombres[0])
          setLname(nombres[1])
          setUrlfoto(respuesta[1].url_foto)
          setCedula(respuesta[1].cedula)
          setAge(respuesta[1].edad)
          setGender(respuesta[1].genero)
          setIdHuella(respuesta[1].idHuella)
          setIdAlumno(respuesta[1]._id)
          getGradeData(respuesta[1].id_curso)
        }
      }

      async function prueba(id) {
        setenabledgrade(false)
        // if (cantidadSeccion == 0) {
          const valor = await getsections(id)
          setcantidadSeccion(valor)
        // }
      
      
      }

      async function start() {
        if (grades != []) {
          const valor = await GetGrades();
          setgrades(valor[1])
        }
      }

      async function getGradeData(id) {
        const respuesta2 = await getGrade(id)
    setGrado(respuesta2[0].nombreCurso)
    const valor = await getsections(respuesta2[0].nombreCurso)
    setcantidadSeccion(valor)
    setSeccion(respuesta2[0].seccion)
      }
      
      useEffect(()=>{
        Getdata()
        start()
      },[])
 

      const update = async ()=>{
        console.log(IdAlumno,
          `${Fname+" "+Lname}`,
          Cedula,
          Gender,
          Age,
          idSeccion)
        const respuesta = await EditStudent(
          IdAlumno,
          `${Fname+" "+Lname}`,
          Cedula,
          Gender,
          Age,
          idSeccion
        )
        if (respuesta[0]==400) {
          seterror(true)
          setTimeout(() => {
            seterror(false)
          }, 5000);
          seterrorText(respuesta[1].msg)
        }else if (respuesta[0]==200) {
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 5000);
          seterrorText(respuesta[1].msg)
        }
      }

  return(
<>
<Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <ArrowBackIcon sx={{color: theme.palette.primary.dark}} onClick={()=>{navigate("/Attendace", { state: { id: id ,rol:rol} });}} />
      </IconButton>
      <Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
        Profile
      </Typography>
</Toolbar>

<Box sx={{ width: '90%', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}} alignItems="center">

    
<Grid container spacing={2} sx={{ padding: '25px'}} >
        <Grid item xs={2}>
            <Grid >
              <div style={{marginBottom: 30}}>
                {!Urlfoto&&<Avatar style={{ marginLeft: 'auto',marginRight: 'auto', width: 132, height: 132 }} src= "/broken-image.jpg" />}
                {Urlfoto&&<Avatar style={{ marginLeft: 'auto',marginRight: 'auto', width: 132, height: 132 }} src={Urlfoto}  />}
              </div>
            </Grid>
        </Grid>
      <Grid item xs={10} >
            
              <Grid container spacing={1}>
                  <Grid item xs={3}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="First Name" variant="outlined" value={Fname} onChange={(e)=>{setFname(e.target.value)}} />
                  </Grid>

                  <Grid item xs={3}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Last Name" variant="outlined" value={Lname} onChange={(e)=>{setLname(e.target.value)}}/>
                  </Grid>
                  <Grid item xs={3}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Cedula" variant="outlined" value={Cedula} onChange={(e)=>{setCedula(e.target.value)}} />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                    <TextField sx={{width: '100%' }} id="outlined-basic" label="Gender" variant="outlined" value={Gender} onChange={(e)=>{setGender(e.target.value)}} />
                    </FormControl>

               </Grid>
               <Grid item xs={3}>
               <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Grado}
                             label="Grado"
                             onChange={(e)=>{setGrado(e.target.value)}}
                           >
                            {grades&&grades.map((grade)=>{
                              return(
                              <MenuItem 
                              onClick={()=>{prueba(grade.nombreCurso)}} 
                              key={grade._id} value={grade.nombreCurso}>{grade.nombreCurso}</MenuItem>
                              )
                              
                            })}
                                
                       </Select>
                   </FormControl>
               </Grid>

               <Grid item xs={3}>
               <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Seccion}
                             label="Grado"
                             onChange={(e)=>{setSeccion(e.target.value)}}
                           >
                            {cantidadSeccion&&cantidadSeccion.map((seccion)=>{
                              return(
                                <MenuItem onClick={()=>{setidSeccion(seccion._id)}} key={seccion._id} value={seccion.seccion}>{seccion.seccion}</MenuItem>
                              )
                              
                            })}
                                
                       </Select>
                   </FormControl>
               {/* <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Section</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Seccion}
                             defaultValue={secciondefault}
                             label="Seccion"
                             onChange={handleSeccion}
                            // disabled={enabledgrade}
                            //  style={{
                            //   backgroundColor: enabledgrade == true ? 'rgb(200,200,200)' : 'white',
                            // }}
                           >
                            <MenuItem value={10}>Default Value</MenuItem>
                            {cantidadSeccion&&cantidadSeccion.map((seccion,index)=>{
                              console.log(index)
                              return(
                                <MenuItem onClick={()=>{setidSeccion(seccion._id)}} key={index} value={index}>{seccion.seccion}</MenuItem>
                              )
                            })}
                       </Select>
                   </FormControl> */}
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                    <TextField inputProps={{ type: 'number'}} sx={{width: '100%' }} id="outlined-basic" label="Age" variant="outlined" value={Age} onChange={(e)=>{setAge(e.target.value)}}/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                  <TextField sx={{width: '100%' }} id="outlined-basic" label="ID" variant="outlined" value={IdAlumno} disabled />
                  </Grid>
             
              </Grid>
        </Grid>
        <div style={{ marginLeft: 'auto',marginRight: 'auto'}}>
          <Button onClick={()=>{update()}} sx={{backgroundColor:colors.green[400]}} variant="contained">Update</Button>
        </div>
        
</Grid>
     
     

</Box>
<Box sx={{ width: '90%', marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}} alignItems="center">

<Grid container spacing={2} sx={{ padding: '25px'}} style={{display:"flex",flexDirection:"row"}}>
  {IdCurso&&<DateCalendarServerRequest id={params.id} IdCurso={IdCurso}/>}

</Grid>
</Box>


</>

  );
}

export default Profile;

