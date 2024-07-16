
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../color/color';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';


import './login.css';



function Login() {

  const [User,setUser] = useState("")
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return(

<Box sx={{ width: '660px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', marginTop: '150px', borderRadius: 1, display: 'flex'}}>

<Box
        sx={{
          width: 200,
          height: 200,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      /> 
 <Divider orientation="vertical" flexItem />
        <Box>

        <div style={{textAlign: 'center'}}>
            <h3 style={{color: theme.palette.primary.dark }}>register student</h3>
        </div>
        <Grid container spacing={2} sx={{ marginRight: 'auto', marginLeft:'auto', paddingLeft:'2px' , paddingRight:'30px' }}>
      
        <Grid item xs={12} >
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{}}>
                    <TextField sx={{width: '100%' }} id="outlined-basic" label="NAME" variant="outlined" valor={User} setvalor={setUser} />
                </Grid>

                <Grid item xs={12} sx={{}}>
              
                              <FormControl sx={{ width: '100%'}} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
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
                </Grid>
            </Grid>
      </Grid>

     


</Grid>
        </Box>

</Box>



    

  );
}

export default Login;