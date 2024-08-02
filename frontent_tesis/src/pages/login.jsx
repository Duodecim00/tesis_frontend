
import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import theme from '../color/color';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Lockpic from '../assets/3427189.png'
import { LogIn } from "../api/user.api";

import './login.css';




function Login() {


  const themes = createTheme({
    palette: {
      primary: {
        main: '#6FB555',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
    },
  });

  const [User,setUser] = useState("");
  const [password,setpassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error,seterror] = useState(false)
  const [errorText,seterrorText] = useState('error')
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const navigate = useNavigate();
  

  async function ingresar() {
    const respuesta = await LogIn(User,password)
    if (respuesta[0]==400) {
      seterror(true)
      setTimeout(() => {
        seterror(false)
      }, 5000);
      seterrorText(respuesta[1])
    }else if (respuesta[0]==201) {
      if (respuesta[1].rol==0) {
        navigate("/Attendace", { state: { id: respuesta[1].user._id, rol: respuesta[1].rol } });
      }else{
        navigate("/Attendace", { state: { id: respuesta[1].teacher._id, rol: respuesta[1].rol } });
      }
      
    }
  }


  return(
    <>
    <Box
      height={512}
      width={720}
      my={4}
      display="flex"
      flexDirection={'row'}
      alignItems={'center'}
      sx={{marginLeft: 'auto',marginRight: 'auto', borderRadius: 5 , backgroundColor: theme.palette.primary.light}}
    >
      <div
      style={{
        width:'40%',
        position:"relative",
        display:'flex',
        alignItems:'center'
      }}
      >
      <img src={Lockpic} alt="Lockpic" 
      style={{
        width:'200px',
        height:'200px',
        position:"relative",
        marginLeft: 'auto',
      }}/>
      </div>

      
      <div
      style={{
        width:'60%',
        position:"relative",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'100%'
      }}
      >
        <h3 style={{color: theme.palette.primary.dark,marginBottom:'25px' }}>Admin Log in</h3>
        <TextField sx={{minHeight:'45px',minWidth: '270px',borderRadius:'20px',marginBottom:'25px'}} id="outlined-basic" label="Email" variant="outlined" value={User} onChange={(e)=>{setUser(e.target.value)}} />
        <FormControl sx={{minHeight:'45px',minWidth: '270px',borderRadius:'20px',marginBottom:'25px'}} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                      value={password}
                      onChange={(e)=>{setpassword(e.target.value)}}
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                          <InputAdornment position="end">
                              <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                          }
                          label="Password"
                      />
                      </FormControl>
        <ThemeProvider theme={themes}>
        <Button onClick={()=>{ingresar()}} variant="contained" color='primary' style={{minHeight:'45px',minWidth: '270px',borderRadius:'20px',marginBottom:'25px'}}><a style={{fontWeight:'bold', color:'white', fontSize:16}}>  LOG IN  </a></Button>
        </ThemeProvider>

        {error&&<Alert variant="outlined" severity="error" style={{position:'absolute',bottom:25}}>
          {errorText}
          </Alert>}
        
      </div>
      
         </Box>
         
    
</>
  );
}

export default Login;