
import Box from '@mui/material/Box';
import theme from '../color/color';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

function Fingerprint() {

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

<Box sx={{ width: '650px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}} alignItems="center">

    
<Grid container spacing={2} sx={{ padding: '25px',}}>
      
      <Grid item xs={12} >
            <Grid  container spacing={2}>
                <Grid xs={12}style={{ textAlign: 'center'}} >
                <FingerprintIcon sx={{color: theme.palette.primary.dark,margin:'auto', width: '50%', height: 'auto' }}/>
                </Grid>


            </Grid>
      </Grid>


  <div style={{margin: '20px', marginLeft: 'auto',marginRight: 'auto'}}>
      <Button variant="contained">Complete registration</Button>
  </div>
</Grid>


</Box>
</>

  );
}

export default Fingerprint;

