
import Box from '@mui/material/Box';
import { useState } from 'react';
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

function Profile() {

    const [age, setAge] = useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

  return(
<>
<Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <ArrowBackIcon sx={{color: theme.palette.primary.dark}} />
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
                <Avatar style={{ marginLeft: 'auto',marginRight: 'auto', width: 132, height: 132 }} src="/broken-image.jpg" />
              </div>
            </Grid>
        </Grid>
      <Grid item xs={10} >
            
              <Grid container spacing={1}>
                  <Grid item xs={4}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="First Name" variant="outlined" />
                  </Grid>

                  <Grid item xs={4}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Last Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={4}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="User Name" variant="outlined"  />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={7}>
                  <TextField sx={{width: '100%' }} id="outlined-basic" label="Last Name" variant="outlined" />
                  </Grid>
              </Grid>
        </Grid>
</Grid>



</Box>
<Box sx={{ width: '90%', marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}} alignItems="center">

<Grid container spacing={2} sx={{ padding: '25px'}} >
                <Grid item xs={6} >
                  <div style={{ backgroundColor: theme.palette.primary.main}}>
                    <DateCalendarServerRequest />
                  </div>
                    
                </Grid>
</Grid>
</Box>


</>

  );
}

export default Profile;

