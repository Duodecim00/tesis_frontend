
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
import { useLocation, useNavigate } from 'react-router-dom';
import { newTeacher } from '../api/profesor.api';
import { Alert } from '@mui/material';



function RegisterTeacher() {

  const [FirstName,setFirstName] = useState("")
  const [LastName,setLastName] = useState("")
  const [UserName,setUserName] = useState("")
  const [Password,setPassword] = useState("")

  const {state} = useLocation();
  const { id } = state; // Read values passed on state

  const [Success,setSuccess] = useState(false)
  const [error,seterror] = useState(false)
  const [errorText,seterrorText] = useState('ErrorMsg')

  const navigate = useNavigate();

  async function continuar(params) {
    console.log(FirstName,LastName,UserName,Password)
   const respuesta = await newTeacher(FirstName,LastName,UserName,Password)
   if (respuesta[0]==400) {
    seterror(true)
    setTimeout(() => {
      seterror(false)
    }, 5000);
    seterrorText(respuesta[1].msg)
  }else if (respuesta[0]==200) {
    setFirstName("")
    setLastName("")
    setUserName("")
    setPassword("")
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
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>{navigate("/Attendace", { state: { id: id } });}}>
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
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="First Name" variant="outlined" value={FirstName} onChange={(e)=>{setFirstName(e.target.value)}} />
                  </Grid>

                  <Grid item xs={6}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Last Name" variant="outlined" value={LastName} onChange={(e)=>{setLastName(e.target.value)}} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="User Name" variant="outlined" value={UserName} onChange={(e)=>{setUserName(e.target.value)}} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Password" variant="outlined" value={Password} onChange={(e)=>{setPassword(e.target.value)}} />
                  </Grid>
              </Grid>
        </Grid>


    <div style={{margin: '20px', marginLeft: 'auto',marginRight: 'auto'}}>
        <Button variant="contained" onClick={()=>{continuar()}}>Continue</Button>
    </div>
</Grid>

{error&&<Alert severity="error">
          {errorText}
          </Alert>}

{Success&&<Alert severity="success">{errorText}</Alert>}

</Box>
</>
  );
}

export default RegisterTeacher;

